import { useEffect, useState } from "react";
import Config from "../../App/service/config";
import EventCard from "../../components/EventCard";
import Paginate from "../../components/Paginate";
import Search from "../../components/Search";
import axiosInstance from "../../utilities/axiosInstance";
import NotFound from "../NotFound";
import FilterEvents from "./Components/FilterEvents";

const ListEvents = () => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState([]);
  const [status, setStatus] = useState(["all"]);
  const [refresh, setRefresh] = useState(false);


  const { data: eventsData, loading, error } = useFetch(
    () =>
      axiosInstance.post(
        Config.getEventsByStatus,
        {
          "status": status,
          "limit": limit,
          "search": search,
          "page": page,
        }
      ),
    [page, search, limit, status, refresh],
  );

  useEffect(() => {
    if (eventsData?.status) {
      setData(eventsData.data.events || []);
      setTotalPage(eventsData.data.totalPage || 1);
    } else {
      setData([]);
    }
  }, [eventsData]);


  const district = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Kanniyakumari",
    "Namakkal",
    "Perambalur",
    "Pudukottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivagangai",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thiruvallur",
    "Thiruvarur",
    "Thoothukudi",
    "Trichirappalli",
    "Thirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvannamalai",
    "The Nilgiris",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];
    const handleLocation = (e) => {
    const value = e.target.value;
    if (location.includes(value)) {
      const newLocation = location.filter((data) => data != value);
      setLocation(newLocation);
    } else {
      setLocation([...location, value]);
    }
  };

  const reloadPage = () => {
    setRefresh(prev => !prev);
  }

  // return (<DebugLogger data={data} label="Event list" />)
  return (
    <div className="ml-10 min-h-screen overflow-y-auto px-4">
      <div className="flex flex-wrap gap-4 justify-between items-center mx-5 mt-8">
        <h1 className="text-2xl font-semibold text-gray-600">EVENTS</h1>
        <Search placeholder="Search user" type="text" setSearch={setSearch} search={search} />
        <FilterEvents setStatus={setStatus} />
        <div className="relative group w-60">
          {/* <div className="bg-white border px-4 py-1 rounded-md flex items-center justify-between cursor-pointer">
            <span className="text-gray-600">Options</span>
            <MdArrowDownward />
          </div> */}
          <div className="absolute hidden group-hover:block z-10 bg-white w-60 max-h-80 overflow-y-scroll shadow-lg mt-1 rounded-md p-2">
            <ul className="grid grid-cols-2 gap-2">
              {district.map((data, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <input type="checkbox" value={data} onChange={handleLocation} className="cursor-pointer" />
                  <span>{data}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-wrap gap-x-4 gap-y-6 justify-start">
            {Array(6).fill(0).map((_, idx) => (
              <ShimmerCard key={idx} />
            ))}
          </div>
        </div>
      ) : data.length > 0 ? (
        <div className="flex flex-col gap-4 mt-6">
          <EventCard data={data} />
          <div className="flex justify-center mt-4">
            <Paginate totalPage={totalPage} page={page} setPage={setPage} />
          </div>
        </div>
      ) : (
        <NotFound onPageReload={reloadPage} />
      )}
    </div>

  );
};



export const useFetch = (apiCall, dependencies = []) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        setError(err);
              } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { loading, data, error };
};



const ShimmerCard = () => {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-1 w-[13rem]">
      <div className="shimmer-bg h-[8rem] rounded-t-lg w-full" />
      <div className="p-2 space-y-3">
        <div className="h-5 shimmer-bg rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 shimmer-bg rounded w-1/2" />
          <div className="h-3 shimmer-bg rounded w-1/3" />
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-4 shimmer-bg rounded-full" />
            <div className="h-3 shimmer-bg rounded w-1/2" />
          </div>
          <div className="h-8 w-16 shimmer-bg rounded-md" />
        </div>
      </div>
    </div>
  );
};




export default ListEvents;
