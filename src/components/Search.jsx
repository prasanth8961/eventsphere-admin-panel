import React from "react";

const Search = ({ placeholder, type, setSearch, search }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="">
      <input
        className="h-10 w-[30vw] border-[1px] border-[var(--color-secondary)] text-txt-color rounded-md bg-white py-2 px-4"
        placeholder={placeholder}
        type={type}
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
