import { Form, Modal, List, Typography } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INVITATIONS_QUERY } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { RedoOutlined } from "@ant-design/icons";
import { columns } from "../utils/columns";
import Filter from "./Filter";
import InviteModal from "./InviteModal";
import { UPDATE_INVITATION_MUTATION } from "../graphql/mutations";

function ReplyList({ myPlayerName }) {
  const {
    loading,
    error,
    data: invitationsData,
    subscribeToMore,
  } = useQuery(GET_INVITATIONS_QUERY);
  if (invitationsData !== undefined) {
    var invitations = invitationsData.invitations.map((invitation) => ({
      ...invitation,
      key: invitation._id,
    }));
  } else {
    var invitations = [];
  }
  const data = invitations.filter(
    (invitation) =>
      invitation.sender === myPlayerName && invitation.read == true
  );
  console.log(data);
  return (
    <List
      header={<div>Replies</div>}
      bordered
      dataSource={data}
      renderItem={(invitation) => (
        <List.Item>
          <Typography.Text mark>
            {invitation.ok ? "[Accept]" : "[Decline]"}
          </Typography.Text>
          {`${invitation.to} ${invitation.ok ? "accepted" : "declined"} your ${
            invitation.date
          } ${invitation.time} game request.`}
        </List.Item>
      )}
    />
  );
}

export default ReplyList;
