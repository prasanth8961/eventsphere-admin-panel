import { useState } from "react";

const FilterEvents = ({setStatus}) => {
  const _status = ["Active", "Pending", "Rejected"];
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleStatusChange = (status) => {
    let updatedStatuses = [];
    if (selectedStatuses.includes(status)) {
      updatedStatuses = selectedStatuses.filter((s) => s !== status);
    } else {
      updatedStatuses = [...selectedStatuses, status];
    }

    setSelectedStatuses(updatedStatuses);
    if (updatedStatuses.length === 0) {
      setStatus(["all"]);
    } else {
      setStatus(updatedStatuses.map((s) => s.toLowerCase()));
    }
  };

  return (
    <div className="flex justify-around items-center space-y-2 pl-10 pr-10">
      {_status.length > 0 && (
        <div className="flex pt-5 md:p-0 gap-2 text-white">
          {_status.map((status, idx) => (
            <div
              key={idx}
              className={`text-white ${
                status === "Active"
                  ? " border-[1px] border-[#32CD32]"
                  : status === "Pending"
                  ? " border-[1px] border-[#FEBE10]"
                  : " border-[1px] border-[#E76161]"
              } px-2 py-1 flex align-middle rounded-md gap-1`}
            >
              <input
                type="checkbox"
                id={status}
                value={status}
                checked={selectedStatuses.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              <label className="pl-1 text-gray-600" htmlFor={status}>
                {status}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterEvents;
