import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Input, Form, Modal, DatePicker, TimePicker } from "antd";
import { CREATE_INVITATION_MUTATION } from "../graphql/mutations";

const { TextArea } = Input;

const InviteModal = ({ open, onCancel, player, setOpen, myPlayerName }) => {
  const [form] = Form.useForm();
  const [createInvitation] = useMutation(CREATE_INVITATION_MUTATION);
  const getItem = () => form.getFieldsValue(["date", "time", "message"]);
  const format = "HH:mm";
  const handleInvite = () => {
    form.submit();
    if (getItem().date !== undefined && getItem().time) {
      createInvitation({
        variables: {
          input: {
            sender: myPlayerName,
            to: player,
            date: `${getItem().date.$y}/${getItem().date.$M + 1}/${
              getItem().date.$D
            }`,
            time: `${("00" + getItem().time.$H).slice(-2)}:${(
              "00" + getItem().time.$m
            ).slice(-2)}`,
            message: getItem().message === undefined ? "" : getItem().message,
          },
        },
      });
      setOpen(false);
    }
  };
  return (
    <Modal
      open={open}
      title={`Invite ${player} for a game`}
      okText="Invite"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleInvite}
    >
      <div
        style={{
          margin: "24px 0",
        }}
      />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        form={form}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Time"
          name="time"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker format={format} />
        </Form.Item>
        <Form.Item label="Message" name="message">
          <TextArea
            placeholder="Leave a message here..."
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InviteModal;
