import express from "express";
import { checkAuth } from "../validations/checkAuth.js";
import {
    getAllFirms,
    getFirmById,
    addFirm,
    updateFirm,
    deleteFirm,
} from '../controllers/firmController.js';

const firmrouter = express.Router();

firmrouter.get('/', getAllFirms);
firmrouter.get('/:id', getFirmById);

firmrouter.post('/add', checkAuth, addFirm);
firmrouter.patch('/edit/:id', checkAuth, updateFirm);
firmrouter.delete('/delete/:id', checkAuth, deleteFirm);

export default firmrouter;