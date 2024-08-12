import { user, genderEnum, userRelations } from "./user.js"
import role from "./role.js"
import blackListToken from "./blacklisttoken.js"
import { address, addressRelations } from "./address.js"
import { category,categoryRelations } from "./category.js"
import { service, serviceRelations } from "./service.js"
import { order, orderRelations } from "./order.js"
import message from "./message.js"
import conversation from "./conversation.js"
import { review,reviewRelations } from "./review.js"

const schema = [
  user,
  genderEnum,
  userRelations,
  role,
  blackListToken,
  address,
  addressRelations,
  category,
  categoryRelations,
  service,
  serviceRelations,
  order,
  orderRelations,
  message,
  conversation,
  review,
  reviewRelations
  // Add more schemas as needed
]

export default schema
