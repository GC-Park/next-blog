"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import "react-calendar/dist/Calendar.css";

const TaskCalendar = ({ taskCounts }) => {
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const handleDateClick = (value) => {
    const formattedDate = format(value, "yyyy-MM-dd");
    router.push(`/tasks/date/${formattedDate}`);
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const day = date.getDate();
    const taskCount = taskCounts[day];

    if (!taskCount) return null;

    const { total, completed } = taskCount;
    const hasIncomplete = total > completed;

    return (
      <div className="flex justify-center mt-1">
        <div
          className={`h-2 w-2 rounded-full ${
            hasIncomplete ? "bg-red-500" : "bg-green-500"
          }`}
          title={`${completed}/${total} 완료`}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-center">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={handleDateClick}
          tileContent={tileContent}
          className="border-none w-full"
        />
      </div>
      <div className="flex justify-center mt-4 gap-6 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>모두 완료</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span>미완료 항목 있음</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
