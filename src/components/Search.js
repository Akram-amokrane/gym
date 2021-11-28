import React from "react";
import "./Search.css";
import { IoIosSearch } from "react-icons/io";

function Search({ searchVal }) {
  const searchHandle = () => {
    let search = document.querySelector("#search-input").value;
    searchVal(search);
  };

  return (
    <div id='search'>
      <input
        type='text'
        id='search-input'
        placeholder='Recherche'
        maxLength='100'
      />
      <IoIosSearch className='search-icon' onClick={searchHandle} />
    </div>
  );
}

export default Search;
