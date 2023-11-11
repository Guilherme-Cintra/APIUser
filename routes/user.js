import express from "express"
import * as userController from "../controller/userController.js"

const router = express.Router()

router.get("/", userController.getUsers)
router.post("/", userController.createUser)
router.put("/:id", userController.updateUser)
router.get("/:id", userController.getUser)
router.delete("/:id", userController.deleteUser)

export default router