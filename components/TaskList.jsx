import Link from "next/link";
import DeleteForm from "./DeleteForm";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return <h2 className="mt-8 font-medium text-lg">할 일이 없습니다</h2>;
  }

  return (
    <ul className="mt-8">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-lg"
        >
          <TaskItem task={task} />{" "}
          <div className="flex gap-6 items-center">
            <Link href={`/tasks/${task.id}`} className="btn btn-accent btn-xs">
              수정
            </Link>
            <DeleteForm id={task.id} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
