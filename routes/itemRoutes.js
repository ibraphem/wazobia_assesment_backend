import express from "express";
import expressAsyncHandler from "express-async-handler";
import { deleteItem, saveItem, updateItem, userItems } from "../controllers/itemController.js";
import { sendMail } from "../services/emailService.js";
import { isAuth } from "../utils.js";

const itemRoutes = express.Router();

itemRoutes.get(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
     const result = await userItems(req.user._id)
     res.send(result);

    })
  );

  itemRoutes.post(
    '/save',
    isAuth,
    expressAsyncHandler(async (req, res) => {
     const result = await saveItem(req.body, req.user._id)
     res.send(result);

    })
  );


  itemRoutes.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
     const result = await updateItem(req.body, req.params.id)
     res.send(result);

    })
  );

  itemRoutes.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
     const result = await deleteItem(req.params.id)
     res.send(result);

    })
  );

  itemRoutes.get(
    '/mail',
    isAuth,
    expressAsyncHandler(async (req, res) => {
     const result = await sendMail("Ibrahim", "ibraphem@gmail.com")
     res.send(result);

    })
  );

export default itemRoutes;