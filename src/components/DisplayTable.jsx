import React from "react";
import DebugLogger from "../utilities/DebugLogger";
const DisplayTable = ({
  title,
  data,
  page,
  popup,
  setPopup,
  popupEdit,
  setPopupEdit,
  setUserId,
  getUserDetail,
  editInternalTeam,
}) => {
  const userTitle = [...title, "DETAILS"];
  const employeeTitle = [...title, "DETAILS", "EDIT"];
  const handleUserId = (id) => {
        setPopup(!popup);

    getUserDetail(id);
  };
  const handleUserEdit = (id) => {
        setPopupEdit(!popupEdit);
    editInternalTeam(id);
  };
  return (<DebugLogger data={data} label="Internal team details"/>)
  return (

    <>
      <div className="relative ml-10 mr-2 max-w-full mx-auto overflow-hidden">
        <div
          className="sticky top-0 z-10 grid bg-bannar text-white font-semibold text-sm uppercase tracking-wide p-2 rounded-tr-md rounded-tl-md"
          style={{
            gridTemplateColumns: "1fr 1.5fr 2fr 3fr 2fr 2fr 1.5fr 2fr", 
          }}
        >
          {
           userTitle.map((key, index) => (
                <div key={index} className="py-1 text-left">
                  {key}
                </div>
              ))
              }
        </div>

        <div className="max-h-[50rem] overflow-y-auto  ">
          {data.map((item, index) => (
            <div
              key={index}
              className={`grid self-center align-middle justify-center gap-x-1 border-b py-2 ${
                index % 2 === 0 ? "bg-[#cacccd]" : "bg-[#edf3f7]"
              }`}
              style={{
                gridTemplateColumns: "1fr 1.5fr 2fr 3fr 2fr 2fr 1.5fr 2fr",
              }}
            >
              <div className="truncate">{item._id}</div>
              <div className="truncate">{item._id || item._id}</div>
              <div className="truncate">{item.name}</div>
              <div className="truncate">
                <span title={item.email}>{item.email}</span>
              </div>
              <div className="truncate">{item.mobile}</div>
              <div className="truncate">{item.role}</div>
              <div
                className={`text-center  font-semibold rounded-lg ${
                  item.status === "pending" ? "text-red-700" : "text-green-700"
                }`}
              >
                {item.status === "pending" ? "Unverified" : "Verified"}
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  className={`py-1 px-3 rounded text-white ${
                    item.status === 1 ? "bg-blue" : "bg-dark-gray"
                  }`}
                  onClick={() => handleUserId(item._id ? item._id : item._id)}
                  >
                  View
                </button>
                <button
                  className="bg-blue text-white py-1 px-3 rounded"
                  onClick={() => handleUserEdit(item._id ?? item._id)}
                  >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className=" mx-4 mt-2 mb-2 container max-h-[30rem] flex items-center justify-center overflow-hidden ">
      <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg">
        <thead className="sticky top-0">
          <tr className="bg-bannar text-white">
            {
              data && userTitle.includes("user_id")
                ? userTitle.map((key, index) => (
                    <th
                      className="p-1 md:py-3 md:px-6 text-left font-semibold text-sm uppercase tracking-wider"
                      key={index}
                    >
                      {key === "email"
                        ? "Email"
                        : key === "full_name"
                        ? "Fullname"
                        : key}
                    </th>
                  ))
                : employeeTitle.map((key, index) => (
                    <th
                      className="p-1 md:py-3 md:px-6 text-left font-semibold text-sm uppercase tracking-wider"
                      key={index}
                    >
                      {key === "email"
                        ? "email"
                        : key === "full_name"
                        ? "fullname"
                        : key}
                    </th>
                  ))
            }
          </tr>
        </thead>
        <tbody className="">
          {data.map((item, index) =>
            item.user_id ? (
              <>
                <tr
                  className={`border-b ${
                    index % 2 === 0 ? "bg-grey" : "bg-light-gray"
                  }`}
                  key={index}
                >
                  <td className="p-1 md:py-4 md:px-6">{item.id}</td>
                  <td className="p-1 md:py-4 md:px-6">{item.user_id}</td>
                  <td className="p-1 md:py-4 md:px-6">{item.full_name}</td>
                  <td className="p-1 md:py-4 md:px-6">{item.email}</td>
                  <td className="p-1 md:py-4 md:px-6">{item.mobile}</td>
                  <td className="p-1 md:py-4 md:px-6">{item.role}</td>
                  <td
                    className={
                      item.verified_status === 0
                        ? "md:py-4 md:px-6  p-1 text-red-700 font-semibold  text-center"
                        : "md:py-4 md:px-6  p-1 text-green-700 font-semibold rounded-lg text-center"
                    }
                  >
                    {item.verified_status === 0 ? "Unverified" : "Verified"}
                  </td>
                  <td className=" text-center text-1xl ">
                    {item.verified_status === 1 ? (
                      <button
                        className="bg-blue text-white py-1 md:px-4 px-2 rounded"
                        onClick={() => handleUserId(item.user_id)}
                      >
                        view
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserId(item.user_id)}
                        className="bg-red text-white py-1 px-2 md:px-4 rounded"
                      >
                        view
                      </button>
                    )}
                  </td>{" "}
                </tr>
              </>
            ) : (
              <>
                <tr
                  className={`border-b ${
                    index % 2 === 0 ? "bg-grey" : "bg-light-gray"
                  }`}
                  key={index}
                >
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6">{item.emp_id}</td>
                  <td className="py-4 px-6">{item.full_name}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">{item.mobile}</td>
                  <td className=" text-center text-1xl ">
                    <button
                      className="bg-blue text-white py-1 px-4 rounded"
                      onClick={() => handleUserId(item.emp_id)}
                    >
                      view
                    </button>
                  </td>
                  <td className=" text-center text-1xl ">
                    <button
                      className="bg-blue text-white py-1 px-4 rounded"
                      onClick={() => handleUserEdit(item.emp_id)}
                    >
                      EDIT
                    </button>
                  </td>{" "}
                </tr>
              </>
            )
          )}
        </tbody>
      </table>
    </div> */}
    </>
  );
};

export default DisplayTable;
