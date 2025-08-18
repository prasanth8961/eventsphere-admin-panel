import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import axiosInstance from "../../../utilities/axiosInstance";
import Config from "../../../App/service/config";


const SquadEdits = ({ data, setModelType, setRefresh }) => {
    const [showRejectReason, setShowRejectReason] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const handleApproveUser = async () => {
        const payload = {
            id: data[0]._id,
            status: "approved",
        };
        try {
            const url = `${Config.baseUrl}/${Config.approveUser}`;
            const res = await axiosInstance.post(url, payload);

            if (res.data.success) {
                toast.success(res.data.message || "User approved", {
                    position: "top-right",
                    autoClose: 800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setModelType(null);
            } else {
                toast.error("Approval failed. Try again.");
            }
        } catch (error) {
                        toast.error("Error while approving user.",
                {
                    position: "top-right",
                    autoClose: 800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                }
            );
        } finally {
            setRejectReason("");
            setRefresh(prev => !prev);
        }
    };

    const handleRejectUser = async () => {
        const payload = {
            id: data[0]._id,
            status: "rejected",
            reason: rejectReason,
        };
        try {
            const url = `${Config.baseUrl}/${Config.rejectUser}`;
            const res = await axiosInstance.post(url, payload);

            if (res.data.success) {
                toast.success(res.data.message || "User rejected");
                setModelType(null); // close popup
            } else {
                toast.error("Rejection failed. Please try again.");
            }
        } catch (error) {
                        toast.error("Error while rejecting user.");
        } finally {
            setRejectReason("");
            setRefresh(prev => !prev);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center pl-[15%] justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-left space-y-6">
                <div
                    className="absolute top-0 right-0 h-[40px] w-[40px] bg-[#78281f] flex items-center justify-center text-white font-bold text-2xl cursor-pointer rounded-bl rounded-tr hover:bg-[#ec7063]"
                    onClick={() => setModelType(null)}
                >
                    X
                </div>

                <div className="bg-white p-4 rounded-md shadow-md w-[98%] mx-auto space-y-3 text-gray-800 border border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-md overflow-hidden border border-gray-300">
                            <img
                                src={data[0].profile}
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="space-y-1">
                            <div>
                                <span className="font-semibold text-gray-600">Name:</span>{" "}
                                {data[0].name}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Role:</span>{" "}
                                {data[0].role}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600">Status:</span>{" "}
                                {data[0].status}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mt-4">
                    {((data[0].status === "pending" || data[0].status !== "active") && !showRejectReason) && (
                        <div className="flex gap-5">
                            <button
                                onClick={handleApproveUser}
                                className="bg-green-700 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => setShowRejectReason(true)}
                                className="bg-red text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    )}

                    {(data[0].status === "active" || data[0].status === "pending" && showRejectReason) && (
                        <div className="space-y-3">
                            <textarea
                                rows={3}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                placeholder="Enter reason for rejection"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleRejectUser}
                                    className="bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                                    disabled={!rejectReason.trim()}
                                >
                                    Confirm Reject
                                </button>
                                <button
                                    onClick={() => {
                                        setShowRejectReason(false);
                                        setRejectReason("");
                                    }}
                                    className="bg-gray-300 text-black px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SquadEdits;
