import React, { useEffect, useState, useMemo } from "react";
import { useAddCategoryMutation } from "../../App/Features/Api/categoryApiSlice";
import { toast, Bounce } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";

// ======== Trie Implementation ========
class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.isWordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let ch of word.toLowerCase()) {
      let idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }
      node = node.children[idx];
    }
    node.isWordEnd = true;
  }

  prefixSearch(word) {
    let node = this.root;
    for (let ch of word.toLowerCase()) {
      let idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!node.children[idx]) {
        return false;
      }
      node = node.children[idx];
    }
    return true;
  }
}

// ======== Component ========
const AddCategory = () => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [formData, setFormData] = useState({
    category_name: "",
    category_img: null,
  });

  const [addCategory] = useAddCategoryMutation();
  const [loading, setLoading] = useState(false);

  const eventCategories = [
    // Educational
    "Seminar", "Workshop", "Conference", "Webinar", "Training Program", "Panel Discussion", "Hackathon", "Competition",
    // Corporate
    "Product Launch", "Networking Event", "Business Conference", "Trade Show", "Annual General Meeting (AGM)", "Press Conference", "Team Building", "Corporate Retreat",
    // Social / Personal
    "Wedding", "Birthday Party", "Anniversary", "Baby Shower", "Graduation Party", "Engagement", "Family Gathering",
    // Cultural / Entertainment
    "Music Concert", "Dance Performance", "Film Festival", "Stand-up Comedy", "Art Exhibition", "Fashion Show", "Theater Play",
    // Sports / Fitness
    "Marathon", "Tournament", "eSports Event", "Yoga Camp", "Sports Meetup", "Fitness Bootcamp",
    // Promotional / Marketing
    "Brand Activation", "Sampling Campaign", "Influencer Meetup", "Roadshow", "Popup Event", "Flash Mob",
    // Others
    "Charity Event", "Fundraiser", "Religious Event", "Holiday Celebration", "Virtual Meetup"
  ];

  // Memoize Trie setup
  const trie = useMemo(() => {
    const t = new Trie();
    eventCategories.forEach(category => t.insert(category));
    return t;
  }, []);

  const findRecommends = () => {
    if (!debouncedSearch) {
      setFilteredCategories(eventCategories);
    } else {
      const filtered = eventCategories.filter(category =>
        trie.prefixSearch(debouncedSearch.toLowerCase()) &&
        category.toLowerCase().startsWith(debouncedSearch.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  useEffect(() => {
    findRecommends();
  }, [debouncedSearch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "category_img") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };
        setSearchInput(updated.category_name);
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("categoryName", formData.category_name);
    if (formData.category_img) {
      data.append("file", formData.category_img);
    }

    try {
      const response = await addCategory(data).unwrap();
      if (response.success) {
        toast.success(response.message ?? "Category created successfully", {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.warning(response.message, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong. Try again!", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      setFormData({ category_name: "", category_img: null });
    }
  };

  return (
    <div className="flex justify-center h-[100vh] items-center">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full text-black max-w-lg p-8 rounded-lg bg-white shadow-md"
      >
        <h2 className="text-3xl font-bold text-gray-600 mb-6 text-start">ADD MORE CATEGORY</h2>

        <div className="space-y-6">
          {/* Category Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Category Name:</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="eg. science"
            />
            {searchInput && filteredCategories.length > 0 && (
              <div
                className="m-2 flex flex-col gap-2 overflow-y-auto transition-all duration-300"
                style={{
                  maxHeight: `${Math.min(filteredCategories.length, 5) * 40}px`,
                }}
              >
                {filteredCategories.map((category, idx) => (
                  <span
                    className="cursor-pointer hover:text-blue-600"
                    key={idx}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, category_name: category }))
                    }
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

          </div>

          {/* Category Image Upload */}
          <div className="flex flex-col">
            <label className="font-semibold text-black">Category Image:</label>
            <div className="mt-2 flex items-center justify-center p-2 border-2 border-dashed border-black rounded-lg hover:border-blue transition">
              <label className="flex h-[25vh] w-full flex-col items-center justify-center cursor-pointer">
                {formData.category_img ? (
                  <img
                    src={URL.createObjectURL(formData.category_img)}
                    alt="category-img"
                    className="w-full h-full object-cover rounded-lg overflow-hidden"
                  />
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
                    <span className="text-sm text-black">Click here to select an image</span>
                  </>
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
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 flex items-center justify-center gap-2 ${loading ? "bg-[var(--color-secondary-light)] opacity-35" : "bg-[var(--color-secondary-light)]"
              } text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition`}
          >
            {loading && (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
              </div>
            )}
            <span>Add Category</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
