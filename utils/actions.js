"use server";

import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getAllTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createTask = async (formData) => {
  const content = formData.get("content");

  await prisma.task.create({
    data: {
      content,
    },
  });

  revalidatePath("/tasks");
};

export const createTaskCustom = async (prevState, formData) => {
  const content = formData.get("content");

  const Task = z.object({
    content: z.string().min(5),
  });

  try {
    Task.parse({
      content,
    });
    await prisma.task.create({
      data: {
        content,
      },
    });
    revalidatePath("/tasks");
    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};

export const deleteTask = async (formData) => {
  const id = formData.get("id");
  await prisma.task.delete({ where: { id } });
  revalidatePath("/tasks");
};

export const getTask = async (id) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};

export const editTask = async (formData) => {
  const id = formData.get("id");
  const content = formData.get("content");
  const completed = formData.get("completed");

  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      content: content,
      completed: completed === "on" ? true : false,
    },
  });

  redirect("/tasks");
};

// Blog
export const getAllPosts = async () => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true,
    },
  });
};

export const getPost = async (id) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};

const PostSchema = z.object({
  title: z.string().min(3, "제목은 최소 3글자 이상이어야 합니다."),
  content: z.string().min(10, "내용은 최소 10글자 이상이어야 합니다."),
});

export const createPost = async (prevState, formData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author") || "익명";

  try {
    PostSchema.parse({ title, content });

    await prisma.post.create({
      data: {
        title,
        content,
        author,
        published: true,
      },
    });

    revalidatePath("/blog");
    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};

export const updatePost = async (prevState, formData) => {
  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content");

  try {
    PostSchema.parse({ title, content });

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/blog/${id}`);
    return { success: true, post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        message: "validation-error", 
        errors: error.errors.map(err => ({
          path: err.path[0],
          message: err.message
        }))
      };
    }
    return { success: false, error: "게시글 수정 중 오류가 발생했습니다." };
  }
};

export const deletePost = async (formData) => {
  try {
    const id = formData.get("id");

    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("deletePost 에러:", error);
    return { success: false, error: "게시글 삭제 중 오류가 발생했습니다." };
  }
};