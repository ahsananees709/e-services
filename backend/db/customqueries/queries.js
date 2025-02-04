import { eq } from "drizzle-orm"
import role from "../schema/role.js"
import { database } from "../database.js"

const getOrCreateRole = async value => {
  try {
    let data
    data = await database.select().from(role).where(eq(role.title,value))
    if (data.length<=0) {
      data = await database.insert(role).values({ title: value, permissions: [] }).returning()
    }
    return data
  } catch (error) {
    // Handle errors
    throw new Error(`Error in getOrCreate function: ${error.message}`)
  }
}

export { getOrCreateRole }
