import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import Search from "../../components/Search";
import axiosInstance from "../../utilities/axiosInstance";
import Config from "../../App/service/config";
import ClipLoader from "react-spinners/ClipLoader";
import Paginate from "../../components/Paginate";
import { MdArrowDownward } from "react-icons/md";
import NotFound from "../NotFound";

const ListRejectedEvents = () => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState([]);

  const getMainEvent = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        Config.mainEventRejected +
          `?page=${page}&search=${search}&location=${location}&limit=${limit}`,
      );
            setData(response.data.data.eventData);
      setTotalPage(response.data.data.totalPage);
    } catch (err) {
          } finally {
      setLoading(false);
    }
  };
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

  useEffect(() => {
    getMainEvent();
  }, [search, page, location]);
  return (
    <div className="ml-10 h-screen overflow-hidden">
      <div className="flex px-3 mt-10 justify-between">
        <h1 className="font-semibold text-txt-color text-xl ">
          REJECTED EVENTS
        </h1>
        <Search
          placeholder="Search rejected events"
          type="text"
          setSearch={setSearch}
          search={search}
        />
        <div className="relative group w-32 ml-2">
          <div className="bg-white outlined border-[1px] px-4 py-1 rounded-md flex items-center justify-between cursor-pointer">
            <span className="text-txt-color ">options</span>
            <MdArrowDownward />
          </div>
          <div className="absolute hidden group-hover:block bg-white w-80 max-h-80 overflow-scroll">
            <ul className="grid gap-2 grid-template-columns:1fr 1fr">
              {district.map((data, index) => (
                <li key={index} className="px-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    value={data}
                    onChange={handleLocation}
                  />
                  <span className="pl-2">{data}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-56">
          <ClipLoader
            className=""
            loading={loading}
            color="#1312f2"
            speedMultiplier={3}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : data.length > 0 ? (
        <div>
          <EventCard data={data} />
          <Paginate totalPage={totalPage} page={page} setPage={setPage} />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ListRejectedEvents;
