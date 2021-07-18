import React, { useEffect, useState, useRef } from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import style from "./player.module.css";

const Player = ({
  name,
  number,
  image,
  nation,
  team,
  born,
  facebook,
  insta,
  twitter,
  render,
}) => {
  const [trigger, setTrigger] = useState(false);
  const cardContainerRef = useRef();
  var year, month, day;

  //function for flipping card on click
  function flip() {
    cardContainerRef.current.classList.toggle(style.is_flipped);
  }

  //translate the received birthday to age
  function getAge() {
    year = born.slice(0, born.indexOf("-"));
    month = born.slice(5, 7);
    day = born.slice(8);
    var today = new Date();
    var age = today.getFullYear() - year;
    var m = today.getMonth() - month;
    if (m < 0 || (m === 0 && today.getDate() < day)) {
      age--;
    }
    return age;
  }

  //transform the birthday
  function getDate() {
    year = born.slice(0, born.indexOf("-"));
    month = born.slice(5, 7);
    day = born.slice(8);

    return day + "." + month + "." + year;
  }

  //check if player is retired or free agent
  function getTeam() {
    if (team.includes("Retired") === true) {
      return "Retired";
    }
    if (team.includes("Free Agent") === true) {
      return "Free Agent";
    } else {
      return team;
    }
  }

  return (
    <div>
      <div ref={cardContainerRef} className={style.card_container}>
        <div className={style.card}>
          <div
            className={style.card_front}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className={style.front_container}>
              <h1 id="name" onClick={() => flip()}>
                {name}
              </h1>
            </div>
          </div>
          <div
            className={style.card_back}
            style={{ backgroundImage: `url(${render})` }}
            onClick={() => flip()}
          >
            <div className={style.back_bg}>
              <div className={style.back_container}>
                <div className={style.back_details}>
                  <h2>{name}</h2>
                  <p className={style.numb}>{number}</p>
                  <p>{getTeam()}</p>
                  <p>{nation}</p>
                  <p>
                    {getDate()} ({getAge()})
                  </p>
                </div>
              </div>
              {insta != "" || facebook != "" || twitter != "" ? (
                <div className={style.social}>
                  {insta != "" ? (
                    <a
                      href={`http://${insta}`}
                      className="fa fa-instagram"
                      target="_blank"
                    ></a>
                  ) : null}
                  {facebook != "" ? (
                    <a
                      href={`http://${facebook}`}
                      className="fa fa-facebook"
                      target="_blank"
                    ></a>
                  ) : null}
                  {twitter != "" ? (
                    <a
                      href={`http://${twitter}`}
                      className="fa fa-twitter"
                      target="_blank"
                    ></a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
