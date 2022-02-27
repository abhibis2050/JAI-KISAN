const mongoose = require("mongoose")
const validator = require('../validator/validator')
const customerModel = require('../models/customerModel')


const createCustomer = async function (req, res) {
    try {
        let requestBody = req.body
        const { firstName, lastName, mobile, DOB, email, address, status } = requestBody

        //validations
        //Request Body Validation
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Body Is Empty" })
        }
        if (!validator.isValid(firstName)) {
            return res.status(400).send({ status: false, msg: "Enter First Name" })
        }
        if (!validator.isValid(lastName)) {
            return res.status(400).send({ status: false, msg: "Enter Last Name" })
        }
        if (!validator.isValid(mobile)) {
            res.status(400).send({ status: false, msg: "Enter A Valid Phone" })
        }
        if (!validator.isValid(DOB)) {
            res.status(400).send({ status: false, msg: "Enter A Valid Date Of Birth" })
        }
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "Enter A Valid E-mail" })
        }
        if (!validator.isValid(address)) {
            res.status(400).send({ status: false, msg: "Enter A Valid Address" })
        }
        if (!validator.isValid(status)) {
            res.status(400).send({ status: false, msg: "Enter A Valid Status" })
        }

        //Check Dublication Of Mobile
        const checkMobile = await customerModel.findOne({ mobile: mobile })
        if (checkMobile) {
            return res.status(400).send({ status: false, msg: "Mobile Number Already Exist" })
        }
         //validating phone number of 10 digits only.
         if (!/^[0-9]{10}$/.test(mobile))
         return res.status(400).send({ status: false, message: "Invalid Phone number.Phone number must be of 10 digits." })

        //Check Dublication Of Email
        const checkEmail = await customerModel.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).send({ status: false, msg: "Email Number Already Exist" })
        }
        //validation for Email
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return res.status(400).send({ status: false, message: "Invalid Email id." })
        const customerDetails = { firstName, lastName, mobile, DOB, email, address, status }

        let savedCustomer = await customerModel.create(customerDetails)
        res.status(201).send({ status: true, msg: "Customer created successfully", data: savedCustomer });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

//GET ALL CUSTOMER WITH STATUS:ACTIVE

const getCustomer = async function(req,res){
    try{
        let findCustomer = await customerModel.find({status:"Active"})
        if(!findCustomer){
            res.status(400).send({status:false,msg:"Customer With Active Status Not Found"})
        }
        else{
            res.status(200).send({status:true, msg:"User Found" , data:findCustomer})
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

//DELETE CUSTOMER

const deleteCustomer = async function(req,res){
    try{
        let customerId = req.query.customerId
        if(!validator.isValidObjectId(customerId)){
            return res.status(402).send({status:false, message: "invalid customerId in query"})
        }

    const findCustomerToDelete = await customerModel.findOne({_id:customerId})
    if(!findCustomerToDelete){
        return res.status(400).send({status:false,msg:"customer not found"})
    }else{
        if(findCustomerToDelete.isDeleted==true){
            res.status(400).send({status:false,msg:"Customer has already been deleated"})
        }else{
            const deleteCustomer = await customerModel.findOneAndUpdate({_id:customerId},{ isDeleted: true} , { new: true })
                return res.status(200).send({status:true,message:"deleated successfully",data:deleteCustomer})
        }
    }
    }catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }

}


module.exports = { createCustomer,
    getCustomer,
    deleteCustomer
}
