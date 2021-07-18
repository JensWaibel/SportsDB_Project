import React, { useEffect, useState } from "react";
import "./PlayerSearch.css";
import Player from "./Player.js";

function PlayerSearch() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [noplayer, setNoplayer] = useState(false);

  //useEffect for everytime form is submited i.e. search button is clicked
  useEffect(() => {
    if (query != "") {
      getPlayer();
    }
  }, [query]);

  //saves all found players in players state
  const getPlayer = async () => {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${query}`
    );
    const data = await response.json();
    setPlayers(data.player);
    if (players == null) {
      setNoplayer(true);
    }
    setNoplayer(false);
  };

  //updates the search state for every input
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //called onSubmit to trigger useEffect by passing on the input to the query state
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="PlayerSearch">
      <form onSubmit={getSearch} className="search-form">
        <input
          onChange={updateSearch}
          value={search}
          className="search-bar"
          type="text"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="player">
        {players != null
          ? players.map((player) =>
              player.strSport == "Soccer" ? (
                <Player
                  name={player.strPlayer}
                  number={player.strNumber}
                  image={player.strThumb}
                  nation={player.strNationality}
                  team={player.strTeam}
                  born={player.dateBorn}
                  facebook={player.strFacebook}
                  insta={player.strInstagram}
                  twitter={player.strTwitter}
                  render={player.strRender}
                />
              ) : null
            )
          : null}
      </div>
      <div>
        {players === null ? (
          <div
            style={{ color: "white", textAlign: "center", fontSize: "30px" }}
          >
            No Player found
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PlayerSearch;
