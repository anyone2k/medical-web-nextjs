"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing a search icon from react-icons

const SearchBar = ({
  setQuery,
  query,
  placeholder = "Search...",
}: {
  setQuery: any;
  query: any;
  placeholder: string;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setQuery(event.target.value);
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="relative w-full m-1 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <FaSearch className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
