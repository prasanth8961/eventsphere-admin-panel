import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { BiCurrentLocation, BiPlus } from "react-icons/bi";
import { Bounce, toast } from "react-toastify";
import SubEventsDisplyCard from "../../components/SubEventsDisplyCard";
import Config from "../../App/service/config";
import axiosInstance from "../../utilities/axiosInstance";
import { json } from "react-router-dom";
import axios from "axios";

const steps = [
  "Basic Info",
  "Date & Time",
  "Location",
  "Media",
  "Sub-Events",
  "Review & Submit"
];

const eventDataObj = {
  "Basic Info": {
    name: "",
    location: "",
    audience_type: "",
    category: "",
    currency: "",
    description: "",
  },
  "Date & Time": {
    registration_start: "",
    registration_end: "",
    starting_date: "",
    ending_date: "",
  },
  "Location": {
    longitude: "",
    latitude: "",
    is_main: true,
    tags: [],
    multi_tickets: false,
  },
  "Media": {
    mainImage: null,
    coverImages: []
  },
  "Sub-Events": [],
  "Review & Submit": {
    mainEventData: null,
    subEventsData: null
  }
}


const eventCategoryData = [
  "Arts",
  "Music",
  "Sports",
  "Technology",
  "Education",
];


export default function CreateEvent() {
  const [step, setStep] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [addSubEvents, setAddSubEvents] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [eventData, setEventData] = useState(eventDataObj);


  const [isGettingUserLocation, setIsGettingUserLocation] = useState(false);


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
  const [eventCategories, setEventCategories] = useState(eventCategoryData);
  const ticketTypes = ["General", "VIP", "Student", "Early Bird", "Group"];
  const countryCodes = ["+1", "+44", "+91", "+61", "+81"];



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
    _id: Math.round(100 * Math.random() + 1),
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


  const validateSubEvent = (subEvent) => {
    const errors = {};

    if (!subEvent.name.trim()) errors.name = "Name is required.";
    if (!subEvent.description.trim()) errors.description = "Description is required.";
    if (!subEvent.starting_date) errors.starting_date = "Start date is required.";
    if (!subEvent.start_time) errors.start_time = "Start time is required.";
    if (!subEvent.end_time) errors.end_time = "End time is required.";
    if (!subEvent.ticket_quantity) errors.ticket_quantity = "Ticket quantity is required.";
    if (!subEvent.ticket_type.trim()) errors.ticket_type = "Ticket type is required.";
    if (!subEvent.ticket_price) errors.ticket_price = "Ticket price is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (subEvent.host_email && !emailRegex.test(subEvent.host_email)) {
      errors.host_email = "Invalid email format.";
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (subEvent.host_mobile && !mobileRegex.test(subEvent.host_mobile)) {
      errors.host_mobile = "Invalid mobile number (10 digits required).";
    }

    return errors;
  };


  const addSubEvent = () => {

    const errors = validateSubEvent(currentSubEvent);
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      showToast(firstError);
      return;
    }

    setSubEventsData((prevData) => [
      ...(Array.isArray(prevData) ? prevData : []),
      currentSubEvent,
    ]);

    setSubEventCoverImages([
      ...subEventCoverImages,
      currentSubEvent.sub_cover_images,
    ]);

    const currentStep = steps[step];

    setEventData((prev) => ({
      ...prev,
      [currentStep]: [
        ...(prev[currentStep] || []),
        subEventsData,
      ],
    }));


    setCurrentSubEvent({
      id: Math.round(100 * Math.random() + 1),
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


  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axiosInstance.get(Config.getAllEventCategory);
        if (response.data.success == true && response.data.data.categories) {
          setEventCategories(response.data.data.categories.map((x, _) => x.name));
        }
      } catch (error) {
        toast.error(error.message ?? "Something went wrong. try again!", {
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
    };
    getCategory();
  }, [])


  const validateStepData = () => {
    const key = steps[step];
    const currentData = eventData[key];

    switch (key) {
      case "Basic Info":
        return (
          currentData.name?.trim() &&
          currentData.location?.trim() &&
          currentData.audience_type?.trim() &&
          currentData.category?.trim() &&
          currentData.currency?.trim() &&
          currentData.description?.trim()
        );

      case "Date & Time":
        return (
          currentData.registration_start?.trim() &&
          currentData.registration_end?.trim() &&
          currentData.starting_date?.trim() &&
          currentData.ending_date?.trim()
        );

      case "Location":
        return (
          currentData.longitude &&
          currentData.latitude
        );

      case "Media":
        return currentData.mainImage !== null;

      case "Sub-Events":
        if (!Array.isArray(subEventsData) || subEventsData.length === 0) return false;
        return subEventsData.every(sub =>
          sub.name?.trim() &&
          sub.description?.trim() &&
          sub.start_time?.trim() &&
          sub.end_time?.trim() &&
          sub.video_url?.trim() &&
          sub.starting_date?.trim() &&
          sub.hostedBy?.trim() &&
          sub.host_email?.trim() &&
          sub.host_mobile?.trim() &&
          sub.c_code?.trim() &&
          sub.ticket_quantity?.trim() &&
          sub.ticket_type?.trim() &&
          sub.ticket_price?.trim()
        );

      case "Review & Submit":
        return mainEventData && subEventsData;

      default:
        return false;
    }
  };



  const handleNext = () => {
    if (!validateStepData()) {
      const key = steps[step];
      const currentObj = eventDataObj[key];

      const errors = {};

      for (let field in currentObj) {
        if (!currentObj[field]) {
          errors[field] = `${field} is required`;
        }
      }

      setError(prev => ({
        ...prev,
        [key]: errors
      }));
      toast.warning("Please fill out all required fields before continuing.", {
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
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };


  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentStep = steps[step];

    setEventData(prev => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        [name]: value
      }
    }));
    setMainEventData({ ...mainEventData, [name]: value });
  };

  const toastSettings = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };

  const showToast = (errorMsg) => {
    toast.error(errorMsg, toastSettings);
  };

  let retryCount = 0;
  const maxRetries = 3;

  const getUserLocation = () => {
    setIsGettingUserLocation(true);

    if (!navigator.geolocation) {
      showToast("Geolocation is not supported by this browser.");
      setIsGettingUserLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentStep = steps[step];

        setEventData((prev) => ({
          ...prev,
          [currentStep]: {
            ...prev[currentStep],
            latitude,
            longitude,
          },
        }));

        setUserLocation({ latitude, longitude });
        toast.success("Location fetched!", toastSettings);
        setIsGettingUserLocation(false);
      },
      (error) => {
        let errorMsg;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMsg = "The request to get user location timed out.";
            break;
          default:
            errorMsg = "An unknown error occurred while acquiring location.";
        }

        showToast(errorMsg);
        setIsGettingUserLocation(false);

        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(() => getUserLocation(), 1000);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };


  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        const currentStep = steps[step];
        setEventData((prev) => ({
          ...prev,
          [currentStep]: {
            ...prev[currentStep],
            tags: [...prev[currentStep].tags, input.trim()],
          },
        }));

        setTags([...tags, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index) => {
    const filteredTags = tags.filter((_, i) => i !== index);
    const currentStep = steps[step];
    setEventData((prev) => ({
      ...prev,
      [currentStep]: {
        ...prev[currentStep],
        tags: filteredTags,
      },
    }));
    setTags(filteredTags);
  };



  const handlesubEventCoverImageFileChange = (e, idx = null) => {
    setCurrentSubEvent((prevState) => ({
      ...prevState,
      sub_cover_images: [...prevState.sub_cover_images, e.target.files[0]],
    }));
  };

  const handleSubEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const currentStep = steps[step];
      setEventData((prev) => ({
        ...prev,
        [currentStep]: {
          mainImage: file
        }
      }))
    }
  };
  const handleCoverImageFileChange = (e) => {
    const files = e.target.files;
    const updatedCoverImages = [...coverImages];
    for (let i = 0; i < files.length; i++) {
      updatedCoverImages.push(files[i]);
    }

    const currentStep = steps[step];
    setEventData((prev) => ({
      ...prev,
      [currentStep]: {
        coverImages: updatedCoverImages
      }
    }))
    setCoverImages(updatedCoverImages);
  };

  const handleRemoveImage = (index) => {
    const updatedCoverImages = coverImages.filter((_, idx) => idx !== index);
    setCoverImages(updatedCoverImages);
    const currentStep = steps[step];
    setEventData((prev) => ({
      ...prev,
      [currentStep]: {
        coverImages: updatedCoverImages
      }
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setIsProcessing(false);


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
      setLoading(true);
      setProgress(10);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 1;
          return prev;
        });
      }, 120);

      const response = await axios.post(
        `${Config.baseUrl}${Config.createEvent}`,
        formData,
        {
          headers: headers,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (percent >= 90) {
              setProgress(90);
            } else {
              setProgress((prev) => Math.max(prev, 10 + Math.floor(percent * 0.8)));
            }
          },
        }
      );

      clearInterval(interval);
      setProgress(95);
      setIsProcessing(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProgress(100);

      const message = response.data?.message || "Event created successfully!";
      if (response.status === 200) {
        toast.success(message, {
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
        toast.error(message, {
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
      setEventData(eventDataObj);
      setStep(0);

      setTimeout(() => {
        setLoading(false);
        setIsProcessing(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      clearInterval(interval);
      setLoading(false);
      setIsProcessing(false);
      setProgress(0);
      const message = error?.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message, {
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
    } finally {
      setLoading(false);
    }

  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <InputField
              label="Event Name:"
              name="name"
              value={mainEventData.name}
              onChange={handleChange}
            />

            <div className="flex justify-between items-center gap-4">


              <label className="block w-[50%]  font-semibold">
                District:
                <select
                  name="location"
                  value={mainEventData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 bg-[#FBFBFB] border border-gray-300 rounded shadow-sm"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </label>


              <label className="w-[50%] font-semibold">
                Audience type:
                <select
                  name="audience_type"
                  value={mainEventData.audience_type}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 bg-[#FBFBFB] border border-gray-300 rounded shadow-sm"
                >
                  <option value="">Select Audience Type</option>
                  {audienceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex justify-between items-center gap-4">
              <label className="w-[50%] font-semibold">
                Event Category:
                <select
                  name="category"
                  value={mainEventData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 bg-[#FBFBFB] border border-gray-300 rounded shadow-sm"
                >
                  <option value="">Select Event Category</option>
                  {eventCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>


              <label className="w-[50%] block font-semibold">
                Currency:
                <select
                  name="currency"
                  value={mainEventData.currency}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 bg-[#FBFBFB] border border-gray-300 rounded shadow-sm"
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
            <InputField
              label="Description:"
              name="description"
              value={mainEventData.description}
              onChange={handleChange}
              textarea={true}
              type="textarea"
            />

          </>
        );
      case 1:
        return (
          <>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full px-2 mb-4">
                <h3 className="text-lg font-bold">User Registration Period</h3>
                <p className="text-sm text-gray-600">
                  Set the time window during which users can register/book for this event.
                </p>
              </div>

              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block font-semibold">
                  Registration Starting Date:
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
                  Registration Ending Date:
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

            <div className="flex flex-wrap -mx-2">
              <div className="w-full px-2 mb-4">
                <h3 className="text-lg font-bold">Event Period</h3>
                <p className="text-sm text-gray-600">
                  Set the time window for this event.
                </p>
              </div>

              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block font-semibold">
                  Event starting Date:
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
                  Event ending Date:
                  <input
                    type="date"
                    name="ending_date"
                    value={mainEventData.ending_date}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                  />
                </label>
              </div>

            </div>

          </>
        );
      case 2:
        return (
          <div className="w-full  px-2 mb-6 space-y-6">
            {!userLocation ? (
              <>
                <div className="flex items-center justify-between">
                  <button
                    onClick={getUserLocation}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white  rounded   disabled:opacity-30  disabled:cursor-not-allowed hover:bg-blue-700 transition-all"
                    disabled={isGettingUserLocation}
                  >
                    <BiCurrentLocation size={24} />
                    {
                      isGettingUserLocation ? <span>Fetching...</span> : <span>Get Location</span>
                    }
                  </button>

                  <label className="block  font-semibold flex items-center">
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

                </div>

                <iframe
                  title="User Location Map"
                  width="100%"
                  height="200"
                  className="rounded border w-full "
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${userLocation?.latitude || 0.000},${userLocation?.longitude || 0.000}&z=15&output=embed`}
                ></iframe>
              </>
            ) : (
              <div className="space-y-4">
                <iframe
                  title="User Location Map"
                  width="100%"
                  height="200"
                  className="rounded border w-full"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}&z=15&output=embed`}
                ></iframe>
              </div>
            )}

            <div className="w-full">
              <label className="block text-gray-600 font-semibold mb-1">
                Event Tags (e.g., Free Food, Computer Labs):
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded shadow-sm">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-1  text-red-500  rounded-full h-4 flex items-center px-1 hover:text-red-700 hover:bg-red-500 hover:text-white font-bold"
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
          </div>
        );

      case 3:
        return (
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
                      className="absolute top-0 right-0 text-white font-semibold bg-red-700 rounded-sm rounded-tr-md rounded-bl-md w-5 h-5 flex items-center justify-center text-md cursor-pointer"
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
        );
      case 4:
        return (
          <div className="text-sm">



            <div className="flex justify-between items-center">

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
              <div className="mt-2 p-2rounded">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold mb-2">Add Sub Event</h3>
                  {
                    addSubEvents && (
                      <button
                        type="button"
                        onClick={addSubEvent}
                        className="w-[10vw] py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded shadow"
                      >
                        Add Sub Event
                      </button>
                    )
                  }
                </div>
                <div className="space-y-4">

                  <div className="flex gap-4">
                    <InputField
                      label="Sub Event Name:"
                      name="name"
                      value={currentSubEvent.name}
                      onChange={handleSubEventChange}
                    />

                    <InputField
                      label="Event Video URL:"
                      name="video_url"
                      value={currentSubEvent.video_url}
                      onChange={handleSubEventChange}
                    />

                  </div>

                  <InputField
                    label="Description:"
                    name="description"
                    value={currentSubEvent.description}
                    onChange={handleSubEventChange}
                    type="textarea"
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
                        className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded shadow-sm"
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
                        className="mt-1 block w-full p-2.5 bg-white border border-gray-300 rounded shadow-sm"
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

              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="p-4 space-y-6">
            {/* Main Event Review */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Info label="Name" value={mainEventData.name} />
              <Info label="Location" value={mainEventData.location} />
              <Info label="Description" value={mainEventData.description} />
              <Info label="Registration Start" value={mainEventData.registration_start} />
              <Info label="Registration End" value={mainEventData.registration_end} />
              <Info label="Longitude" value={eventData['Location'].longitude} />
              <Info label="Latitude" value={eventData['Location'].latitude} />
              <Info label="Audience Type" value={mainEventData.audience_type} />
              <Info label="Currency" value={mainEventData.currency} />
              <Info label="Start Date" value={mainEventData.starting_date} />
              <Info label="End Date" value={mainEventData.ending_date} />
              <Info label="Category" value={mainEventData.category} />
              <Info label="Tags" value={eventData['Location'].tags?.join(", ")} />
              <Info label="Multiple Tickets" value={mainEventData.multi_tickets ? "Yes" : "No"} />
            </div>

            {/* {subEventsData.length > 0 && (
        <section className="border rounded-xl p-4 shadow bg-white">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Sub Events</h2>
          {subEventsData.map((sub, index) => (
            <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Sub Event {index + 1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="Name" value={sub.name} />
                <Info label="Description" value={sub.description} />
                <Info label="Start Time" value={sub.start_time} />
                <Info label="End Time" value={sub.end_time} />
                <Info label="Video URL" value={sub.video_url} />
                <Info label="Start Date" value={sub.starting_date} />
                <Info label="Hosted By" value={sub.hostedBy} />
                <Info label="Host Email" value={sub.host_email} />
                <Info label="Host Mobile" value={sub.host_mobile} />
                <Info label="Country Code" value={sub.c_code} />
                <Info label="Ticket Quantity" value={sub.ticket_quantity} />
                <Info label="Ticket Type" value={sub.ticket_type} />
                <Info label="Ticket Price" value={sub.ticket_price} />
              </div>
              {sub.sub_cover_images?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-600">Cover Images:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sub.sub_cover_images.map((img, i) => (
                      <img key={i} src={img} alt={`Sub Event Cover ${i + 1}`} className="w-24 h-24 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      )} */}
          </div>)
      default:
        return null;
    }
  };


  return (


    <div className="ml-10 min-h-screen overflow-y-auto px-4 flex items-center justify-center">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center">
          {!isProcessing ? (
            <div className="relative w-24 h-24">
              <svg className="w-full h-full animate-spin text-cyan-800" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={((100 - progress) / 100) * 283}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-cyan-900">
                {progress}%
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="animate-pulse text-xl font-bold text-cyan-900 mb-2">
                Processing your event...
              </div>
              <div className="w-10 h-10 border-4 border-cyan-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}



      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={`w-full ${steps[step] == 'Review & Submit' ? 'h-[70vh]' : ''} ${(step == 4 && addSubEvents) ? "max-w-[70vw]" : "max-w-4xl"} ${step == 3 || step == 4 ? "h-full" : "h-[65vh] "} p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300`}
      >
        <h2 className="text-2xl bg-gradient-to-r from-blue-400 via-[#263f40] to-cyan-700 bg-clip-text text-transparent font-bold mb-6 text-center tracking-wide">{steps[step]}</h2>

        <div className="space-y-4">{renderStepContent()}</div>

        <div className={`mt-8 ${step === 0 ? "flex justify-end" : "flex justify-between"}`}>
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2 font-semibold rounded-lg bg-gradient-to-r from-blue-400 to-cyan-200 text-gray-800 border-2  hover:border-[#0F2A2B] transition"
            >
              Back
            </button>
          )}

          {step < steps.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 font-semibold rounded-md bg-gradient-to-l from-blue-400 to-cyan-200 text-gray-800   hover:border-[2px] hover:border-[#0F2A2B] transition"
            >
              Next
            </button>
          )}

          {
            step === steps.length - 1 &&
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#0f2a2b] to-cyan-800 text-white font-semibold shadow-md border-2 border-transparent hover:border-[#0F2A2B] transition"
            >
              Create
            </button>
          }


        </div>


      </form>
    </div>
  );
}


const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 font-medium">{label}</p>
    <p className="text-gray-800">{value || "—"}</p>
  </div>
);

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <label className="block font-semibold w-full">
    {label}
    {type === "textarea" ? (
      <>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
        />

      </>
    ) : (
      <>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
        />

      </>
    )}
  </label>
);
