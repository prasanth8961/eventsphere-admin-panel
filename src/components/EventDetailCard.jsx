import React from "react";
import ImageSlider from "./ImageSlider";
import { BiUser } from "react-icons/bi";
import { FcCallback } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import DebugLogger from "../utilities/DebugLogger";

const EventDetailCard = ({ event }) => {
  // return (<DebugLogger data={event} lable="Event Detail card" />)
  return (
    <div className="flex flex-wrap gap-1 justify-center p-5">
      <div
        key={event[0]._id}
        className="bg-white shadow-lg rounded-lg w-[300px] h-auto flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="relative">
          <ImageSlider event={event} />
        </div>

        <div className="bg-[image:var(--gradient-secondary)] p-1 px-4 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold uppercase tracking-wide">
            {event[0].name}
          </h1>
          <p className="text-sm opacity-90 flex items-center gap-1">
            Price : <span className="font-bold text-lg text-[var(--color-accent-purple)]">{event[0].ticket_price}</span>
          </p>
        </div>

        <div className="p-4 space-y-1 text-gray-500 bg-gray-100 ">
          <p className="text-sm truncate">{event[0].description}</p>
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col items-center justify-center w-20 h-16 bg-[#E9EFEC] text-txt-color rounded-md shadow-lg">
              <span className="text-xs font-semibold uppercase">
                {new Date(event[0].starting_date).toLocaleString("en-US", {
                  month: "short",
                })}
              </span>
              <span className="text-lg font-bold">
                {new Date(event[0].starting_date).getDate()}
              </span>
              <span className="text-xs">
                {new Date(event[0].starting_date).getFullYear()}
              </span>
            </div>
            <span className="text-sm font-semibold text-txt-color flex items-center">
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event[0].start_time, "hours")}
              </span>
              :
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event[0].start_time, "minutes")}
              </span>
              <strong className="m-3">To</strong>
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event[0].end_time, "hours")}
              </span>
              :
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event[0].end_time, "minutes")}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <BiUser />
            <span className="text-sm">{event[0].hostedBy}</span>
            <span className="ml-5 flex items-center gap-2">
              <FcCallback />
              {event[0].c_code}-{event[0].host_mobile}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm flex items-center gap-1">
            <MdOutlineEmail />
              <a
                href={`mailto:${event[0].host_email}`}
                className="text-[#37AFE1] ml-1"
              >
                {event[0].host_email}
              </a>
            </span>
           <span className={`pl-2 pr-2  rounded-sm text-white ${
                event[0].status === "active"
                  ? " bg-[#32CD32]"
                  : event[0].status === "pending"
                  ? " bg-[#FEBE10] "
                  : " bg-[#E76161]"
              }`}>{event[0].status}</span>
          </div>

           <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
              <span>Ticket type - </span>
              <span className="text-sm">{event[0].ticket_type}</span>
            </div>
            {
              event[0].denial_reason && (
                <span className="text-wrap text-sm text-gray-500">{data[0].denial_reason}</span>
              )
            }

            {
              event[0].restrictions.length > 0 && (
                JSON.parse(event[0].restrictions).map((restriction, idx) => (
                  <div key={idx} className="mr-1">{restriction}</div>
                ))
              ) 
            }
        </div>

        <div className="bg-white p-2 text-right flex justify-between">
          {event[0].video_url && (
            <>
              <a
                href={event[0].video_url}
                target="_blank"
                className="text-blue-600 flex items-center gap-2"
                rel="noopener noreferrer"
              >
                <BsYoutube color="red" />
                Watch Video
              </a>
              <div>
                <span className="font-bold text-gray-500 pr-1">
                  [Qty: {event[0].ticket_quantity}]
                </span>
                <span className="font-bold text-gray-500 text-template-1">
                  [Sold - {event[0].ticket_sold}]
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
    return hours < 10 ? `0${hours}` : hours;
  } else if (type === "minutes") {
    const minutes = date.getMinutes();
    return minutes < 10 ? `0${minutes}` : minutes;
  }
  return "00";
}

export default EventDetailCard;
