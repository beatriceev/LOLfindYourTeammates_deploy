import { useQuery, useMutation } from "@apollo/client";
import { GET_INVITATIONS_QUERY, GET_PLAYERS_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { UPDATE_INVITATION_MUTATION } from "../graphql/mutations";

function InvitationList({
  myPlayerName,
  setInvitationReadNum,
  playersData,
  invitationsData,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [updateInvitation] = useMutation(UPDATE_INVITATION_MUTATION);
  if (invitationsData !== undefined) {
    var invitations = invitationsData.invitations.map((invitation) => ({
      ...invitation,
      key: invitation._id,
    }));
  } else {
    var invitations = [];
  }
  const result = invitations.filter(
    (invitation) => invitation.to === myPlayerName
  );
  const checkedReadNum = (invitations) => {
    const read = invitations.filter((invitation) => !invitation.read);
    // console.log(read);
    // console.log(invitations);
    return read.length;
  };
  setInvitationReadNum(checkedReadNum(result));
  const acceptInvitation = (e) => {
    if (e.target.getAttribute("d") !== null) {
      var id = e.target.parentNode.parentNode.parentNode.className;
    } else {
      var id = e.target.parentNode.parentNode.className;
    }
    updateInvitation({
      variables: {
        input: {
          _id: id,
          ok: true,
        },
      },
    });
    const idx = data.findIndex((obj) => obj._id === id);
    var newData = data;
    newData[idx].read = true;
    newData[idx].ok = true;
    setData(newData);
  };
  const rejectInvitation = (e) => {
    if (e.target.getAttribute("d") !== null) {
      var id = e.target.parentNode.parentNode.parentNode.className;
    } else {
      var id = e.target.parentNode.parentNode.className;
    }
    updateInvitation({
      variables: {
        input: {
          _id: id,
          ok: false,
        },
      },
    });
    const idx = data.findIndex((obj) => obj._id === id);
    var newData = data;
    newData[idx].read = true;
    newData[idx].ok = false;
    setData(newData);
  };
  const fontColor = (invitation) => {
    if (invitation.read == false) return null;
    else {
      if (invitation.ok === true) return "green";
      else return "gray";
    }
  };
  const handleToPlayer = (record) => {
    var result = playersData.players.filter(
      (player) => player.name === record.sender
    );
    navigate(`/player/` + result[0].id);
  };
  const columns = [
    {
      title: "Sender",
      dataIndex: "sender",
      render: (text, record) => (
        <a
          style={{ color: fontColor(record) }}
          onClick={() => handleToPlayer(record)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <a style={{ color: fontColor(record) }}>{text}</a>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => (
        <a style={{ color: fontColor(record) }}>{text}</a>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (text, record) => (
        <a style={{ color: fontColor(record) }}>{text}</a>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (_id, record) =>
        record.read ? (
          record.ok ? (
            <CheckCircleTwoTone />
          ) : (
            <CloseCircleTwoTone />
          )
        ) : (
          <div className={_id}>
            <CheckOutlined onClick={acceptInvitation} />
            <CloseOutlined onClick={rejectInvitation} />
          </div>
        ),
    },
  ];
  // console.log(result, myPlayerName);
  useEffect(() => {
    const newData = result.map((invitation) => {
      return {
        sender: invitation.sender,
        date: invitation.date,
        time: invitation.time,
        message: invitation.message,
        _id: invitation._id,
        ok: invitation.ok,
        read: invitation.read,
      };
    });
    setData(newData);
  }, []);

  return (
    <Table columns={columns} dataSource={data} className="invitation_table" />
  );
}

export default InvitationList;
