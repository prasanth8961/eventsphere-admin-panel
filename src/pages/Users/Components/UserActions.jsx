
const UserActions = ({ id , active, handleViewChange, handleEditChange }) => {
  return (
    <div className="flex px-5 gap-5">
      <button
        className={`py-1 px-3 rounded text-white  bg-[var(--color-gray-700)] hover:bg-blue-600`}
        onClick={()=>handleViewChange(id)}
      >
        View
      </button>
        <button
        className={`py-1 px-3 rounded text-white  bg-[var(--color-gray-700)] hover:bg-blue-600`}
        onClick={()=>handleEditChange(id)}
      >
        Edit
      </button>
    </div>
  );
}
export default UserActions;
