import express from "express";
import {
  findUser,
  updatePass,
  updateUser,
  userLogin,
  userRegister,
} from "../controllers/authCtrl.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const routes = express.Router();

routes.post("/user/register", userRegister);
routes.post("/user/login", userLogin);
routes.get("/user/:userId", findUser);
routes.patch("/user/:userId", verifyUser, updateUser);
routes.patch("/user/:userId/update-pass", verifyUser, updatePass);

export default routes;
