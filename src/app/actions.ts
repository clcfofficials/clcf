'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

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

    // In a real app, you would check against a database.
    if (username !== 'admin' || password !== 'password') {
        return {
            message: 'Invalid username or password.',
            success: false,
        }
    }
    
    redirect('/admin/dashboard');
}
