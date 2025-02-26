import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Input validation
        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'Email and password are required.' }), 
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format.' }), 
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password.' }), 
                { 
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password.' }), 
                { 
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return new Response(
            JSON.stringify({ 
                message: 'Sign in successful!', 
                user: userWithoutPassword 
            }), 
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Server error during signin:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred during sign in.' }), 
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}