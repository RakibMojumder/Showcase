import express from "express";
import {
  userLogin,
  userRegister,
  vendorLogin,
  vendorRigister,
} from "../controllers/authCtrl.js";

const routes = express.Router();

routes.post("/user/register", userRegister);
routes.post("/user/login", userLogin);
routes.post("/venfor/register", vendorRigister);
routes.post("/venfor/login", vendorLogin);

export default routes;
