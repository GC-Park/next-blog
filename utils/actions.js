"use server";

import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";

export const getAllTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createTask = async (formData) => {
  const content = formData.get("content");
  const date = formData.get("date") || new Date().toISOString();

  await prisma.task.create({
    data: {
      content,
      date: new Date(date),
    },
  });

  revalidatePath("/tasks");
};

export const createTaskCustom = async (prevState, formData) => {
  const content = formData.get("content");
  const date = formData.get("date") || new Date().toISOString();

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
        date: new Date(date),
      },
    });

    revalidatePath(`/tasks/date`);
    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
};

export const deleteTask = async (formData) => {
  const id = formData.get("id");
  const date = formData.get("date") || new Date().toISOString();

  await prisma.task.delete({ where: { id } });
  revalidatePath(`/tasks/date`);
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
  const date = formData.get("date");

  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      content: content,
      completed: completed === "on" ? true : false,
      ...(date && { date: new Date(date) }),
    },
  });

  redirect(`/tasks/date/${date}`);
};

export const getTasksByDate = async (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.task.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMonthTaskCounts = async (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const tasks = await prisma.task.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      date: true,
      completed: true,
    },
  });

  const taskMap = {};

  tasks.forEach((task) => {
    const day = task.date.getDate();

    if (!taskMap[day]) {
      taskMap[day] = { total: 0, completed: 0 };
    }

    taskMap[day].total += 1;
    if (task.completed) {
      taskMap[day].completed += 1;
    }
  });

  return taskMap;
};

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
  const user = await currentUser();

  const userEmail = user?.emailAddresses?.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  const isAdmin = userEmail === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    console.log("관리자 아님:", userEmail, "!==", process.env.ADMIN_EMAIL);
    return { message: "unauthorized", error: "글 작성 권한이 없습니다" };
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author") || "박근철";

  try {
    PostSchema.parse({ title, content });

    await prisma.post.create({
      data: {
        title,
        content,
        author: author || user?.name || "박근철",
        published: true,
      },
    });

    revalidatePath("/blog");
    return { message: "success" };
  } catch (error) {
    console.error("글 작성 오류:", error);
    return { message: "error" };
  }
};

export const updatePost = async (prevState, formData) => {
  const user = await currentUser();

  const userEmail = user?.emailAddresses?.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  const isAdmin = userEmail === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    console.log("관리자 아님:", userEmail, "!==", process.env.ADMIN_EMAIL);
    return { message: "unauthorized", error: "글 수정 권한이 없습니다" };
  }

  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author") || 박근철;

  try {
    PostSchema.parse({ title, content });

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        ...(author && { author }),
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/blog/${id}`);
    return { message: "success" };
  } catch (error) {
    console.error("글 수정 오류:", error);
    return { message: "error" };
  }
};

export const deletePost = async (formData) => {
  const user = await currentUser();

  const userEmail = user?.emailAddresses?.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  const isAdmin = userEmail === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    console.log("관리자 아님:", userEmail, "!==", process.env.ADMIN_EMAIL);
    return { message: "unauthorized", error: "글 삭제 권한이 없습니다" };
  }

  try {
    const id = formData.get("id");

    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/blog");
    return { message: "success" };
  } catch (error) {
    console.error("deletePost 에러:", error);
    return { message: "error", error: "게시글 삭제 중 오류가 발생했습니다." };
  }
};

const CommentSchema = z.object({
  content: z.string().min(2, "댓글은 최소 2글자 이상이어야 합니다."),
});

export const getCommentsByPostId = async (postId) => {
  return prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createComment = async (prevState, formData) => {
  const user = await currentUser();

  if (!user) {
    return { message: "unauthenticated", error: "로그인이 필요합니다" };
  }

  const postId = formData.get("postId");
  const content = formData.get("content");

  try {
    CommentSchema.parse({ content });

    await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: user.id,
        authorName:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
      },
    });

    revalidatePath(`/blog/${postId}`);
    return { message: "success" };
  } catch (error) {
    console.error("댓글 작성 오류:", error);
    return { message: "error", error: "댓글 작성 중 오류가 발생했습니다" };
  }
};

export const updateComment = async (prevState, formData) => {
  const user = await currentUser();

  if (!user) {
    return { message: "unauthenticated", error: "로그인이 필요합니다" };
  }

  const id = formData.get("id");
  const content = formData.get("content");
  const postId = formData.get("postId");

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    return { message: "error", error: "댓글을 찾을 수 없습니다" };
  }

  if (comment.authorId !== user.id) {
    return {
      message: "unauthorized",
      error: "자신의 댓글만 수정할 수 있습니다",
    };
  }

  try {
    CommentSchema.parse({ content });

    await prisma.comment.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/blog/${postId}`);
    return { message: "success" };
  } catch (error) {
    console.error("댓글 수정 오류:", error);
    return { message: "error", error: "댓글 수정 중 오류가 발생했습니다" };
  }
};

export const deleteComment = async (formData) => {
  const user = await currentUser();

  if (!user) {
    return { message: "unauthenticated", error: "로그인이 필요합니다" };
  }

  const id = formData.get("id");
  const postId = formData.get("postId");

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    return { message: "error", error: "댓글을 찾을 수 없습니다" };
  }

  const isAdmin =
    user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
      ?.emailAddress === process.env.ADMIN_EMAIL;

  if (comment.authorId !== user.id && !isAdmin) {
    return {
      message: "unauthorized",
      error: "자신의 댓글만 삭제할 수 있습니다",
    };
  }

  try {
    await prisma.comment.delete({
      where: { id },
    });

    revalidatePath(`/blog/${postId}`);
    return { message: "success" };
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    return { message: "error", error: "댓글 삭제 중 오류가 발생했습니다" };
  }
};
