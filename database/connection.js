import sql from 'mssql';
import config from './config'

export const getConnection = async ()=>{
    try {
        let pool= await sql.connect(config);
        return pool;
    } catch (error) {
        console.log(error)
    }
}