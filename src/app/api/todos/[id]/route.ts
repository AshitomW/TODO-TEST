import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as any;
    const { id } = await params;

    const todo = await Todo.findOneAndDelete({
      _id: id,
      userId: decoded.userId,
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Delete todo error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as any;
    const updateData = await request.json();
    const { id } = await params;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: decoded.userId },
      updateData,
      { new: true }
    );

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Update todo error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
