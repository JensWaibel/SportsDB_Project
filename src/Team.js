import React, { useEffect, useState } from "react";
import Select from "react-select";
import LeagueQuiz from "./LeagueQuiz";
import style from "./team.module.css";

const Team = ({ name, logo, teamId }) => {
  return (
    <div id={name} key={teamId}>
      <img className={style.badge} src={logo} />
      <h3>{name}</h3>
    </div>
  );
};

export default Team;
