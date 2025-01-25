import TaskForm from "@/components/TaskFormCustom";
import TaskList from "@/components/TaskList";

const TasksPage = () => {
  return (
    <div className="max-w-lg">
      <TaskForm />
      <TaskList />
    </div>
  );
};
export default TasksPage;
