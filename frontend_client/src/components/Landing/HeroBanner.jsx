import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

let count = 0;
function HomeBanner() {
  const showcase = [
    "/bg-hero1.webp",
    "/bg-hero2.webp",
    "/bg-hero3.webp",
    "/bg-hero4.webp",
    "/bg-hero5.webp",
    "/bg-hero6.webp",
  ];
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    count = (count + 1) % showcase.length;
    const interval = setInterval(() => setCurrentIndex(count), 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="h-[100vh] relative bg-cover bg-green-600">
      <div className="block lg:hidden absolute top-0 right-0 w-full h-full transition-opacity">
        <img
          alt="hero"
          src={showcase[currentIndex]}
          className="w-full h-full object-fill transition-all duration-1000"
        />
      </div>
      <div className="hidden lg:block absolute top-0 right-0 w-full h-full transition-opacity">
        <img
          alt="hero"
          src={showcase[currentIndex]}
          className="w-full h-full object-cover transition-all duration-1000"
        />
      </div>
      <div className="z-10 relative w-full max-w-xl flex flex-col justify-center h-full gap-5 px-4 lg:ml-20">
        <h1 className="text-white text-4xl lg:text-5xl leading-snug">
          Find the perfect&nbsp;
          <i>freelance</i>
          <br />
          services for your business
        </h1>
        <div className="flex align-middle">
          <div className="relative w-full">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              className="h-14 w-full pl-10 rounded-md rounded-r-none"
              placeholder="Search by passing Category title"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
          <button
            className="bg-[#1DBF73] text-white px-6 lg:px-12 text-lg font-semibold rounded-r-md"
            onClick={() => {
              setSearchData("");
              navigate(`/search?category=${searchData}`);
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
