require('dotenv').config();
const bcrypt=require('bcrypt');
const {client}=require('./client');

const {ADMIN_USER,ADMIN_PASS}=process.env;
const createAdmin=async()=>
{
    try
    {
        console.log('admin creation start');
        client.connect();
        const {rows:[user]}=await client.query
        (`
            INSERT INTO users(user_name,user_password,user_admin)
            VALUES($1,$2,$3)
            ON CONFLICT
            DO NOTHING
            RETURNING user_id,user_name;`,
        [ADMIN_USER,await bcrypt.hash(ADMIN_PASS,10),true]
        );
        console.log(user+" created");
    }
    catch(error)
    {
        throw error;
    }
    finally
    {
        client.end();
    }
}
createAdmin();