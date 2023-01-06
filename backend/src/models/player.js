import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lanes: [{ type: String }],
  heros: [{ type: String }],
  rank: { type: String, required: true },
  facebook: { type: String, required: false },
});

const PlayerModel = mongoose.model("Player", PlayerSchema);

export default PlayerModel;
