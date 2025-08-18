import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import EditCard from "../../components/EditCard";
import Paginate from "../../components/Paginate";
import Search from "../../components/Search";
import NotFound from "../../pages/NotFound";
import axiosInstance from "../../utilities/axiosInstance";
import UserPagination from "../Users/Components/UserPagination";
import UserTable from "../Users/Components/UserTable";
import UserTableRow from "../Users/Components/UserTableRow";
import { default as InternalTeamDetailCard, default as SquadDetails } from "./Components/InternalTeamDetailCard";
import SquadEdits from "./Components/SquadEdits";

const InternalTeamList = ({ showMenu, setShowMenu }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [limit, setLimit] = useState("");
  const [status, setStatus] = useState([]);
  const [sortColumn, setsortColumn] = useState("");
  const [userCategory, setUserCategory] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [userID, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [userDetailEdit, setUserDetailEdit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [circles, setCircles] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [active, setActive] = useState(false);
  const [modelType, setModelType] = useState(null);
  const [refresh, setRefresh] = useState(false);


  const getAllEmployee = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `admin/squads`,
            {page:page,search:search,limit:limit},
      );
      if (response.data.status == true && response.data.data) {
        setData(response.data.data.squads);
        setTitle(Object.keys(response.data.data[0]));
        setTotalPage(response.data.totalPage);
        setUserCategory(response.data.category);
      }
    } catch (error) {
          } finally {
      setLoading(false);
    }
  };
  const getUserDetail = async (userID) => {
    // try {
    //   setLoadingDetail(true);
    //   const response = await axiosInstance.post(`admin/internal-teams/single`, {
    //     emp_id: userID,
    //   });
    //   if (response.data.status == true && response.data.data) {
    //     setUserDetail(response.data.data);
    //   }
    // } catch (error) {
    //       // } finally {
    //   setLoadingDetail(false);
    // }
    setUserDetail(data.filter((user) => user._id === userID));

  };
   const handleViewChange = async (_id) => {
    setModelType("view")
    getUserDetail(_id)
  }

  const handleEditChange = async (_id) => {
    setModelType("edit");
    getUserDetail(_id)
  }



  useEffect(() => {
    getAllEmployee();
  }, [page, search, limit, refresh]);

  return (
    <div className="h-screen  bg-white ">
      <div className="h-[10vh] shadow-md z-50 w-full flex justify-around items-center space-y-2 pl-10 pr-10">
        <h1 className="heading ">INTERNAL TEAM LIST</h1>
        <Search
          //className="h-10 w-[100%] ml-1 border-2 border-blue  rounded-lg p-2"
          placeholder="Search internal team user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
      </div>
      {loading ? (
        <div>
          <div
            className="grid ml-[4rem] mt-10 mr-5 rounded text-white gap-x-1 border-b py-2 bg-[var(--color-secondary)]"
            style={{
              gridTemplateColumns: "1fr 1.5fr 2fr 3fr 2fr 2fr 1.5fr 2fr",
            }}
          >
            <div>ID</div>
            <div>USER ID</div>
            <div>EMAIL</div>
            <div>FULL NAME</div>
            <div>MOBILE</div>
            <div>ROLE</div>
            <div>VERIFIED STATUS</div>
            <div>DETAILS</div>
          </div>
          <div>
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>{shimmerRow}</React.Fragment>
            ))}
          </div>
        </div>
      ) : data.length > 0 ? (
             <>
            <UserTable>
              {data && data.length > 0 ? (
                <UserTableRow
                  user={data}
                  active={active}
                  setActive={setActive}
                  handleViewChange={handleViewChange}
                  handleEditChange={handleEditChange}
                />
              ) : (
                <div className="text-center text-gray-500 py-8 w-full">No users found.</div>
              )}
              {
                modelType === "view" && (<SquadDetails setModelType={setModelType} singleUserData={userDetail} />)
              }
              {
                modelType === "edit" && (<SquadEdits setModelType={setModelType} data={userDetail} setRefresh={setRefresh} />)
              }
            </UserTable>
            {/* <UserPagination totalPage={totalPage} page={page} setPage={setPage} /> */}
          </>
      ) : (
        <NotFound />
      )}
      {
        popup && (
          <InternalTeamDetailCard userDetail={userDetail} setPopup = {setPopup} popup = {popup}/>
        )
      }

      {loadingEdit ? (
        <div className="flex justify-center items-center -mt-72">
          <ClipLoader
            className=""
            loadingDetail={loadingDetail}
            color="#1312f2"
            speedMultiplier={3}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        popupEdit && (
          <EditCard
            popupEdit={popupEdit}
            setPopupEdit={setPopupEdit}
            userDetailEdit={userDetailEdit}
          />
        )
      )}
      {data.length > 0 && !loading && (
        <div className="absolute bottom-0 left-[calc(100vw-45%)]">
          <Paginate totalPage={totalPage} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

const shimmerRow = (
  <div
    className="grid ml-[4rem]  gap-x-1 border-b py-2 bg-white animate-pulse"
    style={{
      gridTemplateColumns: "1fr 1.5fr 2fr 3fr 2fr 2fr 1.5fr 2fr",
    }}
  >
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="h-10 bg-gray-300 rounded-md bg-light-gray"
        style={{ width: index === 3 ? "80%" : "60%" }}
      />
    ))}
  </div>
);

export default InternalTeamList;
