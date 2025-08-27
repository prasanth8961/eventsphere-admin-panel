import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EventDetailCard from "../../components/EventDetailCard";
import { ClipLoader } from "react-spinners";
import NotFound from "../NotFound";
import { MdClose } from "react-icons/md";

const EventDetail = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSubevents = async () => {
    try {
      setLoading(true);
      const data = location.state?.data[0].sub_events;
      setData(data);
    } catch (err) {
      console.dir(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSubevents();
  }, []);



  return (
    <div className="h-screen">
      {loading ? (
        <ClipLoader
          className="flex items-center self-center justify-center mt-[45vh] ml-[40vw]"
          loading={loading}
          color="#1312f2"
          speedMultiplier={3}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : data.length > 0 ? (
        <>
          <div className="absolute top-2 right-[5rem] z-50 bg-red-200 text-red-500  px-3 py-3 rounded-md shadow-md hover:bg-red-800 hover:text-white transition cursor-pointer flex items-center justify-center"
            onClick={() => window.history.back()}
          >
            <MdClose size={20} className="" />

          </div>

          <div className="flex justify-start flex-wrap w-full pl-[8vw] pt-10 ">
            {data.map((event, idx) => (
              <>
                <EventDetailCard key={idx} event={event} />
              </>
            ))}
          </div>

        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default EventDetail;
