import { useState } from "react";

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    props.searchPlaceOrCity(searchTerm);
  }

  function handleChange(e) {
    e.preventDefault();
    // reset to all places
    if (e.target.value == "") {
      props.getAllPlaces();
    }
    setSearchTerm(e.target.value);
  }

  function resetSearch() {
    setSearchTerm("");
    props.getAllPlaces();
  }

  return (
    <div className="flex items-center px-4 py-3 rounded-md border-2 border-gray-700 overflow-hidden max-w-md mx-auto font-[sans-serif] mb-3">
      <form onSubmit={onSubmit} className="flex w-full">
        <input
          name="searchAlbumOrArtist"
          type="text"
          placeholder="Search for name or city"
          className="flex-grow outline-none bg-transparent text-gray-600 text-sm"
          onChange={handleChange}
          value={searchTerm}
        />
        {!props.hasSearchResult ? (
          <button className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        ) : (
          <button className="ml-2" onClick={resetSearch}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1"
                d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
}

export default Search;
