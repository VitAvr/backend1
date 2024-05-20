import Feedback from "../models/feedback.js";

//получить список всех Feedback
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedback = await Feedback.findAll({
            include: ['user'],
            where: {},
            order: [['createdAt', 'DESC']],
        });
        res.json(feedback);
    } catch (error) {
        res.json({ message: error.message });
    }
};
//получить еще одну запись post по id + category.name
export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findAll({
            include: ['user'],
            where: { id: req.params.id },
        });
        res.json(feedback[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// create Feedback
export const createFeedback = async (req, res) => {
    try {
        await Feedback.create(req.body);
        res.json({
            message: 'Сообщение отправлено',
        });
    }   catch(error) {
        res.json({ message: error.message });
    }
};

//delete Feedback
export const deleteFeedback = async (req, res) => {
    try {
        await Feedback.destroy({
            where: { id: req.params.id },
        });
        res.json({ message: 'Сообщение удалено' });
    }   catch (error) {
        res.json({message: error.message});
    }
};
