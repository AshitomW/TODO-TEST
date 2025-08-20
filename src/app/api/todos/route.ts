import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as any;
    const todos = await Todo.find({ userId: decoded.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Get todos error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as any;
    const { title, description, status, priority } = await request.json();

    const todo = new Todo({
      title,
      description,
      status,
      priority,
      userId: decoded.userId,
    });

    await todo.save();

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Create todo error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
