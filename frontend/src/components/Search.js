import { useQuery } from "@apollo/client";
import { GET_PLAYERS_QUERY, GET_INVITATIONS_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Table, Button, Input, Avatar, Badge, Tooltip } from "antd";
import {
  RedoOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { columns } from "../utils/columns";
import Filter from "./Filter";
import InviteModal from "./InviteModal";
import InvitationModal from "./InvitationModal";
import axios from "../api";

import "../styles/Search.css";

function Search() {
  const username = localStorage.getItem("username");
  const [laneFilter, setLaneFilter] = useState([]);
  const [rankFilter, setRankFilter] = useState([]);
  const [filter, setFilter] = useState({ name: "", lanes: [], rank: [] });
  const [nameFilter, setNameFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);
  const [playerInvited, setPlayerInvited] = useState("");
  const [invitationReadNum, setInvitationReadNum] = useState(0);
  const [myPlayerName, setMyPlayerName] = useState("");
  const { Search } = Input;
  const {
    loading,
    error,
    data: playersData,
    subscribeToMore,
  } = useQuery(GET_PLAYERS_QUERY, {
    variables: { filter: filter },
  });
  const { data: invitationsData } = useQuery(GET_INVITATIONS_QUERY);
  const findPlayerName = async () => {
    const {
      data: { message, status, id, name, lanes, heros, rank },
    } = await axios.get("/getProfile", {
      params: {
        username,
      },
    });
    if (name !== undefined) setMyPlayerName(name);
  };
  useEffect(() => {
    // console.log("username:", username);
    findPlayerName();
  }, []);
  useEffect(() => {
    // console.log("invitationsData:", invitationsData);
    if (invitationsData !== undefined) {
      // console.log("invitationsData:", invitationsData);
      var invitations = invitationsData.invitations.map((invitation) => ({
        ...invitation,
        key: invitation._id,
      }));
    } else {
      var invitations = [];
    }
    // console.log("myPlayerName:", myPlayerName);
    if (myPlayerName !== undefined) {
      const result = invitations.filter(
        (invitation) => invitation.to === myPlayerName
      );
      const checkedReadNum = (invitations) => {
        const read = invitations.filter((invitation) => !invitation.read);
        return read.length;
      };
      setInvitationReadNum(checkedReadNum(result));
    }
  }, [myPlayerName]);
  useEffect(() => {
    // console.log("invitationReadNum:", invitationReadNum);
  }, [invitationReadNum]);
  useEffect(() => {
    var newFilter = { ...filter, lanes: laneFilter };
    setFilter(newFilter);
  }, [laneFilter]);
  useEffect(() => {
    var newFilter = { ...filter, rank: rankFilter };
    setFilter(newFilter);
  }, [rankFilter]);
  useEffect(() => {
    var newFilter = { ...filter, name: nameFilter };
    setFilter(newFilter);
  }, [nameFilter]);
  const navigate = useNavigate();
  if (playersData !== undefined) {
    var players = playersData.players.map((player) => ({
      ...player,
      key: player.id,
    }));
  } else {
    players = [];
  }

  const handleToProfile = () => {
    navigate(`/profile`);
  };
  const handleToLogOut = () => {
    localStorage.setItem("authentication", "");
    navigate(`/`);
  };
  const handleToPlayer = (id) => {
    navigate(`/player/` + id);
  };
  const handleInvite = (e) => {
    setModalOpen(true);
    setPlayerInvited(e.target.innerText.slice(7));
  };
  const handleInvitationModalOpen = () => {
    setInvitationModalOpen(true);
  };
  const ShowTime = () => {
    var NowDate = new Date();
    var h = ("00" + NowDate.getHours()).slice(-2);
    var m = ("00" + NowDate.getMinutes()).slice(-2);
    var s = ("00" + NowDate.getSeconds()).slice(-2);
    return `${h}:${m}:${s}`;
  };
  const onSearch = (value) => setNameFilter(value);

  return (
    <div className="Search-Layout">
      <div className="Search-Gradient"></div>
      <div className="Search-Header">
        {/* <div className="Search-Header-Left"></div> */}
        <div className="Search-Header-Center">
          <div className="Search-Header-Center-Sider"></div>
          <div className="Search-Header-Center-Content">
            <Search
              className="Search-Bar"
              size="large"
              // placeholder="find player..."
              style={{ background: "transparent" }}
              onSearch={onSearch}
            />
            <Badge count={invitationReadNum}>
              <Tooltip title="Notifications">
                <Avatar
                  shape="circle"
                  icon={
                    <NotificationOutlined onClick={handleInvitationModalOpen} />
                  }
                  className="Search-Bar-Avatar"
                />
              </Tooltip>
            </Badge>
          </div>
        </div>
        <div className="Search-Header-Right">
          <Tooltip title="Log out">
            <Button
              type="primary"
              block
              htmlType="submit"
              shape="circle"
              size="large"
              icon={<LogoutOutlined />}
              className="Search-Header-Button1"
              onClick={handleToLogOut}
            ></Button>
          </Tooltip>
          <Tooltip title="My Profile">
            <Button
              type="primary"
              block
              htmlType="submit"
              shape="circle"
              size="large"
              icon={<UserOutlined />}
              className="Search-Header-Button2"
              onClick={handleToProfile}
            ></Button>
          </Tooltip>
        </div>
      </div>
      <InviteModal
        open={modalOpen}
        player={playerInvited}
        onCancel={() => {
          setModalOpen(false);
        }}
        setOpen={setModalOpen}
        myPlayerName={myPlayerName}
      />
      <InvitationModal
        open={invitationModalOpen}
        setOpen={setInvitationModalOpen}
        myPlayerName={myPlayerName}
        setInvitationReadNum={setInvitationReadNum}
        playersData={playersData}
        invitationsData={invitationsData}
      />
      <div className="Search-Content">
        <div className="Search-Content-Left">
          <Filter
            laneFilter={laneFilter}
            setLaneFilter={setLaneFilter}
            rankFilter={rankFilter}
            setRankFilter={setRankFilter}
          />
        </div>
        <div className="Search-Content-Right">
          <div className="Search-Content-Right-Header">
            <Tooltip title="Refresh">
              <Button
                shape="circle"
                className="Search-Content-Button"
                icon={<RedoOutlined style={{ color: "white" }} />}
                onClick={() => window.location.reload()}
              />
            </Tooltip>
            <div className="Search-Content-Right-Header-Text">
              Last updated: {ShowTime()}
            </div>
          </div>
          <div className="Search-Content-Right-Table">
            <Table
              columns={columns(handleToPlayer, handleInvite, myPlayerName)}
              dataSource={players}
              className="table"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
