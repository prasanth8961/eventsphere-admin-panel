import DebugLogger from "../../../utilities/DebugLogger";
import UserActions from "./UserActions";

const UserTableRow = ({ user, active, setActive, handleViewChange, handleEditChange }) => {
  const profile_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  
  // return (<DebugLogger data={user} label="Users"/>)
  return (
    <div className="max-h-[50rem] overflow-y-auto">
      {user.map((item, index) => (
        <div
          key={index}
          className={`grid self-center align-middle justify-center gap-x-1 border border-l-[var(--color-secondary)] border-r-[var(--color-secondary)] py-2 ${index % 2 === 0 ? "bg-[var()]" : "bg-[var()]"
            } ${(index == user.length - 1) ? " border-b-[var(--color-secondary)] rounded-b-md" : ""}`}
          style={{
            gridTemplateColumns: "0.5fr 0.5fr 1fr 2fr 1fr 1fr 1fr 1fr 0.5fr",
          }}
        >
          <div className="truncate pl-4">{item._id}</div>
          <div className="truncate">
            <img src={item.proof !== null ? item.proof : profile_url} alt={item.proof !== null ? item.proof : "profile"} className="rounded-full h-10 w-10" />
          </div>
          <div className="truncate">{item.name}</div>
          <div className="truncate">
            <span title={item.email}>{item.email}</span>
          </div>
          <div className="truncate">{item.mobile}</div>
          <div className="truncate">{item.location}</div>
          <div className="truncate">{item.role}</div>
          <div
            className={`text-center font-semibold rounded-lg ${item.status === "active" ? "text-green-700" : item.status === "pending" ? "text-yellow-500" : "text-red-700"
              }`}
          >
            {item.status || ''}
          </div>
          <div>
            <UserActions id={item._id} active={active} setActive={setActive} handleViewChange={handleViewChange} handleEditChange={handleEditChange} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserTableRow;
