import React, { useState, useEffect } from "react";
import "../styles/Player.css";
import { useParams } from "react-router-dom";
import axios from "../api";
import hero_images from "../utils/hero_images";
import heros from "../utils/heros";

function Player() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [name, setName] = useState("");
  const [lanes, setLanes] = useState([]);
  const [rank, setRank] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [facebook, setFacebook] = useState("");

  const findPlayerInfo = async () => {
    const {
      data: { name, lanes, heros, rank, facebook },
    } = await axios.get("/getProfileById", {
      params: {
        id: id,
      },
    });
    console.log(name, lanes, heros, rank);
    setPlayer(id);
    setName(name);
    setLanes(lanes);
    lanes.map((item) => {
      console.log(item);
    });
    setRank(rank);
    setHeroes(heros);
    setFacebook(facebook);
  };

  const findHero = (name) => {
    let index = heros.indexOf(name);
    console.log(hero_images[index]);
    return hero_images[index];
  };

  heroes.map((item) => {
    findHero(item);
  });

  useEffect(() => {
    if (Object.keys(player).length === 0) {
      console.log(id);
      findPlayerInfo();
    }
  }, []);

  if (Object.keys(player).length === 0) {
    return <></>;
  }

  return (
    <div className="Player-Background">
      <div className="Player-Profile-Frame">
        <div className="Player-Profile-Picture-Frame">
          {/*TODO: change to user's profile image*/}
          <img
            className="Player-Profile-Picture"
            src={require("../images/face.png")}
          />
        </div>
        <div className="Player-Profile-Bio-Frame">
          <div className="Player-Profile-Name-Frame">
            <h1 className="Player-Profile-Name">{name}</h1>
            <div className="Player-Profile-Lanes">
              {lanes.map((item) => (
                <img
                  className="Player-Profile-Type"
                  src={require("../images/lane/" + item + ".png")}
                ></img>
              ))}
            </div>
            {/*TODO: change to user's profile hero type*/}
          </div>
          {/* <img
              className="Player-Profile-Type"
              src={require("../images/mid.png")}
            ></img> */}
          {/*TODO: change to user's bio*/}
          <p className="Player-Profile-Bio">
            Hello there! I am a new master, never lose!
          </p>
          {/*TODO: change to user's facebook page*/}
          <a className="Player-Facebook-Frame" href={facebook}>
            <img
              className="Player-Facebook"
              src={require("../images/facebook.png")}
            />
          </a>
        </div>
        <div className="Player-Profile-Rank">
          <img
            className="Player-Profile-Rank-Image"
            src={require("../images/rank-emblem/" + rank + ".png")}
          ></img>
        </div>
      </div>
      <div className="Player-Heroes-Frame-Gradient1"> </div>
      <div className="Player-Heroes-Frame">
        {heroes.map((hero_name) => (
          <div className="Player-Heroes-Profile">
            <img className="Player-Hero-Image" src={findHero(hero_name)} />
            <h1 className="Player-Hero-Name">{hero_name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Player;
