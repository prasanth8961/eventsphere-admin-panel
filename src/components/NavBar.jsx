import React from "react";

import { IoMenuOutline } from "react-icons/io5";
import Config from "../App/service/config";
const NavBar = ({ showMenu, setShowMenu }) => {
  return (
    <div className={Config.token ? "h-12 bg-white" : "hidden"}>
      <IoMenuOutline className="menu" onClick={() => setShowMenu(!showMenu)} />
    </div>
  );
};

export default NavBar;
