import { eq,or, and, asc, desc } from "drizzle-orm"
import conversation from "../../db/schema/conversation.js";
import { user } from "../../db/schema/user.js";
import { database } from "../../db/database.js";
import { successResponse, errorResponse } from "../utils/response.handle.js";
import { inArray,arrayContains } from "drizzle-orm";



// Create new conversation
const createConversation = async (req, res) => {
    try {
        const sender_id = req.loggedInUserId
        const { receiver_id } = req.body
        const isReceiver = await database.query.user.findFirst({
            where: (
                eq(user.id, receiver_id)
            )
        })
        if (!isReceiver) {
            return errorResponse(res, "No data Found against this receiver_id", 400)
        }
        const memberArray = [sender_id, receiver_id]
        const existingConversation = await database.query.conversation.findFirst({
            where: (
                eq(conversation.members, memberArray)
            )
        });
        if (existingConversation)
        {
            return errorResponse(res, "Conversation between these users already available", 400)
            }
        const data = await database
            .insert(conversation)
            .values({
                members: memberArray
            })
            .returning()
        return successResponse(res, "Conversation created succesfully!", data)
    } catch (error) {
        return errorResponse(res, error.message, 500)
    }
}

// Get conversations of a user
const getConversation = async (req, res) => {
    try {
        
const conversations = await database.select().from(conversation).where(arrayContains(conversation.members, [req.loggedInUserId]))
        // console.log(conversations.members.)
        if (conversations.length<=0) {
            return successResponse(res,"No conversations found against this user",conversations)
        }
        return successResponse(res,"Conversations list found!",conversations)
    } catch (error) {
        return errorResponse(res, error.message, 500)
    }
}

export {createConversation,getConversation}

