import React, { useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AddInternalTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_code: "+91",
    mobile: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      let file = files[0];

      setProfile(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = new FormData();
    data.append("internal-profile", profile);
    data.append("data", JSON.stringify(formData));

    try {
      const response = await axiosInstance.post(
        "admin/squard/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        toast.success(
          response.data.message ?? "internal team member created successfully.",
          {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          },
        );
        navigate("/list-internal-team")
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        },
      );
    } finally {
      setFormData({
        name: "",
        email: "",
        c_code: "+91",
        mobile: "",
        password: "",
        location: ""
      });
      setProfile("");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-[100vh] items-center ">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-lg p-8 bg-white  rounded-lg shadow-lg  shadow-md "
      >
        <h2 className="text-3xl font-bold text-dark-blue mb-6 text-center">
          Add Internal Team Employee
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-semibold text-black">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-1 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="Enter full name"
            />
            <label className="font-semibold text-black">Email ID:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-1 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="Enter email"
            />
            <div className="w-full">
              <label className="font-semibold text-black">Mobile No:</label>
              <div className="w-full flex">
                <select
                  value={formData.c_code}
                  onChange={handleChange}
                  className="mt-2  p-1 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue w-1/5 "
                  name="country_code"
                  id=""
                >
                  <option value="+91">+91</option>
                  <option value="+65">+65</option>
                  <option value="+04">+04</option>
                  <option value="+91">+91</option>
                </select>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-2 ml-2 p-1 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue  w-4/5 "
                  placeholder="Enter mobile No"
                />
              </div>
            </div>
            <label className="font-semibold text-black">Password:</label>
            <div className="flex justify-between">
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 p-1 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue"
                placeholder="Enter password"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-2 p-1 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue"
                placeholder="City"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold ">Profile Image:</label>
            <div className="mt-2 flex items-center justify-center p-4 border-2 border-dashed  rounded-lg hover:border-blue transition">
              <label className="flex flex-col items-center justify-center w-full h-8 cursor-pointer">
                {profile ? (
                  <span className="text-sm text-black">{profile.name}</span>
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V4m10 12V4m-6 8V4m8 4H3"
                      ></path>
                    </svg>
                    <span className="text-sm ">Click to select a profile</span>
                  </>
                )}
                <input
                  type="file"
                  name="profile"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 flex align-middle justify-center gap-2 ${loading ? "bg-[var(--color-secondary)] opacity-35" : "bg-[var(--color-secondary)]"
              }  text-white font-semibold rounded-lg shadow hover:bg-[var(--color-gray-600)] transition`}
          >
            {loading && (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
              </div>
            )}
            <span>Login</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInternalTeam;
