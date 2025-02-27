const router = require("express").Router();
const {submitForm,getForms} = require('../controller/FormController')

router.post('/submitForm',submitForm);
router.get("/getform",getForms)
module.exports = router;