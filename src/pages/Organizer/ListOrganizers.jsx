import React, { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import UserFilterPanel from "../Users/Components/UserFilterPanel";
import UserTable from "../Users/Components/UserTable";
import UserTableRow from "../Users/Components/UserTableRow";
import OrganizerPagination from "./Components/OgranizerPagination";
import OrganizerDetails from "./Components/OrganizerDetails";
import OrganizerEdit from "./Components/OrganizerEdit";

const ListOrganizer = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [user, setUser] = useState(["true", "false"]);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState("organizer");
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState([]);
  const [sortColumn, setsortColumn] = useState("");
  const [userCategory, setUserCategory] = useState([]);
  const [popup, setPopup] = useState(false);
  const [userID, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [active, setActive] = useState(false);
  const [modelType, setModelType] = useState(null);
  const [refresh, setRefresh] = useState(false);


  const handleStatus = (e) => {
    if (status.includes(e.target.value)) {
      const role = status.filter((data) => data != e.target.value);
      setStatus(role);
    } else {
      setStatus([...status, e.target.value]);
    }
  };
  const getAllUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `admin/organizers`,
        {
          "page": page,
          "search": search,
          "roles": roles,
          "limit": limit,
          "status": status,
        }
      );
      if (response.data.status == true && response.data.data) {
        setData(response.data.data.organizers);
        setTitle(response.data.data.message);
        setTotalPage(response.data.data.totalPage);
        setUserCategory(response.data.category);
      }
    } catch (error) {
            setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getUserDetail = async (userID) => {
    // try {
    //   setLoadingDetail(true);
    //       //   const response = await axiosInstance.post(`/admin/organizer/single`, {
    //     _id: userID,
    //   });
    //       //   if (response.data.status == true && response.data.data) {
    //         //     setUserDetail(response.data.data.users); /// response.data.data
    //   }
    // } catch (error) {
    //   if (error.response.status == 500) {
    //     alert("Check internet connection");
    //   }
    // } finally {
    //   setLoadingDetail(false);
    // }\
    setUserDetail(data.filter((user) => user._id === userID));
  };

  useEffect(() => {
    getAllUser();
  }, [page, search, roles, limit, status, refresh]);

  const handleViewChange = async (_id) => {
    setModelType("view")
    getUserDetail(_id)
  }

  const handleEditChange = async (_id) => {
    setModelType("edit");
    getUserDetail(_id)
  }


  return (
    <div className="h-[100vh] overflow-x-hidden overflow-y-hidden">
      <>
        {/* <DebugLogger data={data} label="Organizer details"/> */}
        <UserFilterPanel search={search} setSearch={setSearch} setStatus={setStatus} />
        {
          loading ? (
            <div>
              <div
                className="grid ml-[4rem] text-white gap-x-1 border-b py-2 bg-[var(--color-secondary)] rounded mt-10 mr-5"
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
          ) :
            (
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
                </UserTable>
                <OrganizerPagination totalPage={totalPage} page={page} setPage={setPage} />
              </>
            )
        }
      </>

      {
        modelType === "view" && (<OrganizerDetails setModelType={setModelType} singleUserData={userDetail} />)
      }
      {
        modelType === "edit" && (<OrganizerEdit setModelType={setModelType} data={userDetail} setRefresh={setRefresh} />)
      }
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

export default ListOrganizer;
