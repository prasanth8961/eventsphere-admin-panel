import React, { useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import Config from "../../App/service/config";
import { useNavigate } from "react-router-dom";

const AddOrganizer = () => {
  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "ccode": "+91",
    "mobile": "",
    "role": "organizer",
    "password": "",
    "location": "",
    "longitude": "",
    "latitude": "",
    "collegeName": "",
    "collegeCode": "",
  });

  const [noc, setNoc] = useState(null);
  const [idCard, setIdCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name == "noc") {
      setNoc(e.target.files[0]);
    }
    if (e.target.name == "idCard") {
      const files = Array.from(e.target.files);
      if (files.length > 2) {
        toast.warning("please select max 2 images", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        setIdCard(files);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("noc", noc);
    idCard.forEach((file, index) => {
      data.append("proof", file);
    });
    data.append("data", JSON.stringify(formData));
    try {
      const response = await axios.post(
        `${Config.baseUrl}/auth/organizer/signup`,
        data,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
            console.log("FROM SIGNUP RESPONSE ::::" + Object.keys(response.data))
      if (response.data.success) {
        toast.success(
          response.data.message ?? "Organizer created successfully.",
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
        setFormData({
          full_name: "",
          email: "",
          password: "",
          country_code: "+91",
          mobile: "",
          user_role: "organizer",
          college_name: "",
          college_code: "",
          location: "",
          longitude: "",
          latitude: "",
        });
        setIdCard([]);
        setNoc(null);
        navigate("/organizers")
      } else {
        toast.warning(
          response.data.message ?? "Something went wrong. try again!",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          },
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong. try again!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-3xl space-y-6 p-6 bg-white rounded shadow-md "
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          CREATE NEW ORGANIZER
        </h2>
        <div className="flex flex-wrap w-full">
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Full Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="flex w-1/2">
            <div className="w-1/2 px-2">
              <label className="block font-semibold">
                Code:
                <select
                  onChange={() => handleChange}
                  value={formData.ccode}
                  className="mt-1 block w-full py-2  border border-gray-300 rounded shadow-sm"
                  name="ccode"
                  id=""
                >
                  <option value="+91">+91</option>
                  <option value="+65">+65</option>
                </select>
              </label>
            </div>
            <div className="w-full px-2">
              <label className="block font-semibold">
                Mobile No:
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              College Name:
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              College Code:
              <input
                type="text"
                name="collegeCode"
                value={formData.collegeCode}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Password:
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="flex w-1/2">
            <div className="w-1/2 px-2">
              <label className="block font-semibold">
                Latitude:
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
            <div className="w-1/2 px-2">
              <label className="block font-semibold">
                Longitude:
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Noc:
              {noc && <p>{noc.name}</p>}
              <input
                type="file"
                accept="application/pdf"
                name="noc"
                onChange={handleChange}
                className="mt-1 bg-white block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              ID Card:
              {idCard.length > 0 &&
                idCard.map((data, idx) => (
                  <div key={idx} className="flex">
                    <p>{data.name}</p>
                  </div>
                ))}
              <input
                type="file"
                multiple
                accept="image/*"
                name="idCard"
                onChange={handleChange}
                className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 flex align-middle justify-center gap-2 ${
              loading ? "bg-[var(--color-secondary)] opacity-35" : "bg-[var(--color-secondary)]"
            }  text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition`}
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

export default AddOrganizer;
