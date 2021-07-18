import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import Team from "./Team";
import "./App.css";
import style from "./leagueQuiz.module.css";

const optionsLeagues = [
  { value: "bundesliga", label: "Bundesliga" },
  { value: "premierleague", label: "Premier League" },
  { value: "laliga", label: "La Liga" },
  { value: "ligue1", label: "Ligue 1" },
  { value: "seriea", label: "Serie A" },
]; // options for the select

function LeagueQuiz() {
  const [teams, setTeams] = useState([]);
  const [league, setLeague] = useState("");
  const [query, setQuery] = useState("none");
  const teamsRef = useRef();
  const searchRef = useRef();
  const buttonRef = useRef();
  const countdownRef = useRef();
  const bottomRef = useRef();
  const [search, setSearch] = useState("");
  const [minute, setMinute] = useState(2);
  const [second, setSecond] = useState("00");
  const [count, setCount] = useState(5);
  const [countdownInt, setCountdownInt] = useState();
  const waitRef = useRef();
  const [waitInt, setWaitInt] = useState();
  const [score, setScore] = useState(0);

  //useEffect for everytime the 'Los' button is clicked
  useEffect(() => {
    if (query != "none") {
      getTeams();
      makeTable();
      countdown();
      clearInterval(countdownInt);
      clearInterval(waitInt);
      setScore(0);
      setMinute(2);
      setSecond("00");
      countdownRef.current.style.color = "black";
    }
  }, [query]);

  //useEffect for everytime input is changed
  useEffect(() => {
    checkTeams();
  }, [search]);

  //translate the selected league into a query that is compatible with the api
  const getLeague = (e) => {
    e.preventDefault();
    if (league.value === "bundesliga") {
      setQuery("German%20Bundesliga");
    } else if (league.value === "premierleague") {
      setQuery("English%20Premier%20League");
    } else if (league.value === "laliga") {
      setQuery("Spanish%20La%20Liga");
    } else if (league.value === "ligue1") {
      setQuery("French%20Ligue%201");
    } else if (league.value === "seriea") {
      setQuery("Italian%20Serie%20A");
    }
    setLeague("");
  };

  //get all the teams of selected league
  const getTeams = () => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${query}`
    )
      .then((response) => response.json())
      .then((json) => setTeams(json.teams));
  };

  //update the search const
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //check if the input (= search) is one of the teams and if so make the team visible and add up score
  const checkTeams = () => {
    for (var i = 0; i < teams.length; i++) {
      if (
        teamsRef.current.children[i].id.toLowerCase() === search.toLowerCase()
      ) {
        teamsRef.current.children[i].className = style.slot;
        setSearch("");
        searchRef.current.value = "";
        setScore(score + 1);
      }
    }
  };

  //hide the teams so the later can be made visible if guessed
  function makeTable() {
    var table = teamsRef.current;
    table.classList.toggle(style.is_hidden);
    setTimeout(() => {
      bottomRef.current.style.height = "0";
      var teamslot = teamsRef.current.childNodes;
      for (let i = 0; i < teamslot.length; i++) {
        teamslot[i].classList.toggle(style.slot);
        teamslot[i].classList.toggle(style.is_hidden);
        table.className = style.team_table;
      }
    }, 3000);
  }

  //first a 5sec wait to assure the teams are loaded and normal countdown after
  function countdown() {
    var wait = 5;
    waitRef.current.className = style.wait;
    setWaitInt(
      setInterval(function () {
        if (wait > 0) {
          wait--;
          setCount(wait);
        } else if (wait == 0) {
          waitRef.current.className = style.wait_hidden;
          searchRef.current.className = style.input;
          searchRef.current.focus();
          wait--;
        }
      }, 1000)
    );

    setTimeout(() => {
      var date2 = new Date();
      date2.setMinutes(date2.getMinutes() + 1);
      date2.setSeconds(date2.getSeconds() + 61);

      setCountdownInt(
        setInterval(function () {
          var date1 = new Date();
          var distance = date2 - date1;

          setMinute(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
          setSecond(Math.floor((distance % (1000 * 60)) / 1000));
          if (Math.floor((distance % (1000 * 60)) / 1000) < 10) {
            setSecond("0" + Math.floor((distance % (1000 * 60)) / 1000));
          }
          if (
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) == 0 &&
            Math.floor((distance % (1000 * 60)) / 1000) == 0
          ) {
            searchRef.current.className = style.input_no;
            var teams = teamsRef.current.childNodes;
            countdownRef.current.style.color = "red";
            teams.forEach((element) => {
              if (element.className.includes("hidden") == true) {
                element.className = style.slot;
                element.style.color = "red";
              }
            });
          }
          if (distance < 0) {
            clearInterval(countdownInt);
            setMinute(0);
            setSecond("00");
          }
        }, 1000)
      );
    }, 5000);
  }

  return (
    <div className={style.container}>
      <h1>LeagueQuiz</h1>
      <p style={{ margin: "50px" }}>
        Select a League. <br /> After your selection you have 120 seconds to
        name all teams currently playing in that league.
      </p>
      <form onSubmit={getLeague} className={style.form}>
        <Select
          options={optionsLeagues}
          placeholder="Select League"
          onChange={setLeague}
          className={style.select}
        />
        <button type="submit" className={style.formbtn} ref={buttonRef}>
          Los
        </button>
      </form>
      <div className={style.scorebox}>
        <p>
          <b>Your Score</b>
        </p>
        <p>
          <b>
            {" "}
            {score} / {teams.length != 0 ? teams.length : "-"}{" "}
          </b>
        </p>
      </div>
      <div className={style.input_container}>
        <input
          onChange={updateSearch}
          ref={searchRef}
          type="text"
          className={style.input_no}
        />
        <div className={style.time}>
          <div className={style.countdown} ref={countdownRef}>
            {minute}:{second}
          </div>
          <div className={style.wait_hidden} ref={waitRef}>
            Starts in {count}
          </div>
        </div>
      </div>
      <div className={style.team_table} ref={teamsRef}>
        {teams.map((team) => (
          <Team
            name={team.strTeam}
            logo={team.strTeamBadge}
            teamId={team.idTeam}
          />
        ))}
      </div>
      <div className={style.placeholder} ref={bottomRef}></div>
    </div>
  );
}

export default LeagueQuiz;
