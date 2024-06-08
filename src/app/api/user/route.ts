import { NextResponse } from "next/server";
import db from '@/lib/db'; 
import { message } from "antd";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, username } = body
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


        return NextResponse.json(body)

    } catch (error) {

    }
}