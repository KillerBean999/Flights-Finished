import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import SearchCard from "./Search/SearchCard";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const nav = useNavigate();
  const searchResultsRef = useRef(null);

  const handleSearch = (results) => {
    setIsSearch(true);
    setSearchResults(results);
  };

  useEffect(() => {
    if (isSearch) {
      searchResultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isSearch]);

  return (
    <>
      <div className="background-image"></div>
      <div className="home">
        <h1 className="flights-heading">
          Welcome to our Flight Booking Service
        </h1>
        <button className="all-flights" onClick={() => nav("/flights")}>
          All Available Flights
        </button>
        <Search
          isSearch={isSearch}
          searchResults={searchResults}
          onSearch={handleSearch}
        />
      </div>
      <div ref={searchResultsRef}>
        <SearchCard
          isSearch={isSearch}
          searchResults={searchResults}
          onSearch={handleSearch}
        />
      </div>
    </>
  );
}
