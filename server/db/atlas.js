import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';
dotenv.config("../");
async function con() {
    try {
        const uri =`mongodb+srv://vicky:vmvmvm12345@atlascluster.3c0ouhb.mongodb.net/db_user_login`
        const options ={
            useNewUrlParser:true,
            useUnifiedTopology:true,
        };
        const cliente =await MongoClient.connect(uri, options);
        return cliente.db();
    } catch (error) {
        return {status:500, message:error}
    }
}
export {con}
