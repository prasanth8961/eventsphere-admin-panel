import React, { useState } from "react";
import { IoArrowForward, IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { MdEvent, MdOutlineHome } from "react-icons/md";
import { RiMenuFold4Line, RiTeamLine, RiArrowDropDownLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../App/Features/Auth/authSlice";
import { Link } from "react-router-dom";

const SideMenuBar = ({ showMenu, setShowMenu }) => {
  const [selected, setSelected] = useState(null);
  const [selectedLinkOption, setSelectedLinkOption] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [showMenu, setShowMenu] = useState(true);
  const token = localStorage.getItem("token");

  const toggle = (i) => {
    setSelected(selected === i ? null : i);
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logOut());
    navigate("/login");
  };

  const general = [
    {
      selector: "Dashboard",
      initialIcon: <MdOutlineHome />,
      endIcon: <RiArrowDropDownLine />,
      link: "/dashboard",
      options: [],
    },
    {
      selector: "Categories",
      initialIcon: <RiMenuFold4Line />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Category", link: "/add-category" },
        { value: "List Categories", link: "/categories-list" },
      ],
    },
    {
      selector: "User Management",
      initialIcon: <FiUsers />,
      endIcon: <RiArrowDropDownLine />,
      options: [{ value: "List Users", link: "/get-all-user" }],
    },
    {
      selector: "Organizers",
      initialIcon: <GoOrganization />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Organizer", link: "/add-organizer" },
        { value: "List Organizers", link: "/organizers" },
      ],
    },
    {
      selector: "Internal Team",
      initialIcon: <RiTeamLine />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Employee", link: "/add-internal-team" },
        { value: "List Employees", link: "/list-internal-team" },
      ],
    },
    {
      selector: "Events",
      initialIcon: <MdEvent />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Event", link: "/add-event" },
        { value: "Events", link: "/events/active" },
      ],
    },
  ];

  const handleIconClick = (link) => {
  // setShowMenu(true)
  console.log(link)
   navigate(link);
  }
  return token ? (
    <div
      className={`h-screen text-white fixed top-0 transition-all duration-300 shadow-lg flex flex-col ${showMenu ? "w-60" : "w-16 rounded-tr-2xl rounded-br-2xl"
        }`}
      style={{ backgroundColor: "var(--color-secondary-dark)" }}
    >
      {/* Header */}
      <div className={showMenu ? "flex justify-between items-center p-3 relative" : "flex  items-center p-3 relative"}>
        {showMenu && <h1 className="text-xl font-bold">Event Sphere</h1>}
        {
          showMenu ? (<BiArrowBack
            className="text-2xl h-8 w-8 cursor-pointer absolute top-4 -right-3 bg-[#5800FF] rounded-lg transition duration-300"
            onClick={() => setShowMenu(!showMenu)}
          />) : (<IoArrowForward
            className="text-2xl h-8 w-8 cursor-pointer absolute top-4 -right-3 bg-[#5800FF] rounded-lg transition duration-300"
            onClick={() => setShowMenu(!showMenu)}
          />)
        }
      </div>

      {/* Menu */}
      <div className={`px-2 py-4 flex-1 overflow-y-auto font-semibold${showMenu ? "" : "mt-[25vh]"}`}>
        {general.map((data, index) => (
          <div
            key={index}
            className={`py-2 px-2 flex items-start transition duration-300 gap-2 ${!showMenu ? "justify-center" : "justify-start"
              }`}
          >
            <span onClick={() => handleIconClick((data.options && data.options?.length > 0 ) ? data.options?.length === 1 ? data.options[0].link : data.options[1].link : '/')} className={showMenu ? "text-xl" : "text-xl mt-5 cursor-pointer"}>{data.initialIcon}</span>
            {showMenu && (
              <div
                className={`w-full transition-all duration-300 ease-in-out 
    ${showMenu ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-2"}
  `}
              >
                <div
                  onClick={() => toggle(index)}
                  className="flex cursor-pointer justify-between"
                >
                  <div>
                    {data.link ? (
                      <Link to={data.link}>{data.selector}</Link>
                    ) : (
                      <h1>{data.selector}</h1>
                    )}
                  </div>
                  {!data.link && (
                    <span className="text-2xl">{data.endIcon}</span>
                  )}
                </div>

                {selected === index && (
                  <div
                    className={`flex flex-col mt-2 ml-2 transition-all duration-300 ease-in-out overflow-hidden 
    ${selected === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
  `}
                  >
                    {data.options.map((option, i) => (
                      <span key={i} className="flex items-center gap-1 py-1">
                        <VscDebugBreakpointLog
                          color={option.value === selectedLinkOption ? "#00FFAB" : "#ffffff"}
                        />
                        <Link
                          to={option.link}
                          onClick={() => setSelectedLinkOption(option.value)}
                          style={{
                            color:
                              option.value === selectedLinkOption ? "#00FFAB" : "#ffffff",
                          }}
                          className="select-none"
                        >
                          {option.value}
                        </Link>
                      </span>
                    ))}
                  </div>

                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      {showMenu && (
        <div
          className="flex items-center px-4 py-3 cursor-pointer border-t border-gray-600"
          onClick={handleLogOut}
        >
          <BiLogOut className="text-xl mr-2" />
          <span>Log out</span>
        </div>
      )}
    </div>
  ) : null;
};

export default SideMenuBar;
