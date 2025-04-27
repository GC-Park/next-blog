import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const user = await currentUser();

    const isAdmin = user?.emailAddresses?.find(
      (email) => email.id === user?.primaryEmailAddressId
    )?.emailAddress === process.env.ADMIN_EMAIL;
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const id = formData.get("id");
    const content = formData.get("content");
    const completed = formData.get("completed") === "on";
    const date = new Date(formData.get("date") || new Date());

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        content,
        completed,
        date,
      },
    });

    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    revalidatePath(`/tasks/date/${formattedDate}`);
    revalidatePath("/tasks");

    return NextResponse.json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
