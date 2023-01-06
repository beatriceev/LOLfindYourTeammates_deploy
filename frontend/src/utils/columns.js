import { Space, Table, Tag } from "antd";
import viewPlayer from "../components/Search";
import "../styles/column.css"

const columns = (handleToPlayer, handelInvite, myPlayerName) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, { id, name }) => (
      <a onClick={() => handleToPlayer(id)} className="Column-Name">{name}</a>
    ),
  },
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Lane",
    key: "lane",
    dataIndex: "lane",
    render: (_, { lanes }) => (
      <>
        {lanes.map((tag) => (
          <Tag color="purple" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Hero",
    key: "heros",
    dataIndex: "heros",
    render: (_, { heros }) => (
      <>
        {heros.map((tag) => (
          <Tag color="purple" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle" onClick={handelInvite}>
        {myPlayerName === record.name ? <></> : <a className="Column-Invite">Invite {record.name}</a>}
      </Space>
    ),
  },
];

export { columns };
