import playerModel from "./models/player.js";
import invitationModel from "./models/invitation.js";
import userModel from "./models/user.js";

const example = [
  {
    sender: "kevin",
    to: "alan",
    date: "2023/1/3",
    time: "12:00",
    message: "hi",
    read: false,
  },
];

const example2 = [
  {
    id: "1",
    name: "T1 Faker",
    lanes: ["Middle"],
    heros: ["雷茲"],
    rank: "菁英",
  },
  {
    id: "2",
    name: "T1 Oner",
    lanes: ["Jungle"],
    heros: ["維爾戈"],
    rank: "菁英",
  },
  {
    id: "3",
    name: "T1 Zeus",
    lanes: ["Top"],
    heros: ["厄薩斯"],
    rank: "菁英",
  },
  {
    id: "4",
    name: "T1 Gumayusi",
    lanes: ["Bottom"],
    heros: ["希維爾", "凱特琳", "法洛士"],
    rank: "菁英",
  },
  {
    id: "5",
    name: "T1 Keria",
    lanes: ["Support"],
    heros: ["拉克絲", "卡瑪"],
    rank: "菁英",
  },
];

const dataInit = async () => {
  await invitationModel.deleteMany({});
  // await invitationModel.insertMany(example);
  await playerModel.deleteMany({});
  await playerModel.insertMany(example2);
  await userModel.deleteMany({});
  console.log("Database initialized!");
};

export { dataInit };
