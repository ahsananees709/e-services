// import { database } from "../../db/database.js"
// import { address } from "../../db/schema/address.js"
// import { successResponse, errorResponse } from "../utils/response.handle.js"


// // Create Address Controller
// const addAddress = async (req, res) => {
//     try {
//         const { street_no, city, state, postal_code, country, location } = req.body;
//         const data = await database
//             .insert(address)
//             .values({
//                 street_no,
//                 city,
//                 state,
//                 postal_code,
//                 country,
//                 location,
//                 user_id: req.loggedInUserId
//             })
//             .returning({ id: address.id, street_no: address.street_no, city: address.city, state: address.state, country: address.country, location: address.location, user_id: address.user_id })
//         return successResponse(res, "Address Added successfully!", data);
//     } catch (error) {
//         return errorResponse(res, error.message, 500);
//     }
// }
// // Get Address Controller
// const getAddress = async (req, res) => {
//     try {
//         const { id } = req.query.id
//         if(id)
//         {
//             const data = await database.query.address.findFirst({ where: and(eq(address.id, id), eq(address.user_id, req.loggedInUserId)) })
//         if (!data) {
//             return successResponse(res, "Address not found", null);
//             }
//             return successResponse(res, "Address retrieved successfully!", data);
//         }
//         const data = await database.query.address.findMany({ where: eq(address.user_id, req.loggedInUserId) })
//         if (!data) {
//             return successResponse(res, "Address not found", null);
//             }
//         return successResponse(res, "Address retrieved successfully!", data);
//     } catch (error) {
//         return errorResponse(res, error.message, 500);
//     }
// }

// const updateAddress = async (req, res) => {
//     try {
//         const { street_no, city, state, postal_code, country, location } = req.body
//         const { id } = req.query.id
//         const data = await database.update(address)
//         .set({
//             street_no,
//             city,
//             state,
//             postal_code,
//             country,
//             location,
//         })
//         .where(and(eq(address.id, id), eq(address.user_id, req.loggedInUserId)))
//         .returning({ id: address.id, street_no: address.street_no, city: address.city, state: address.state, country: address.country, location: address.location, user_id: address.user_id });
//         if(!data)
//         return successResponse(res, "No address with this id found!", null);
//         return successResponse(res, "Address updated successfully!", data);
//     } catch (error) {
//         return errorResponse(res, error.message, 500);
//     }
// }
// // Delete Address Controller
// const deleteAddress = async (req, res) => {
//     try {
//         const { id } = req.query.id
//         const data = await database.delete(address)
//             .where(and(eq(address.id, id), eq(address.user_id, req.loggedInUserId)))
//             .returning({ id: address.id, street_no: address.street_no, city: address.city, state: address.state, country: address.country, location: address.location, user_id: address.user_id });
//         if (!data)
//             return successResponse(res, "No address with this id found!", null);
//         return successResponse(res, "Address deleted successfully!", data);
//     } catch (error) {
//         return errorResponse(res, error.message, 500);
//     }
// }

// export {
//     addAddress,
//     getAddress,
//     updateAddress,
//     deleteAddress
// }
