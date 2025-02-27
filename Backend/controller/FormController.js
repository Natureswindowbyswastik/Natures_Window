const FormModel = require('../model/Form');
const FromModel = require('../model/Form')

// Submit Form Data
const submitForm = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, title, message } = req.body;
        console.log('Form data received:', req.body);
        const newForm = new FormModel({ firstName, lastName, email, phoneNumber, title, message });
        await newForm.save();

        res.status(201).json({ success: true, message: "Form submitted successfully", data: newForm });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const getForms = async (req, res) => {
    try {
        const forms = await FormModel.find();
        res.status(200).json({ success: true, data: forms });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports={submitForm,getForms}