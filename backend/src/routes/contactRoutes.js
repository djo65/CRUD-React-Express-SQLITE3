import express from "express";
import * as contactControllers from "../controllers/ContactControllers.js";

const router = express.Router();

router.post("/", contactControllers.createContact);

router.get("/", contactControllers.readAllContacts);

router.put("/:id", contactControllers.updateContact);

router.delete("/:id", contactControllers.deleteContact);

export default router;
