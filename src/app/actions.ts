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


// --- Update Credentials Action ---
const CredentialsSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


export async function updateCredentialsAction(prevState: FormState, formData: FormData): Promise<FormState> {
     await sleep(500);
    const validatedFields = CredentialsSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        }
    }

    const { username, password } = validatedFields.data;
    
    try {
        await dbConnect();
        
        // There should only be one user, so we find and update it.
        // A more robust solution for multi-user systems would use user ID.
        const adminUser = await User.findOne();

        if (!adminUser) {
             return {
                message: 'Admin user not found. Cannot update.',
                success: false,
            }
        }
        
        adminUser.username = username;
        adminUser.password = password;
        await adminUser.save();
        
        return {
            message: 'Credentials updated successfully. Please log in again with your new credentials.',
            success: true,
        }

    } catch (error) {
        console.error("Error updating credentials:", error);
        return {
            message: 'An error occurred while updating credentials.',
            success: false,
        }
    }
}
