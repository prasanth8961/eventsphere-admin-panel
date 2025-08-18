import React from "react";
import { BiUser } from "react-icons/bi";
import { FcCallback } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import DebugLogger from "../utilities/DebugLogger";

const SubEventsDisplyCard = ({ event }) => {
  // return (<DebugLogger data={event} label="Sub events display card"/>)

  return (
    <div className="flex w-[400px] min-h-[500px] flex-wrap gap-1 justify-center p-2">
      <div className="bg-white shadow-md rounded-lg h-[500px] w-[400px] flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 justify-between">
        {/* Header */}
        <div className="relative">
          <div className="bg-gray-400 p-1 px-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold uppercase tracking-wide">
              {event?.name ?? "Event Name"}
            </h1>
            <p className="text-sm opacity-90">
              ID-
              <span className="font-bold">
                {event?.eventID ?? Math.floor(1000 * Math.random()) + 1}
              </span>
            </p>
          </div>

          {/* Images */}
          {event?.sub_cover_images?.length > 0 && (
            <div className="relative h-[16rem] overflow-hidden">
              {event?.sub_cover_images.length === 1 ? (
                <img
                  key={1001}
                  src={URL.createObjectURL(event.sub_cover_images[0])}
                  alt="Sub Event Image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full overflow-y-auto p-2 bg-gray-100">
                  <div className="grid grid-cols-3 gap-2">
                    {event.sub_cover_images.map((img, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(img)}
                        alt={`Sub Event Image ${index + 1}`}
                        className="w-[6rem] h-[4.5rem] object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-1 text-gray-600 bg-gray-100 rounded-sm flex-grow">
          <p className="text-sm truncate">{event?.description}</p>
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col items-center justify-center w-20 h-16 bg-[#E9EFEC] text-txt-color rounded-md shadow-lg">
              <span className="text-xs font-semibold uppercase">
                {new Date(event.starting_date).toLocaleString("en-US", {
                  month: "short",
                })}
              </span>
              <span className="text-lg font-bold">
                {new Date(event.starting_date).getDate()}
              </span>
              <span className="text-xs">
                {new Date(event?.starting_date).getFullYear()}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-700 flex items-center">
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.start_time, "hours")}
              </span>
              :
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.start_time, "minutes")}
              </span>
              <strong className="m-3">-</strong>
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.end_time, "hours")}
              </span>
              :
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.end_time, "minutes")}
              </span>
            </span>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-2 mt-2">
            <BiUser />
            <span className="text-sm">{event?.hostedBy}</span>
            <span className="ml-5 flex items-center gap-2">
              <FcCallback />
              {event?.c_code}-{event?.host_mobile}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineEmail />
            <span className="text-sm">
              <a
                href={`mailto:${event?.host_email}`}
                className="text-[#37AFE1] ml-1"
              >
                {event?.host_email}
              </a>
            </span>
            <div className="flex items-center gap-2 ml-3 text-txt-color">
              <span>Ticket Type - </span>
              <span className="text-sm">{event?.ticket_type}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-2 text-right flex justify-between">
          {event?.video_url && (
            <>
              <a
                href={event.video_url}
                target="_blank"
                className="text-blue-600 flex items-center gap-2"
                rel="noopener noreferrer"
              >
                <BsYoutube color="red" />
                Watch Video
              </a>
              <div>
                <span className="font-bold text-txt-color pr-1">
                  {event?.ticket_price}
                </span>
                <span className="font-semibold text-template-1">
                  [Qty: {event?.ticket_quantity}]
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function getValidTime(time, type) {
  if (!time || typeof time !== "string") return "00";

  const date = new Date(`1970-01-01T${time}`);
  if (isNaN(date)) return "00";

  if (type === "hours") {
    const hours = date.getHours();
    return hours < 10 ? `0${hours}` : `${hours}`;
  } else if (type === "minutes") {
    const minutes = date.getMinutes();
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
  }

  return "00";
}

export default SubEventsDisplyCard;
