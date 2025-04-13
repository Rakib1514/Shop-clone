import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder="Enter your keyword..."
        className="w-full bg-base-100 py-1 focus:outline-none px-4 rounded-md rounded-r-none"
      />
      <button className="bg-primary px-4 py-1 text-xl text-white rounded-md rounded-l-none">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
