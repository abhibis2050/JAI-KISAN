const express = require('express');
const router = express.Router();

// Imported controllers files and models files with middlewares.
const customerController = require("../controllers/customerController")
const cardController = require("../controllers/cardController")
const Middleware = require("../middleware/middleware")


//Customer APIs 
router.post('/customer',customerController.createCustomer)
router.get('/customer',customerController.getCustomer)
router.delete('/customer',customerController.deleteCustomer)

//Card APIs
router.post('/card',cardController.createCard)
router.get('/card',cardController.getAllCard)





module.exports = router;
