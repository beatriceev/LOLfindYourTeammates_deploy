import { Router } from "express";
import User from "../models/user.js";
import Player from "../models/player.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/newUser", async (req, res) => {
  try {
    if (!req.body.username) {
      return res.json({
        message: "Please enter your username.",
        status: "Error",
      });
    } else if (!req.body.password) {
      return res.json({
        message: "Please enter your password.",
        status: "Error",
      });
    } else if (!req.body.password2) {
      return res.json({
        message: "Please enter your confirmation password.",
        status: "Error",
      });
    } else if (req.body.password.length < 8) {
      return res.json({
        message: "Your password should be longer than 8 characters.",
        status: "Error",
      });
    } else if (req.body.password !== req.body.password2) {
      return res.json({
        message: "Your passwords don't match!",
        status: "Error",
      });
    } else {
      let userExist = await User.findOne({ username: req.body.username });
      if (userExist) {
        return res.json({
          message: "This username has already been used!",
          status: "Error",
        });
      } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          player: null,
        });
        newUser.save();
        return res.json({
          message: `User has been added to the database!`,
          status: "Success",
        });
      }
    }
  } catch (event) {
    res.json({ message: "Database insertion failed", status: "Error" });
    throw new Error("Database insertion failed");
  }
});

router.get("/userLogin", async (req, res) => {
  try {
    if (!req.query.username) {
      return res.json({
        message: "Please enter your username.",
        status: "Error",
      });
    } else if (!req.query.password) {
      return res.json({
        message: "Please enter your password.",
        status: "Error",
      });
    } else {
      let user = await User.findOne({ username: req.query.username });
      if (!user) {
        return res.json({
          message: "This username has not been registered yet!",
          status: "Error",
        });
      }
      if (await bcrypt.compare(req.query.password, user.password)) {
        return res.json({ message: "Password is correct", status: "Success" });
      } else {
        return res.json({ message: "Incorrect password!", status: "Error" });
      }
    }
  } catch (event) {
    res.json({ message: "userLogin failed", status: "Error" });
    throw new Error("userLogin failed");
  }
});

router.get("/getProfile", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.query.username });
    // console.log("user:", user);
    // console.log("req.query.username:", req.query.username);
    if (user === null) return;
    if (user.player !== null) {
      let player = await Player.findById(user.player.toString());
      return res.json({
        message: "The form has been filled.",
        status: "Filled",
        id: player.id,
        name: player.name,
        lanes: player.lanes,
        heros: player.heros,
        rank: player.rank,
        facebook: player.facebook,
      });
    } else {
      return res.json({
        message: "The form has never been filled.",
        status: "NotFilledYet",
      });
    }
  } catch (event) {
    res.json({ message: "getProfile failed", status: "Error" });
    throw new Error("getProfile failed");
  }
});

router.get("/getProfileById", async (req, res) => {
  try {
    let player = await Player.findOne({ id: req.query.id });
    if (player !== null) {
      return res.json({
        id: player.id,
        name: player.name,
        lanes: player.lanes,
        heros: player.heros,
        rank: player.rank,
        facebook: player.facebook,
      });
    }
  } catch (event) {
    res.json({ message: "getProfile failed", status: "Error" });
    throw new Error("getProfile failed");
  }
});

router.post("/updateProfile", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    let player = await Player.findOne({ id: req.body.playerId });
    if (!player) {
      return res.json({
        message: "The player doesn't exist.",
        status: "Error",
      });
    } else {
      user.player = player._id;
      user.save();
      return res.json({
        message: "The player exists.",
        status: "Success",
      });
    }
  } catch (event) {
    res.json({ message: "/updateProfile failed", status: "Error" });
    throw new Error("/updateProfil failed");
  }
});

export default router;
