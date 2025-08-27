import { useNavigate } from "react-router-dom";
import { BiLocationPlus } from "react-icons/bi";
const EventCard = ({ data }) => {
  const navigate = useNavigate();
  const handleEvent = async (id) => {
    const eventData = data.filter((item) => item._id === id);

    navigate("/eventdetail", {
      state: {
        data: eventData,
      },
    });
  };
  const formatDate = (date) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date().toLocaleDateString() : d.toLocaleString(); // or custom format
  };

  const IMAGE_URL = "https://cdn.pixabay.com/photo/2017/12/08/11/53/event-party-3005668_640.jpg";

  return (
    <div className="h-[80vh] p-4 overflow-auto ">
      <div className="flex flex-wrap grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6 justify-start">
        {data.map((data, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md p-1 text-gray-800 hover:shadow-xl transition-shadow duration-300 w-[13rem]"
          >
            <div className="relative">
              <img
                className="w-full h-[8rem] object-cover rounded-t-lg"
                src={data.main_image ?? IMAGE_URL}
                alt={data.name}
              />
              <span className={`absolute top-0 right-0 bg-red-500 text-white pl-1 pr-1 rounded-s ${data.active_status === "active"
                ? " bg-[#32CD32]"
                : data.active_status === "pending"
                  ? " bg-[#FEBE10] "
                  : " bg-[#E76161]"
                }`}>{data.active_status}</span>
            </div>

            <div className="p-2">
              <h1 className="text-lg text-txt-color font-bold truncate">
                {data.name}
              </h1>

              <div className="text-xs text-gray-600 mt-3 space-y-3">
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">📅 From:</span>
                    <span className="text-gray-700">{formatDate(data.starting_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">📅 End:</span>
                    <span className="text-gray-700">{formatDate(data.ending_date)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-700 text-sm truncate max-w-[8rem]">
                    <BiLocationPlus className="text-blue-600" />
                    <span className="truncate">{data.location}</span>
                  </div>
                  <button
                    className="ml-2 bg-[var(--color-secondary)] text-white rounded-md px-3 py-1 text-sm hover:bg-blue-700 transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleEvent(data._id)}
                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
