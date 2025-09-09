
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type FormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
  success: boolean;
};

// --- Login Action ---
const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
    await sleep(500);
    const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }
    
    const { username, password } = validatedFields.data;

    await dbConnect();
    
    let user = await User.findOne({ username });
    
    // If no user exists and default credentials are used, create the default admin user
    if (!user && username === 'admin' && password === 'admin') {
      user = await new User({ username: 'admin', password: 'admin' }).save();
    }


    if (!user || user.password !== password) {
        return {
            message: 'Invalid username or password.',
            success: false,
        }
    }
    
    // Create session token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-jwt-key-that-is-long');
    const token = await new SignJWT({ userId: user._id, username: user.username })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h') // Token expires in 1 hour
        .sign(secret);

    // Set cookie
    cookies().set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
    });
    
    redirect('/admin/dashboard');
}


// --- Logout Action ---
export async function logoutAction() {
    cookies().delete('session');
    redirect('/');
}


// --- Update Username Action ---
const UpdateUsernameSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newUsername: z.string().min(3, "New username must be at least 3 characters"),
});

export async function updateUsernameAction(prevState: FormState, formData: FormData): Promise<FormState> {
    await sleep(500);
    const validatedFields = UpdateUsernameSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }

    const { currentPassword, newUsername } = validatedFields.data;
    
    try {
        await dbConnect();
        
        const adminUser = await User.findOne();
        if (!adminUser) {
            return { message: 'Admin user not found.', success: false };
        }
        
        if (adminUser.password !== currentPassword) {
            return { message: 'Incorrect current password.', success: false };
        }
        
        adminUser.username = newUsername;
        await adminUser.save();
        
        return {
            message: 'Username updated successfully. It will be effective on your next login.',
            success: true,
        }
    } catch (error) {
        console.error("Error updating username:", error);
        return { message: 'An error occurred.', success: false };
    }
}


// --- Update Password Action ---
const UpdatePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
});


export async function updatePasswordAction(prevState: FormState, formData: FormData): Promise<FormState> {
    await sleep(500);
    const validatedFields = UpdatePasswordSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }
    
    const { currentPassword, newPassword } = validatedFields.data;
    
    try {
        await dbConnect();
        
        const adminUser = await User.findOne();
        if (!adminUser) {
            return { message: 'Admin user not found.', success: false };
        }
        
        if (adminUser.password !== currentPassword) {
            return { message: 'Incorrect current password.', success: false };
        }
        
        adminUser.password = newPassword;
        await adminUser.save();
        
        return {
            message: 'Password updated successfully. Please log in again with your new password.',
            success: true,
        }
    } catch (error) {
        console.error("Error updating password:", error);
        return { message: 'An error occurred.', success: false };
    }
}
