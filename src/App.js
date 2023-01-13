import React, { useEffect, useState, useRef } from "react";

function App() {
  const [youView, setYouView] = useState([]);
  const [videoSearch, setVideoSearch] = useState("");
  const searchREF = useRef();

  const search = (e) => {
    e.preventDefault();
    setVideoSearch(searchREF.current.value);
  };

  const Getdata = () => {
    useEffect(() => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "086ea20959mshbd31c53d0b3ddf2p1a3c3fjsne2779a0d8bc6",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };

      fetch(
        `https://imdb8.p.rapidapi.com/auto-complete?q=+${videoSearch}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setYouView([data.d]);
        })
        .catch((err) => console.error(err));
    }, [videoSearch]);
  };
  Getdata();

  return (
    <div>
      <form onSubmit={search}>
        <input
          className="search-input"
          placeholder="search..."
          ref={searchREF}
        />
        <button className="searchBtn" type="submit">
          Search
        </button>
      </form>
      {youView.map((view) => {
        return (
          <div>
            <h4>{view[0].I}</h4>
            <h4>{view[0].l}</h4>
            <img height={650} width="450" src={[view[0].i.imageUrl]} />
            <p>
              <span>{view[0].q}</span>
              <span>{view[0].y}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
