import { NextResponse } from "next/server";
import db from '@/lib/db';
import { message } from "antd";
import { hash } from 'bcrypt'
import Password from "antd/es/input/Password";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, username, password } = body
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "This email Already in our Database !" })
        }
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "This username Already in our Database !" })
        }

        const HashedPassword = await hash(password, 10);

        const creatingUser = await db.user.create({
            data: {
                email,
                username,
                password: HashedPassword 

            }
        });



        return NextResponse.json({ user: creatingUser, message: "user created succusfully" }, { status: 201 })

    } catch (error) {

    }
}