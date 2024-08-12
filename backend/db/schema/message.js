import { pgTable, uuid,text, varchar, jsonb,timestamp } from "drizzle-orm/pg-core"

const message = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    conversation_id: uuid("conversation_id").notNull(),
    sender_id: uuid("sender_id").notNull(),
    text: text("text"),
    timestamp: timestamp("timestamp").notNull().defaultNow()
})

export default message
