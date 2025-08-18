import axios from "axios";
import { useState } from "react";
import { BiCurrentLocation, BiPlus } from "react-icons/bi";
import { Bounce, toast } from "react-toastify";
import { useAddEventMutation } from "../../App/Features/Api/eventApiSlice";
import Config from "../../App/service/config";
import SubEventsDisplyCard from "../../components/SubEventsDisplyCard";

const AddEvent = () => {
  const currencies = ["USD", "EUR", "INR", "GBP", "JPY"];
  const districts = [
    "Pudukkottai",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
  ];
  const audienceTypes = ["General", "VIP", "Students", "Employees"];
  const eventCategories = [
    "Arts",
    "Music",
    "Sports",
    "Technology",
    "Education",
  ];
  const ticketTypes = ["General", "VIP", "Student", "Early Bird", "Group"];
  const countryCodes = ["+1", "+44", "+91", "+61", "+81"];

  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [addSubEvents, setAddSubEvents] = useState(false);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const [mainEventData, setMainEventData] = useState({
    name: "",
    location: "",
    description: "",
    registration_start: "",
    registration_end: "",
    longitude: "",
    latitude: "",
    audience_type: "",
    currency: "",
    is_main: true,
    starting_date: "",
    ending_date: "",
    category: "",
    tags: [],
    multi_tickets: false,
  });

  const [subEventsData, setSubEventsData] = useState([]);
  const [subEventCoverImages, setSubEventCoverImages] = useState([]);
  const [currentSubEvent, setCurrentSubEvent] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    video_url: "",
    starting_date: "",
    hostedBy: "",
    host_email: "",
    host_mobile: "",
    c_code: "",
    ticket_quantity: "",
    ticket_type: "",
    ticket_price: "",
    sub_cover_images: [],
  });

  const addSubEvent = () => {
    setSubEventsData((prevData) => [
      ...(Array.isArray(prevData) ? prevData : []),
      currentSubEvent,
    ]);

    setSubEventCoverImages([
      ...subEventCoverImages,
      currentSubEvent.sub_cover_images,
    ]);
        setCurrentSubEvent({
      name: "",
      description: "",
      start_time: "",
      end_time: "",
      video_url: "",
      starting_date: "",
      hostedBy: "",
      host_email: "",
      host_mobile: "",
      c_code: "",
      ticket_quantity: "",
      ticket_type: "",
      ticket_price: "",
      sub_cover_images: [],
    });
  };

  const [submitEvent, { isLoading, isSuccess, isError }] =
    useAddEventMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (mainImage) {
      formData.append("main_image", mainImage);
    } else {
      toast.warning(
        "Main image is not provided.",
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
        }
      )
    }

    coverImages?.forEach((image, index) => {
      if (image) {
        formData.append("cover_images", image);
      } else {
        toast.warning(
          `Cover image at index ${index} is not provided.`,
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
          }
        )
      }
    });

    subEventCoverImages.forEach((subEvent, subIndex) => {
      subEvent.forEach((image, imgIndex) => {
        formData.append(`sub_cover_images${subIndex + 1}`, image);
      });
    });

    const data = {
      name: mainEventData.name,
      location: mainEventData.location,
      description: mainEventData.description,
      registration_start: mainEventData.registration_start,
      registration_end: mainEventData.registration_end,
      latitude: userLocation !== null ? userLocation.latitude : "00.0000",
      longitude: userLocation !== null ? userLocation.longitude : "00.0000",
      category: mainEventData.category,
      tags: tags,
      audience_type: mainEventData.audience_type,
      multi_tickets: mainEventData.multi_tickets,
      currency: mainEventData.currency,
      is_main: mainEventData.is_main,
      starting_date: mainEventData.starting_date,
      ending_date: mainEventData.ending_date,
      sub_events: subEventsData.map((subEvent) => ({
        name: subEvent.name,
        description: subEvent.description,
        video_url: subEvent.video_url,
        starting_date: subEvent.starting_date,
        start_time: subEvent.start_time,
        end_time: subEvent.end_time,
        hostedBy: subEvent.hostedBy,
        c_code: subEvent.c_code,
        host_mobile: subEvent.host_mobile,
        host_email: subEvent.host_email,
        ticket_type: subEvent.ticket_type,
        ticket_price: subEvent.ticket_price,
        ticket_quantity: subEvent.ticket_quantity,
      })),
    };

    //     // 

    formData.append("data", JSON.stringify(data));

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      const response = await axios.post(
        `${Config.baseUrl}${Config.createEvent}`,
        formData,
        {
          headers: headers,
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
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
        toast.error(response.data.message, {
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
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
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
        toast.error("Something went wrong. Try again!", {
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
      }
    }
    finally {
      setMainEventData({
        name: "",
        location: "",
        description: "",
        registration_start: "",
        registration_end: "",
        longitude: "",
        latitude: "",
        audience_type: "",
        currency: "",
        is_main: true,
        starting_date: "",
        ending_date: "",
        category: "",
        tags: [],
        multi_tickets: false,
      });

      setCurrentSubEvent({
        name: "",
        description: "",
        start_time: "",
        end_time: "",
        video_url: "",
        starting_date: "",
        hostedBy: "",
        host_email: "",
        host_mobile: "",
        c_code: "",
        ticket_quantity: "",
        ticket_type: "",
        ticket_price: "",
        sub_cover_images: [],
      });


      setMainImage(null);
      setCoverImages([]);
      setUserLocation(null);
      setAddSubEvents(false);
      setTags([]);

      setLoading(false);

    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          toast.warning(
            error.message || "Error while getting location",
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
            }
          )
        },
      );
    } else {
      toast.warning(
        "Geolocation is not supported by this browser.",
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
        }
      )
      setUserLocation({ latitude: "00.0000", longitude: "00.0000" });
    }
  };
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };


  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handlesubEventCoverImageFileChange = (e, idx = null) => {
    setCurrentSubEvent((prevState) => ({
      ...prevState,
      sub_cover_images: [...prevState.sub_cover_images, e.target.files[0]],
    }));
  };

  const handleChange = (e) => {
    setMainEventData({ ...mainEventData, [e.target.name]: e.target.value });
  };

  const handleSubEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleCoverImageFileChange = (e) => {
    const files = e.target.files;
    const updatedCoverImages = [...coverImages];
    for (let i = 0; i < files.length; i++) {
      updatedCoverImages.push(files[i]);
    }

    setCoverImages(updatedCoverImages);
  };

  const handleRemoveImage = (index) => {
    const updatedCoverImages = coverImages.filter((_, idx) => idx !== index);
    setCoverImages(updatedCoverImages);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  ml-10">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-6xl space-y-6 p-6 bg-white rounded shadow-md backdrop-filter backdrop-blur-lg bg-opacity-40 m-2"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Create New Event
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <InputField
                label="Event Name:"
                name="name"
                value={mainEventData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block font-semibold">
                District:
                <select
                  name="location"
                  value={mainEventData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <InputField
            label="Description:"
            name="description"
            value={mainEventData.description}
            onChange={handleChange}
            textarea={true}
            type="textarea"
          />

          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4">
              <h3 className="text-lg font-bold">User Registration Period</h3>
              <p className="text-sm text-gray-600">
                Set the time window during which users can register/book for this event.
              </p>
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold">
                Registration Start Date:
                <input
                  type="date"
                  name="registration_start"
                  value={mainEventData.registration_start}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold">
                Registration End Date:
                <input
                  type="date"
                  name="registration_end"
                  value={mainEventData.registration_end}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>

          </div>
          <div className="flex flex-wrap -mx-2 cursor-pointer">
            <div className="w-full md:w-1/2 px-2">
              <div className="flex gap-2 justify-between items-center">
                <div className="flex gap-2" onClick={getUserLocation}>
                  <BiCurrentLocation className="pt-1" size={55} color="black" />
                  <p className="pt-4">Get Location</p>
                </div>
                {userLocation ? (
                  <div className="flex gap-3">
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                  </div>
                ) :
                  <div className="flex gap-3">
                    <p>Latitude : 00.0000</p>
                    <p>Longitude: 00.0000</p>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Event Tags (e.g., Free Food, Computers):
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded shadow-sm">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 text-red hover:text-red font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
                className="flex-grow outline-none px-2 py-1"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-between">
            <label className="w-[50%] font-semibold">
              Audience type:
              <select
                name="audience_type"
                value={mainEventData.audience_type}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              >
                <option value="">Select Audience Type</option>
                {audienceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="w-[50%] font-semibold">
              Event Category:
              <select
                name="category"
                value={mainEventData.category}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              >
                <option value="">Select Event Category</option>
                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex gap-2 justify-between">
            <label className="block  font-semibold">
              Is Main event:
              <div className="h-6 w-6  border-[1px] rounded-sm m-2 ">
                <input
                  type="checkbox"
                  name="is_main"
                  value={mainEventData.is_main}
                  checked={mainEventData.is_main}
                  onChange={(e) =>
                    setMainEventData({
                      ...mainEventData,
                      [e.target.name]: e.target.checked,
                    })
                  }
                  className="mt-1  block w-full  p-1 border border-bannar rounded shadow-sm"
                />
              </div>
            </label>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold">
                Event starting date:
                <input
                  type="date"
                  name="starting_date"
                  value={mainEventData.starting_date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block font-semibold">
                Event ending date:
                <input
                  type="date"
                  name="ending_date"
                  value={mainEventData.ending_date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>



            <label className="block font-semibold">
              Currency:
              <select
                name="currency"
                value={mainEventData.currency}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              >
                <option value="">Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </label>

          </div>

          <div className="mt-4">
            <div
              className={`mt-2 flex items-center justify-center p-2 border-2 ${mainImage ? "border-[1px]" : "border-dashed"} border-gray-400 rounded-lg hover:border-blue transition duration-300`}
            >
              <label className="flex flex-col items-center justify-center w-full h-[30vh] cursor-pointer">
                {mainImage ? (
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="main-event-img"
                    className="w-full h-full object-cover rounded-lg overflow-hidden"
                  />
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-gray-500"
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
                    <span className="text-sm text-gray-600">
                      Click here to select an image
                    </span>
                  </>
                )}
                <input
                  type="file"
                  name="main_img"
                  onChange={handleMainImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>

            <div className="flex flex-wrap w-full gap-2 mt-4">
              {coverImages.length > 0 &&
                coverImages.map((coverImage, idx) => (
                  <div
                    key={idx}
                    className="relative w-[100px] h-[100px] flex items-center justify-center p-1 border-[1px] border-gray-400 rounded-lg hover:border-blue-500 transition duration-300"
                  >
                    <button
                      className="absolute top-0 right-0 text-white font-semibold bg-red rounded-full w-5 h-5 flex items-center justify-center text-md cursor-pointer"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      X
                    </button>

                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt={`cover-img-${idx}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <input
                        type="file"
                        name={`cover_img_${idx}`}
                        onChange={handleCoverImageFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                ))}

              <div className="w-[100px] h-[100px] flex items-center justify-center p-2 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <BiPlus size={35} className="text-gray-500" />
                  <input
                    type="file"
                    name="cover_img"
                    onChange={handleCoverImageFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          <label className="block font-semibold">
            Add Sub Events:
            <input
              type="checkbox"
              checked={addSubEvents}
              onChange={() => setAddSubEvents(!addSubEvents)}
              className="ml-2"
            />
          </label>
        </div>

        {subEventsData.length > 0 && (
          <div className="mt-2 ">
            <h4 className="text-2xl font-semibold text-gray-600 mb-2">
              Sub Event List
            </h4>
            <div className="space-y-1 flex flex-wrap items-center justify-center">
              {subEventsData.map((subEvent, idx) => (
                <SubEventsDisplyCard key={idx} event={subEvent} />
              ))}
            </div>
          </div>
        )}

        {addSubEvents && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h3 className="text-xl font-semibold mb-2">Sub Event</h3>
            <div className="space-y-4">
              <InputField
                label="Sub Event Name:"
                name="name"
                value={currentSubEvent.name}
                onChange={handleSubEventChange}
              />
              <InputField
                label="Description:"
                name="description"
                value={currentSubEvent.description}
                onChange={handleSubEventChange}
                type="textarea"
              />
              <InputField
                label="Event Video URL:"
                name="video_url"
                value={currentSubEvent.video_url}
                onChange={handleSubEventChange}
              />
              <div className="flex justify-between gap-2">
                <InputField
                  label="Event Start Date:"
                  name="starting_date"
                  value={currentSubEvent.starting_date}
                  onChange={handleSubEventChange}
                  type="date"
                />
                <InputField
                  label="Event Start Time:"
                  name="start_time"
                  value={currentSubEvent.start_time}
                  onChange={handleSubEventChange}
                  type="time"
                />
                <InputField
                  label="Event End Time:"
                  name="end_time"
                  value={currentSubEvent.end_time}
                  onChange={handleSubEventChange}
                  type="time"
                />
              </div>
              <div className="flex justify-between gap-2">
                <InputField
                  label="Host name:"
                  name="hostedBy"
                  value={currentSubEvent.hostedBy}
                  onChange={handleSubEventChange}
                />
                <InputField
                  label="Host Email:"
                  name="host_email"
                  value={currentSubEvent.host_email}
                  onChange={handleSubEventChange}
                />
              </div>

              <div className="flex justify-between gap-2">
                <label className="w-[40%]">
                  Country Code:
                  <select
                    name="c_code"
                    value={currentSubEvent.c_code}
                    onChange={handleSubEventChange}
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded shadow-sm"
                  >
                    <option value="">Select Country Code</option>
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </label>
                <InputField
                  label="Host Mobile:"
                  name="host_mobile"
                  value={currentSubEvent.host_mobile}
                  onChange={handleSubEventChange}
                  type="number"
                />
              </div>

              <div className="flex align-middle justify-between gap-1">
                <label className="w-full">
                  Ticket Type:
                  <select
                    name="ticket_type"
                    value={currentSubEvent.ticket_type}
                    onChange={handleSubEventChange}
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded shadow-sm"
                  >
                    <option value="">Select Ticket Type</option>
                    {ticketTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <InputField
                  label="Ticket Amount:"
                  name="ticket_price"
                  value={currentSubEvent.ticket_price}
                  onChange={handleSubEventChange}
                  type="number"
                />
                <InputField
                  label="Number of Tickets:"
                  name="ticket_quantity"
                  value={currentSubEvent.ticket_quantity}
                  onChange={handleSubEventChange}
                  type="number"
                />
              </div>

              <div className="flex flex-wrap w-full gap-2 mt-4">
                {currentSubEvent.sub_cover_images.length > 0 &&
                  currentSubEvent.sub_cover_images.map((coverImg, idx) => (
                    <div
                      key={idx}
                      className={`relative w-[100px] h-[100px] flex items-center justify-center p-1 ${coverImg ? "border-[1px]" : "border-dashed"} border-gray-400 rounded-lg hover:border-blue-500 transition duration-300`}
                    >
                      <button
                        className="absolute top-1 right-1 bg-blue text-white font-semibold rounded-full w-5 h-5 flex items-center justify-center text-md cursor-pointer"
                        onClick={() => handleSubCoverImageRemove(idx)}
                      >
                        X
                      </button>

                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <img
                          src={URL.createObjectURL(coverImg)}
                          alt={`cover-img-${idx}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <input
                          type="file"
                          name={`cover_img_${idx}`}
                          onChange={(e) =>
                            handlesubEventCoverImageFileChange(e, idx)
                          }
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  ))}

                <div className="w-[100px] h-[100px] flex items-center justify-center p-2 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <BiPlus size={35} className="text-gray-500" />
                    <input
                      type="file"
                      name="cover_img"
                      onChange={(e) => handlesubEventCoverImageFileChange(e, 0)}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={addSubEvent}
              className="mt-4 w-full px-4 py-2 bg-blue text-white font-semibold rounded shadow"
            >
              Add Sub Event
            </button>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 flex align-middle justify-center gap-2 ${loading ? "bg-btn-color opacity-35" : "bg-btn-color"
            }  text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition`}
        >
          {loading && (
            <div className="flex items-center justify-center">
              <div className="h-6 w-6 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
            </div>
          )}
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <label className="block font-semibold w-full">
    {label}
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
      />
    )}
  </label>
);

export default AddEvent;
