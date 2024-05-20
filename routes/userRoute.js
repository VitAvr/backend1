import express from "express";
import { Register, Login, getMe, getUsers, updateUser, getUserById, deleteUser, updateUserById } from "../controllers/userController.js";
import { registerValidation, loginValidation } from "../validations/validation.js";
import { handleValidationErrors } from "../validations/handleValidationErrors.js";
import { checkAuth } from "../validations/checkAuth.js";

const userrouter = express.Router();

userrouter.post('/auth/register', registerValidation, handleValidationErrors, Register);
userrouter.post('/auth/login', loginValidation, handleValidationErrors, Login);
userrouter.get('/auth/me', checkAuth, getMe);
userrouter.get('/auth/allusers', checkAuth, getUsers);//allusers
userrouter.patch('/update/:id', checkAuth, updateUser);
userrouter.get('/auth/:id', checkAuth, getUserById);
userrouter.delete('/delete/:id', checkAuth, deleteUser);
userrouter.patch('/auth/update/:id', checkAuth, updateUserById);

export default userrouter;
