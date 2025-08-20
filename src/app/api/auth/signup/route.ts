import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = signToken({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
