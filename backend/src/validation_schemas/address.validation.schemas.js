// import { z } from "zod"

// const addAddressValidationSchema =  z
// .object({
//   street_no: z
//     .number({ message: "street_no should be a positive number" })
//     .min(0, { message: "street_no should be a positive number" }),
//   city: z
//     .string()
//     .min(1)
//     .regex(/^[A-Za-z\s]+$/, { message: "City must be a string of characters" }),
//   state: z
//     .string()
//     .min(1)
//     .regex(/^[A-Za-z\s]+$/, { message: "State must be a string of characters" }),
//   postal_code: z.string().min(1).regex(/^\d+$/, { message: "Postal Code must be a string of numbers" }),
//   country: z
//     .string()
//     .min(1)
//     .regex(/^[A-Za-z\s]+$/, { message: "Country must be a string of characters" }),
//   location: z.string().optional(),
// })

// const getAddressValidationSchema = z.object({
//     id: z.string().uuid({ message: "id must be a uuid" }).optional(),
//   })

// const updateAddressValidationSchema =  z
// .object({
//   street_no: z
//     .number({ message: "street_no should be a positive number" })
//     .min(0, { message: "street_no should be a positive number" })
//   .optional(),
//   city: z
//     .string()
//     .min(1)
//     .regex(/^[A-Za-z\s]+$/, { message: "City must be a string of characters" })
//   .optional(),
//   state: z
//     .string()
//     .min(1)
//     .regex(/^[A-Za-z\s]+$/, { message: "State must be a string of characters" }),
//   postal_code: z.string().min(1).regex(/^\d+$/, { message: "Postal Code must be a string of numbers" })
//   .optional(),
//   country: z
//     .string()
//     .min(1)
//     .regex(/^[A-Za-z\s]+$/, { message: "Country must be a string of characters" })
//   .optional(),
//   location: z.string().optional(),
// })

// const deleteAddressValidationSchema = z.object({
//     id: z.string({ message: "id must be a uuid and required" }).uuid({ message: "id must be a uuid" }),
// })
  
// export {
//     addAddressValidationSchema,
//     getAddressValidationSchema,
//     updateAddressValidationSchema,
//     deleteAddressValidationSchema
// }