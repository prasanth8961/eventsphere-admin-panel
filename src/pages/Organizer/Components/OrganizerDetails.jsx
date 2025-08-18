import { MdCancel, MdEmail, MdLocationPin, MdVerified } from "react-icons/md";
import Config from "../../../App/service/config";
import DebugLogger from "../../../utilities/DebugLogger";
import { IoCallOutline } from "react-icons/io5";

const OrganizerDetails = ({ setModelType, singleUserData: data }) => {
    return (
        <>
            {data !== null && data.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
                    <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-4xl space-y-6">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between border-b pb-2">
                            <h2 className="text-2xl font-bold text-blue-700">Organizer Information</h2>
                            <div
                                className="absolute top-0 right-0 h-10 w-10 bg-red-400 hover:bg-red-700 text-white flex items-center justify-center rounded-bl-md rounded-tr-md cursor-pointer"
                                onClick={() => setModelType(null)}
                            >
                                X
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex items-center gap-6">
                            <img
                                src={`${Config.orgIdCardImgBaseUrl}${data[0].profile || ""}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-lg border border-gray-300 object-cover shadow-md"
                            />
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-semibold text-gray-800">{data[0].name}</h3>
                                    <span className={`text-sm px-2 py-1 rounded-md flex items-center gap-1 ${
                                        data[0].status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {data[0].status === "active" ? <MdVerified /> : <MdCancel />}
                                        {data[0].status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <MdEmail className="text-blue-500" />
                                    {data[0].email}
                                </p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-1">Contact Info</h4>
                            <div className="flex items-center gap-3 text-gray-700">
                                <IoCallOutline className="text-green-600" />
                                <p className="text-md font-medium">
                                    {data[0].c_code}-{data[0].mobile}
                                </p>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-1">Meta Information</h4>
                            <div className="grid grid-cols-2 gap-3 text-gray-600 text-sm">
                                <p><strong>ID:</strong> {data[0]._id}</p>
                                <p><strong>Approver:</strong> {data[0].approvedBy}</p>
                                <p><strong>Approved At:</strong> {new Date(data[0].approvedAt).toLocaleString()}</p>
                                <p><strong>Requested At:</strong> {new Date(data[0].requestedAt).toLocaleString()}</p>
                                <p><strong>Created At:</strong> {new Date(data[0].createdAt).toLocaleString()}</p>
                                <p><strong>Bookings:</strong> {data[0].bookings?.length > 0 ? data[0].bookings.join(', ') : "[ ]"}</p>
                            </div>
                        </div>

                        {/* Organization Info */}
                        <div>
                            <h4 className=" text-lg font-semibold text-gray-700 mb-1">Organization</h4>
                            {data[0].organizationData?.map((org, idx) => (
                                <div key={idx} className="relative text-sm text-gray-600 space-y-2 pl-2 border-l-4 border-blue-200 ml-1">
                                    <p><strong>Name:</strong> {org.name}</p>
                                    <p><strong>Code:</strong> {org.code}</p>
                                    <a
                                        href={Config.orgNOCImgBaseUrl + org.noc}
                                        className="absolute top-5 right-10 px-4 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue hover:text-white transition-all"
                                    >
                                        Open PDF
                                    </a>
                                    <p><strong>Pending Events:</strong> {org.pending_events?.length || 0}</p>
                                </div>
                            ))}
                        </div>

                        {/* Location */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-1">Location</h4>
                            <div className="flex items-center gap-2 text-gray-700 mb-2">
                                <MdLocationPin className="text-red-500" />
                                <p>{data[0].location}</p>
                            </div>
                            <iframe
                                src={`https://www.google.com/maps?q=${data[0].latitude},${data[0].longitude}&z=15&output=embed`}
                                width="100%"
                                height="180"
                                className="rounded-md border shadow"
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <div></div>
                            {data[0].denial_reason && (
                                <p className="text-red-600 text-sm font-medium">
                                    Reason for denial: {data[0].denial_reason}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrganizerDetails;
