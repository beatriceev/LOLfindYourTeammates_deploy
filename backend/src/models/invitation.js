import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, required: false },
    read: { type: Boolean, required: true },
    ok: { type: Boolean, required: false },
  },
  {
    collection: "invitation",
  }
);

const invitationModel = mongoose.model("invitation", invitationSchema);

export default invitationModel;
