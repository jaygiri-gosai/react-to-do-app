import React, { useEffect, useState } from "react";

const Search = ({ data, loadData, setFilteredTask }) => {
  // State variable to manage search field value.
  const [searchText, setSearchText] = useState("");

  // To get call search function on search field change
  useEffect(() => {
    searchTask(data, searchText);
  }, [searchText]);

  // Function to search value from task list
  const searchTask = (taskList, searchText) => {
    const result = taskList.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredTask(result);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        name="searchText"
        id="searchText"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default Search;
