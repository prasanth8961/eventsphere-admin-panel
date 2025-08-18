import React, { useState } from "react";
import axiosInstance from "../utilities/axiosInstance";
import Config from "../App/service/config";
const EditCard = ({ userDetailEdit, popupEdit, setPopupEdit, circle }) => {
  const [value, setValue] = useState({
    name: userDetailEdit[0].name,
    mobile: userDetailEdit[0].mobile,
    email: userDetailEdit[0].email,
    password: "",
  });
  const id = userDetailEdit[0]._id;
    const [image, setImage] = useState(null);
    const handleChange = (e) => {
    if (e.target.files) {
            setImage(e.target.files[0]);
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", id);
    data.append("name", value.full_name);
    data.append("email", value.email);
    if (value.password && value.password.trim() !== "") {
      data.append("password", value.password);
    }
    data.append("mobile", value.mobile);
    if (image != null) {
      data.append("internal-profile", image);
    }

    try {
      const response = await axiosInstance.put(Config.updateInternalTeam, data);
      alert(response.data.message);
            setPopupEdit(!setPopupEdit);
    } catch (err) {
            alert(err.response.data.message);
    }
  };
  return (
    <div className="absolute z-50 left-0 inset-0 flex items-center justify-center  bg-black bg-opacity-75">
      <div className="bg-white p-8 relative rounded-lg shadow-lg w-full max-w-md">
        <>
          <div className="flex  justify-between ">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Edit Internal Team
            </h3>
            <button
              onClick={() => setPopupEdit(!popupEdit)}
              className="bg-red px-4 py-2 rounded-md  text-white absolute right-1 top-1"
            >
              X
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Full Name:</label>
              <input
                type="text"
                name="name"
                value={value.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter category name"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Mobile No:</label>
              <input
                type="text"
                name="mobile"
                value={value.mobile}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Email:</label>
              <input
                type="text"
                name="email"
                value={value.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex flex-col">
              {/* <label className="font-semibold text-gray-700">Password:</label>
              <input
                type="text"
                name="password"
                value={value.password}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter image URL"
              />*/}
            </div> 
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Image:</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="mt-1 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setPopupEdit(!popupEdit)}
                className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default EditCard;
