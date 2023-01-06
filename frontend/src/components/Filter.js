import React from "react";
import "../styles/Filter.css"
import { Layout, Tag, Form, Select, Typography } from "antd";
import { useEffect, useState } from "react";
const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;
const Filter = ({ laneFilter, setLaneFilter, rankFilter, setRankFilter }) => {
  const LaneTag = [
    { value: "Top" },
    { value: "Jungle" },
    { value: "Middle" },
    { value: "Bottom" },
    { value: "Support" },
  ];
  const RankTag = [
    { value: "鐵" },
    { value: "銅" },
    { value: "銀" },
    { value: "金" },
    { value: "白金" },
    { value: "鑽石" },
    { value: "大師" },
    { value: "宗師" },
    { value: "菁英" },
  ];
  const [form] = Form.useForm();
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="grey"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div>
      {/* <Header
        style={{
          background: "rgba(255, 255, 255, 0)",
        }}
      > */}
        <Title
          level={4}
          className="Filter-Title"
          style={{color:"white"}}
        >
          Custom conditions
        </Title>
      {/* </Header> */}
      {/* <Layout> */}
        {/* <Sider
          width={"10%"}
          style={{
            background: "rgba(255, 255, 255, 0)",
          }}
        ></Sider> */}
        {/* <Content> */}
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 24,
            }}
            layout="vertical"
            form={form}
            size="large"
          >
            <Form.Item
              label={<label className="Filter-Label">Lane:</label>}
              name="lane"
            >
              <Select
                // className="Filter-Select"
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={[]}
                options={LaneTag}
                onChange={(e) => {
                  setLaneFilter(e);
                }}
              />
            </Form.Item>
            <Form.Item
              label={<label className="Filter-Label">Rank:</label>}
              name="date"
            >
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={[]}
                style={{
                  width: "100%",
                }}
                options={RankTag}
                onChange={(e) => {
                  setRankFilter(e);
                }}
              />
            </Form.Item>
          </Form>
        {/* </Content> */}
      {/* </Layout> */}
    </div>
  );
};
export default Filter;
