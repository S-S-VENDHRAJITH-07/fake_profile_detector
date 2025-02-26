import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
    const { firstName, lastName, dateOfBirth, email, password } = await request.json();

    // Validate input
    if (!firstName || !lastName || !dateOfBirth || !email || !password) {
        return new Response(JSON.stringify({ error: 'All fields are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create user in the database
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth), // Ensure date is in Date format
                email,
                password: hashedPassword,
            },
        });

        return new Response(JSON.stringify({ message: 'User created successfully!', user }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ error: 'User already exists or other error.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}