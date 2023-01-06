import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_PLAYER_MUTATION,
  UPDATE_PLAYER_MUTATION,
} from "../graphql/mutations";
import { GET_PLAYERS_QUERY } from "../graphql/queries";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Form, Input, Select, Button, Layout, Space, Tag, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import heroes_eng from "../utils/heros_eng";
import heroes from "../utils/heros";
import "../styles/Profile.css";
import axios from "../api";
import { useHook } from "../hooks/useHook";

function Profile() {
  const username = localStorage.getItem("username");
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [lanes, setLanes] = useState([]);
  const [heros, setHeros] = useState([]);
  const [rank, setRank] = useState("");
  const [fb, setFb] = useState("");
  const [formExist, setFormExist] = useState(false);
  const [submit, setSubmit] = useState(true);
  const { displayStatus } = useHook();
  const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION);
  const [updatePlayer] = useMutation(UPDATE_PLAYER_MUTATION);

  const { Header, Content, Sider, Footer } = Layout;
  const navigate = useNavigate();

  const {
    loading,
    error,
    data: playersData,
    subscribeToMore,
  } = useQuery(GET_PLAYERS_QUERY, {
    variables: { filter: { name: "", lanes: [], rank: [] } },
  });

  // useEffect(() => {
  //   subscribeToMore({
  //     document: ITEM_CREATED_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const item = subscriptionData.data.itemCreated;
  //       return {
  //         items: [item, ...prev.items],
  //       };
  //     },
  //   });
  // }, [subscribeToMore]);

  const [form] = Form.useForm();

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const onLaneChange = (value) => {
    setLanes(value);
  };

  const onHerosChange = (value) => {
    setHeros(value);
  };

  const onRankChange = (value) => {
    setRank(value);
  };

  const handleQuery = async () => {
    console.log("handleQuery");
    const {
      data: { message, status, id, name, lanes, heros, rank, facebook },
    } = await axios.get("/getProfile", {
      params: {
        username,
      },
    });
    console.log(message, status);
    if (status === "Filled") {
      setFormExist(true);
      setID(id);
      setName(name);
      setLanes(lanes);
      setHeros(heros);
      setRank(rank);
      setFb(facebook);
    }
  };

  const handleProfile = async (playerId) => {
    const {
      data: { message, status },
    } = await axios.post("/updateProfile", {
      username,
      playerId,
    });
    console.log(message, status);
  };

  useEffect(() => {
    console.log("use effect........");
    handleQuery();
  }, []);
  useEffect(() => {
    console.log("submit");
  }, [submit]);

  useEffect(() => {
    console.log(id, name, lanes, heros, rank, username, fb);
    form.setFieldsValue({
      PlayerID: name,
      SelectLanes: lanes,
      SelectChamps: heros,
      SelectRank: rank,
      PlayerFB: fb,
    });
  }, [id, name, lanes, heros, rank, fb]);

  const { Option } = Select;
  const onFinish = async (values) => {
    const {
      data: { name },
    } = await axios.get("/getProfile", {
      params: {
        username,
      },
    });
    console.log(
      "Success:",
      values.PlayerID,
      values.SelectLanes,
      values.SelectChamps,
      values.SelectRank,
      values.PlayerFB
    );

    console.log(playersData);
    var nameRepeated = playersData.players.filter(
      (player) => player.name === values.PlayerID && player.name !== name
    );
    console.log("nameRepeated:", nameRepeated);
    if (nameRepeated.length === 0) {
      console.log("formExist:", formExist);
      if (!formExist) {
        var playerId = uuidv4();
        createPlayer({
          variables: {
            input: {
              id: playerId,
              name: values.PlayerID,
              lanes: values.SelectLanes,
              heros: values.SelectChamps,
              rank: values.SelectRank,
              facebook: values.PlayerFB,
            },
          },
        });
        console.log("playerId:", playerId);
        setID(playerId);
        handleProfile(playerId);
        displayStatus({
          type: "success",
          msg: "Created successfully.",
        });
      } else {
        updatePlayer({
          variables: {
            input: {
              id: id,
              name: values.PlayerID,
              lanes: values.SelectLanes,
              heros: values.SelectChamps,
              rank: values.SelectRank,
              facebook: values.PlayerFB,
            },
          },
        });
        console.log("id:", id);
        handleProfile(id);
        displayStatus({
          type: "success",
          msg: "Updated successfully.",
        });
      }
    } else {
      displayStatus({
        type: "error",
        msg: "The name has already been used.",
      });
    }
    setFormExist(true);
    // navigate(`/search`);
    // window.location.reload();
  };
  const onReset = () => {
    form.resetFields();
    setName("");
    setLanes([]);
    setHeros([]);
    setRank("");
    setFb("");
  };

  const handleToSearch = () => {
    navigate(`/search`);
    window.location.reload();
  };
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="purple"
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
    <div className="Profile-Image-Background">
      <div className="Profile-Form-Container">
        <div className="Profile-Form-Background">
          {/* <Space
            direction="horizontal"
            size={230}
            style={{ paddingBottom: "5%" }}
          > */}
          <div className="Profile-Form-Header">
            <Header className="Profile-Form-Header-Text">
              {" "}
              {username}'s Profile{" "}
            </Header>
            <div className="Profile-Form-Header-Button-Frame">
              <Tooltip title="Search">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={handleToSearch}
                  className="Profile-Form-Header-Button"
                >
                  {/* Search */}
                </Button>
              </Tooltip>
            </div>
          </div>
          <Form
            className={"Profile-Forms-Frame"}
            {...formItemLayout}
            form={form}
            name="myProfile"
            onFinish={onFinish}
            initialValues={{
              PlayerID: name,
            }}
            scrollToFirstError
          >
            <Form.Item
              className="Profile-Form-Frame"
              name="PlayerID"
              label={<h2 className="Form-Name">Player ID 名字</h2>}
              // label="Player ID 名字"
              rules={[
                {
                  required: true,
                  message: "Please input your Player ID",
                },
              ]}
              tooltip="Your in-game name."
            >
              <Input
                // className= "Profile-Form-Box"
                onChange={handleChange(setName)}
                defaultValue={name}
              />
            </Form.Item>
            <Form.Item
              name="SelectLanes"
              label={<h2 className="Form-Name">Main Roles 擅長路線</h2>}
              // label="Main Roles 擅長路線"
              rules={[
                {
                  required: true,
                  message: "Please select your main roles!",
                  type: "array",
                },
              ]}
              tooltip="You can choose more than 1."
            >
              <Select
                // className= "Profile-Form-Box"
                tagRender={tagRender}
                mode="multiple"
                onChange={onLaneChange}
                defaultValue={lanes}
              >
                <Option value="Top">Top</Option>
                <Option value="Jungle">Jungle</Option>
                <Option value="Middle">Middle</Option>
                <Option value="Bottom">Bottom</Option>
                <Option value="Support">Support</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="SelectChamps"
              label={<h2 className="Form-Name">Main Champions 擅長英雄</h2>}
              // label="Main Champions 擅長英雄"
              rules={[
                {
                  required: true,
                  message: "Please select your main champions!",
                  type: "array",
                },
              ]}
              tooltip="You can choose more than 1."
            >
              <Select
                // className= "Profile-Form-Box"
                tagRender={tagRender}
                mode="multiple"
                onChange={onHerosChange}
                defaultValue={heros}
              >
                {heroes.map((hero, index) => (
                  <Option value={hero}>{heroes_eng[index]}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="SelectRank"
              label={<h2 className="Form-Name">Rank 排位</h2>}
              // label="Rank"
              rules={[{ required: true, message: "Please select your rank!" }]}
              tooltip="Your rank."
            >
              <Select
                // className= "Profile-Form-Box"
                placeholder="Please select your rank"
                onChange={onRankChange}
                defaultValue={rank}
              >
                <Option value="鐵">Iron 鐵</Option>
                <Option value="銅">Bronze 銅</Option>
                <Option value="銀">Silver 銀</Option>
                <Option value="金">Gold 金</Option>
                <Option value="白金">Platinum 白金</Option>
                <Option value="鑽石">Diamond 鑽石</Option>
                <Option value="大師">Master 大師</Option>
                <Option value="宗師">Grandmaster 宗師</Option>
                <Option value="菁英">Challenger 菁英</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="Profile-Form-Frame"
              name="PlayerFB"
              label={<h2 className="Form-Name">FB網址</h2>}
              tooltip="Your Facebook URL."
            >
              <Input
                // className= "Profile-Form-Box"
                onChange={handleChange(setFb)}
                defaultValue={fb}
              />
            </Form.Item>
            <Form.Item
              className="Profile-Footer-Frame"
              // wrapperCol={{
              //   offset: 3,
              //   span: ,
              // }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="Profile-Button-Color-1"
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                size="large"
                onClick={onReset}
                className="Profile-Button-Color-2"
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default Profile;
