import express from "express";
import { checkAuth } from "../validations/checkAuth.js";
import {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,

    deleteFeedback,
} from '../controllers/feedbackController.js';

const feedbackrouter = express.Router();

feedbackrouter.get('/auth/allfeedback', checkAuth, getAllFeedbacks);
feedbackrouter.get('/auth/:id', checkAuth, getFeedbackById);

feedbackrouter.post('/create', checkAuth, createFeedback);

feedbackrouter.delete('/delete/:id', checkAuth, deleteFeedback);

export default feedbackrouter;