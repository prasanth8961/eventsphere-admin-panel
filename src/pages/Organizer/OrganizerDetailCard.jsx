import React, { useState } from "react";
import { IoCallOutline, IoClose } from "react-icons/io5";
import axiosInstance from "../../utilities/axiosInstance";
import Config from "../../App/service/config";
import { toast, Bounce } from "react-toastify";

const OrganizerDetailCard = ({ popup, setPopup, userDetail }) => {
  const [reason, setReason] = useState("");
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAction = async (action, role, id) => {
    try {
      const endpoint =
        role === "organizer"
          ? action === "approve"
            ? Config.approveOrganizer
            : Config.rejectOrganizer
          : action === "approve"
            ? Config.approveUser
            : Config.rejectUser;

      const payload = role === "organizer" ? { org_id: id } : { user_id: id };
      if (action === "reject") payload.reason = reason;

      const response = await axiosInstance.put(endpoint, payload);
      if (action === "approve") {
        toast.success("Organizer approved", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.warning("Organizer Rejected.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

      setPopup(!popup);
    } catch (error) {
      toast.error("Something went wrong. Try again!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setPopup(false);
    }
  };

  const renderUserInfo = (data) => (
    <div className="mb-4 select-none">
      <div className="flex items-center gap-4 ">
        <p className="text-md text-gray-600 font-semibold text-xl absolute top-12 right-12">
          {" "}
          {data.user_role}
        </p>
        <img
          src={`${Config.orgIdCardImgBaseUrl}${data.id_card[0]}`}
          alt="Profile"
          className="w-20 h-20 rounded-md border-[1px] border-white-smoke"
        />
        <div>
          <div className="flex gap-4 items-center">
            <div>
              <h2 className="text-2xl text-gray-600 font-semibold">
                {data.full_name}
              </h2>
              <p className="text-sm text-gray-600">{data.email}</p>
            </div>
            <p
              className={`text-sm ${data.verified_status === "active" ? "bg-green-700" : "bg-red"} text-white rounded-md flex items-center justify-center py-1 px-2`}
            >
              {data.verified_status}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <IoCallOutline color="green" />
            <span className="text-gray-600 text-md font-semibold">
              {data.country_code}-
            </span>
            <p className="text-gray-600 text-md font-semibold">
              {data.mobile}
            </p>
          </div>

          <p className="flex items-center gap-2">
            <a
              className="px-4 py-2 border border-blue-500 text-blue rounded hover:bg-blue-500 hover:border-red hover:text-red transition"
              href={`${Config.orgNOCImgBaseUrl}${data.noc}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PDF
            </a>
          </p>
        </div>
        {data.user_role === "organizer" && (
          <div>
            <div className="flex gap-4  items-center">
              <p> ID:{data.org_id}</p>
              <p>Code:{data.college_code}</p>
              <p>Organization name : {data.college_name}</p>
            </div>
            <div className="mt-1">
              {["Rejected", "rejected"].includes(data.verified_status) ? (
                <>
                  <p className="flex gap-1 ">
                    <span>Reason for rejection :</span>
                    {data.reason}
                  </p>
                </>
              ) : (
                <></>
              )}

              <h3 className="text-lg text-gray-600 mb-2">Location</h3>
              <iframe
                src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed`}
                width="100%"
                height="150"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}
        {data.user_role === "student" && (
          <>
            <p>Student ID: {data.student_id}</p>
            <p>Department: {data.department}</p>
          </>
        )}
        {data.user_role === "internal_team" && (
          <>
            <p>Team ID: {data.team_id}</p>
            <p>Position: {data.position}</p>
          </>
        )}
      </div>
    </div>
  );

  const renderActionButtons = (data) => (
    <div className="flex gap-4 mt-4">
      {data.verified_status === "pending" && (
        <>
          <button
            onClick={() =>
              handleAction(
                "approve",
                data.user_role,
                data.user_id || data.org_id,
              )
            }
            className="bg-green-700 text-white px-4 py-2 rounded "
          >
            Approve
          </button>
          <button
            onClick={() => {
              setSelectedUser(data);
              setShowReasonInput(true);
            }}
            className="bg-red text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </>
      )}
      {data.verified_status === "active" && (
        <button
          onClick={() => {
            setSelectedUser(data);
            setShowReasonInput(true);
          }}
          className="bg-red text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      )}
      {data.verified_status === "rejected" && (
        <button
          onClick={() =>
            handleAction("approve", data.user_role, data.user_id || data.org_id)
          }
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Approve
        </button>
      )}
    </div>
  );

  return (
    <div className="fixed select-none inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40">
      <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative ">
        <button
          onClick={() => setPopup(!popup)}
          className="absolute top-4 right-4 text-2xl"
        >
          <IoClose />
        </button>
        <h1 className="text-xl font-bold mb-6">User Details</h1>
        {userDetail.length > 0 ? (
          userDetail.map((data, index) => (
            <div key={index}>
              {renderUserInfo(data)}
              {renderActionButtons(data)}
            </div>
          ))
        ) : (
          <p>No user details available.</p>
        )}

        {showReasonInput && (
          <div className="mt-6">
            <label className="block mb-2">Reason for Rejection:</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  handleAction(
                    "reject",
                    selectedUser.user_role,
                    selectedUser.user_id || selectedUser.org_id,
                  );
                  setShowReasonInput(false);
                  setReason("");
                }}
                className="bg-red text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowReasonInput(false)}
                className="bg-white-smoke px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDetailCard;
