// import express from "express"
// import {
//     addAddress,
//     getAddress,
//     updateAddress,
//     deleteAddress
// } from "../controllers/address.controllers.js"
// import { validationMiddleware } from "../middlewares/validation_schema.js"
// import {
//     addAddressValidationSchema,
//     getAddressValidationSchema,
//     updateAddressValidationSchema,
//     deleteAddressValidationSchema
// } from "../validation_schemas/address.validation.schemas.js"
// import {
//     authentication
// } from "../middlewares/auth_middlewares.js"

// const router = express.Router()

// router.post('/add-address', authentication, validationMiddleware(addAddressValidationSchema, req => req.body), addAddress)
// router.get('/get-address/:id?', authentication, validationMiddleware(getAddressValidationSchema, req => req.query), getAddress)
// router.patch('/update-address/:id?', authentication, validationMiddleware(updateAddressValidationSchema, req => req.body), updateAddress)
// router.delete('delete-address/:id?', authentication, validationMiddleware(deleteAddressValidationSchema, req => req.query), deleteAddress)

// export default router