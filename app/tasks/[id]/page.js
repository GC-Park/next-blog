import EditForm from "@/components/EditForm";
import { getTask } from "@/utils/actions";
import Link from "next/link";
import { format } from "date-fns";

const TaskPage = async ({ params }) => {
  const task = await getTask(params.id);
  const formattedDate = format(task.date, "yyyy-MM-dd");

  return (
    <>
      <div className="mb-16">
        <Link href={`/tasks/date/${formattedDate}`} className="btn btn-accent">
          돌아가기
        </Link>
      </div>
      <EditForm task={task} />
    </>
  );
};
export default TaskPage;
