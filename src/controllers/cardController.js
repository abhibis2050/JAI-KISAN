const mongoose = require("mongoose")
const cardModel = require('../models/cardModels')
const customerModel = require('../models/customerModel')
const validator = require('../validator/validator')

const createCard = async function (req, res) {
    try {
        let query = req.query.cusId
        let bodyRequest = req.body

        const {cardType, customerName, vision, customerId } = bodyRequest

        if (!validator.isValidRequestBody(bodyRequest)) {
            return res.status(400).send({ status: false, msg: "Body Is Empty" })
        }
        
        if (!validator.isValid(cardType)) {
            return res.status(400).send({ status: false, msg: "Enter proper cardType" })
        }
        if (!validator.isValid(customerId)) {
            return res.status(400).send({ status: false, msg: "Enter proper customerId" })
        }
        if (!validator.isValid(customerName)) {
            return res.status(400).send({ status: false, msg: "Enter proper customerName" })
        }
        if (!validator.isValid(vision)) {
            return res.status(400).send({ status: false, msg: "Enter proper vision" })
        }

        
        if(!query){
            return res.status(400).send({status:false,msg:`Enter CustomerId In Query`})
        }else{
            const findCustomer = await customerModel.findOne({ _id:query })
            const cardAlreadyMade = await cardModel.findOne({customerId:query})
            if (!findCustomer) {
                return res.status(400).send({ status: false, msg: `Customer with id ${query} doesnot exists` })
            } else if (findCustomer.isDeleted == true) {
                return res.status(400).send({ status: false, msg: `Customer with id ${query} Already Deleated` })
             }
             else if(cardAlreadyMade){
                res.status(400).send({status:false,msg:"Card for this user is already created"})
            }
            else {
                let counteddoc = await cardModel.count() + 1
                let incCard = "C00" + counteddoc
                let finalCreateCard = {cardNumber:incCard,cardType, customerName, vision,customerId}
                const saveCard = await cardModel.create(finalCreateCard)
                return res.status(201).send({ status: true, msg: `Card for customer with id ${query} created successfully `, data: saveCard })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }

}

const getAllCard = async function (req, res) {
    try {
        const findAllCard = await cardModel.find()
        if (!findAllCard) {
            res.status(400).send({ status: false, msg: "no cards found" })
        } else {
            res.status(200).send({ status: true, msg: "All Cards Found", data: findAllCard })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {
    createCard,
    getAllCard
}