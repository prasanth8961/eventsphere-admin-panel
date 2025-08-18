import React, { useState } from "react";

const Filter = ({ roles, setRoles, status, setStatus }) => {
  const [user, setUser] = useState(["true", "false"]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleFilter = (role) => {
  if (selectedRoles.includes(role)) {
    setSelectedRoles(selectedRoles.filter((e) => e !== role));
  } else {
    setSelectedRoles([...selectedRoles, role]);
  }

  if (roles.includes(role)) {
    const fRole = roles.filter((data) => data !== role);
    setRoles(fRole);
  } else {
    setRoles([...roles, role]); 
  }
};

  const handleStatus = (e) => {
    if (status.includes(e.target.value)) {
      const role = status.filter((data) => data != e.target.value);
      setStatus(role);
    } else {
      setStatus([...status, e.target.value]);
    }
  };

  return (
    <div className="px-2  md:flex gap-4  ">
      {user.length > 0 && (
        <div className="flex pt-5 md:p-0 gap-2 text-white">
          {/* <h1 className="font-bold text-black">STATUS:</h1> */}
          {user.map((user, index) => (
            <div
              className={`text-white  ${user === "true" ? " border-[1px] border-[#A2FF86]" : " border-[1px] border-[#E76161]"} px-2 py-1 flex align-middle rounded-md gap-1 `}
              key={index}
            >
              <input
                className=""
                type="checkbox"
                id={user}
                value={user}
                onChange={handleStatus}
              />
              <label className="pl-1 text-txt-color" htmlFor={user}>
                {user === "true" ? "Verified" : "Unverified"}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
