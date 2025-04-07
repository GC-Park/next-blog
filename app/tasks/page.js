import { getMonthTaskCounts } from "@/utils/actions";
import TaskCalendar from "@/components/TaskCalendar";
import Link from "next/link";

export const dynamic = "force-dynamic";

const TasksPage = async () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // JavaScript의 month는 0부터 시작하므로 +1

  const taskCounts = await getMonthTaskCounts(currentYear, currentMonth);

  const todayFormatted = `${currentYear}-${String(currentMonth).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">할 일 달력</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TaskCalendar taskCounts={taskCounts} />

          <div className="mt-6 flex justify-center">
            <Link
              href={`/tasks/date/${todayFormatted}`}
              className="btn btn-primary w-full max-w-xs"
            >
              오늘의 할 일 보기
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">빠른 메뉴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/tasks/date/${todayFormatted}`}
              className="btn btn-accent"
            >
              <span className="mr-2">📝</span> 오늘 할 일 추가하기
            </Link>

            {(() => {
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayFormatted = `${yesterday.getFullYear()}-${String(
                yesterday.getMonth() + 1
              ).padStart(2, "0")}-${String(yesterday.getDate()).padStart(
                2,
                "0"
              )}`;

              return (
                <Link
                  href={`/tasks/date/${yesterdayFormatted}`}
                  className="btn btn-outline"
                >
                  <span className="mr-2">👀</span> 어제 할 일 확인하기
                </Link>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
