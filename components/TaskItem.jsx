"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TaskItem = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const router = useRouter();

  const handleToggleComplete = async () => {
    setIsCompleted(!isCompleted);

    const formData = new FormData();
    formData.append("id", task.id);
    formData.append("content", task.content);
    formData.append("completed", !isCompleted ? "on" : "off");
    formData.append("date", task.date);

    try {
      const response = await fetch("/api/tasks/update", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating task:", error);
      setIsCompleted(isCompleted); // 에러 발생 시 원래 상태로 되돌림
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggleComplete}
        className="checkbox checkbox-primary"
      />
      <h2
        className={`text-lg capitalize ${
          isCompleted ? "line-through text-gray-500" : null
        }`}
      >
        {task.content}
      </h2>
    </div>
  );
};

export default TaskItem;
