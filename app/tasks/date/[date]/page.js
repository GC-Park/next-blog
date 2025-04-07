import Link from "next/link";
import { getTasksByDate } from "@/utils/actions";
import TaskFormDate from "@/components/TaskFormDate";
import TaskList from "@/components/TaskList";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export const dynamic = "force-dynamic";

const DateTasksPage = async ({ params }) => {
  const date = params.date; // 형식: yyyy-MM-dd
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "yyyy년 M월 d일 (EEEE)", {
    locale: ko,
  });

  const tasks = await getTasksByDate(parsedDate);

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <Link href="/tasks" className="btn btn-ghost">
          ← 달력으로 돌아가기
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">{formattedDate} 할 일</h1>

      <TaskFormDate selectedDate={date} />

      {tasks.length === 0 ? (
        <div className="bg-base-200 p-6 rounded-lg text-center mt-8">
          <p className="text-lg">이 날짜에 등록된 할 일이 없습니다.</p>
          <p className="mt-2 text-gray-500">새로운 할 일을 추가해 보세요!</p>
        </div>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
};

export default DateTasksPage;
