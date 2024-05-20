import Firm from "../models/firm.js";

//получить список всех фирм
export const getAllFirms = async (req, res) => {
    try {
        const firms = await Firm.findAll();
        res.json(firms);
    } catch (error) {
        res.json({ message: error.message });
    }
};
//получить одну фирму по id
export const getFirmById = async (req, res) => {
    try {
        const firms = await Firm.findAll({
            where: { id: req.params.id },
        });
        res.json(firms[0])
    } catch (error) {
        res.json({ message: error.message });
    }
};

// add firm
export const addFirm = async (req, res) => {
    try {
        await Firm.create(req.body);
        res.json({
            message: 'Фирма добавлена',
        });
    } catch(error) {
        res.json({ message: error.message });
    }
};
// update firm
export const updateFirm = async (req, res) => {
    try {
        await Firm.update(req.body);
        res.json({
            message: 'Фирма обновлена',
        });
    } catch(error) {
        res.json({ message: error.message });
    }
};
// delete firm
export const deleteFirm = async (req, res) => {
    try {
        await Firm.destroy(req.body);
        res.json({
            message: 'Фирма удалена',
        });
    } catch(error) {
        res.json({ message: error.message });
    }
};