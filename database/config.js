import dotenv from 'dotenv'
dotenv.config();
let config = {
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBdatabase,
    server: process.env.DBserver,
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export default config;