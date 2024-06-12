import { NextResponse } from "next/server";
import prisma from '@/lib/db';
import argon2 from 'argon2';
import next from "next";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Request body:', body);  // Debugging line

    const { email, password } = body;

    let existingUser;
    try {
      existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
          ]
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Database query error:', error.message, 'Stack:', error.stack);
        return NextResponse.json({ user: null, message: `Database query error: ${error.message}` });
      } else {
        console.error('Unknown database query error:', error);
        return NextResponse.json({ user: null, message: 'Unknown database query error.' });
      }
    }

    if (existingUser) {
      return NextResponse.json({ user: null, message: 'This email already exists in our database!' });
    }
    else{
      
    }

    const hashedPassword = await argon2.hash(password);

    // Create the user
    let createdUser;
    try {
      createdUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,

        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating user:', error.message, 'Stack:', error.stack);
        return NextResponse.json({ user: null, message: `Failed to create user: ${error.message}` });
      } else {
        console.error('Unknown error creating user:', error);
        return NextResponse.json({ user: null, message: 'Unknown error creating user.' });
      }
    }

    const { password: newuserpassword, ...rest } = createdUser

    return new NextResponse(JSON.stringify({ user: rest, message: 'User created successfully!' }), { status: 201 });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Unexpected error:', error.message, 'Stack:', error.stack);
      return NextResponse.json({ user: null, message: `An error occurred: ${error.message}` });
    } else {
      console.error('Unexpected unknown error:', error);
      return NextResponse.json({ user: null, message: 'An unknown error occurred.' });
    }
  }
}
