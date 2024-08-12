import { isNull, lt, or } from "drizzle-orm"
import blacklistToken from "../schema/blacklisttoken.js"
import { database } from "../database.js"

const deleteExpiredTokens = async () => {
  try {
    const currentTime = Math.floor(Date.now() / 1000)
    const data = await database
      .delete(blacklistToken)
      .where(or(lt(blacklistToken.expire_time, currentTime), isNull(blacklistToken.expire_time)))
      .returning()
    if (data.length===0)
      console.log("No expire tokens Found!")
    else
    console.log("Expired BlackListed Tokens are deleted!", data)
    
  } catch (error) {
    console.log({ error: error.message })
  }
}
deleteExpiredTokens()

export { deleteExpiredTokens }
