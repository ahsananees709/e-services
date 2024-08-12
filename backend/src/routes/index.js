import express from "express"
import userRoutes from "./user.routes.js"
import adminRoutes from './admin.routes.js'
import categoryRoutes from './category.routes.js'
import serviceRoutes from './service.routes.js'
import orderRoutes from './order.routes.js'
import conversationRoutes from './conversation.routes.js'
import messageRoutes from './message.routes.js'
import reviewRoutes from './review.routes.js'
// import addressRoute from "./address.routes.js"

const router = express.Router()

router.use("/auth", userRoutes)
router.use('/admin', adminRoutes)
router.use("/category", categoryRoutes)
router.use('/service', serviceRoutes)
router.use('/order', orderRoutes)
router.use('/conversation',conversationRoutes)
router.use('/message', messageRoutes)
router.use('/review',reviewRoutes)

export default router
