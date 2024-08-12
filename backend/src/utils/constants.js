import dotenv from "dotenv"

dotenv.config({ path: ".env.development" })

const USER_ROLE = { CUSTOMER: "customer", SERVICE_PROVIDER:"service_provider",ADMIN:"admin" }

export const {
  SERVER_PORT,
  SERVER_HOST,
  DATABASE_URL,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  JWT_PRIVATE_KEY,
  JWT_EXPIRATION_TIME,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_NAME
} = process.env
export { USER_ROLE }
