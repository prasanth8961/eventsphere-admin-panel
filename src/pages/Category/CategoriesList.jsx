import React, { useState, useEffect } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import Config from "../../App/service/config";
import { BiEdit, BiEditAlt } from "react-icons/bi";
import { toast, Bounce } from "react-toastify";

const CategoriesList = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axiosInstance.get(Config.getAllEventCategory);
        if (response.data.success == true && response.data.data.categories) {
          setCategory(response.data.data.categories);
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
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (category) => {
    setName(category.name);
    setImage(category.image);
    setId(category.id);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { files } = e.target;
    setImage(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", name);
    data.append("category", image);
    data.append("id", id);

    try {
      setLoading(true);
      const response = await axiosInstance.put(`admin/category`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status == true) {
        toast.success(
          response.data.message ?? "category updated successfully",
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
      }
      setLoading(false);
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
      setLoading(false);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className=" container mx-auto pt-2 pb-5 pr-5 h-screen self-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-600 ml-10 ">
        Categories List
      </h2>
      <div className="max-h-[32rem] flex justify-center ml-10">
        <table className="min-w-full  bg-white  shadow ">
          <thead className="sticky top-0 ">
            <tr className="bg-[var(--color-secondary)] text-white">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category, idx) => (
              <tr
                key={category.id}
                className={`border-b border-border ${idx % 2 != 0 ? "bg-tbl-even" : "bg-tbl-odd"}`}
              >
                <td className="py-3 px-4">{category._id}</td>
                <td className="py-3 px-4">
                  <img
                    src={`${category.image}`}
                    alt={`${category.name}.png`}
                    className="w-16 h-16 object-cover rounded item-center"
                  />
                </td>
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4 text-center">
                  <div
                    onClick={() => handleEdit(category)}
                    className="flex self-center items-center gap-2 cursor-pointer justify-center"
                  >
                    <BiEditAlt color="grey" />
                    <span className="text-gray-600 font-semibold  ">EDIT</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-600">
              MADE CHANGES ON CATEGORY
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col mb-2">
                <label className="font-semibold text-gray-600">
                  change category name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter category name"
                />
              </div>
              <div className="">
                <label className="font-semibold text-gray-600">
                  Change category image
                </label>
                <div className="flex items-center justify-center p-4 mt-3 border-2 border-dashed border-black rounded-lg hover:border-blue transition h-48 w-full">
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    {typeof image === "object" ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      name="category_img"
                      onChange={handleChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>

              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 flex align-middle justify-center gap-2 ${loading ? "bg-[var(--color-secondary)] opacity-35 " : "bg-[var(--color-secondary)]"
                    }  text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition`}
                >
                  {loading && (
                    <div className="flex items-center justify-center">
                      <div className="h-6 w-6 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
                    </div>
                  )}
                  <span>Save Changes</span>
                </button>


              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
