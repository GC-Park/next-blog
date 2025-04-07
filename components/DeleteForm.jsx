import { deleteTask } from "@/utils/actions";

const DeleteForm = ({ id, selectedDate }) => {
  return (
    <form action={deleteTask}>
      <input type="hidden" name="date" value={selectedDate} />
      <input type="hidden" name="id" value={id} />
      <button className="btn btn-error btn-xs">delete</button>
    </form>
  );
};
export default DeleteForm;
