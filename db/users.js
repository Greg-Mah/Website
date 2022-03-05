const bcrypt=require('bcrypt');
const {client}=require('./client');

const createUser=async({username,password})=>
{
    try 
    {
        const {rows:[user]}=await client.query//do not expose password unless required to
        (`
            INSERT INTO users(user_name,user_password)
            VALUES($1,$2)
            ON CONFLICT
            DO NOTHING
            RETURNING user_id,user_name,user_wallet,user_admin;`,
            [username,await bcrypt.hash(password,10)]
        );
        return user;
    }
    catch(error)
    {
        throw error;
    }
}

const loginUser=async({username,password})=>
{
    try 
    {
        const {rows:[user]}=await client.query//grabbing password remember to remove before returning
        (`
            SELECT user_id,user_name,user_password,user_wallet,user_admin
            FROM users
            WHERE user_name=$1;`,
            [username]
        );
        if(user&&await bcrypt.compare(password,user.user_password))
        {
            delete user.user_password;//do not expose password unless required to
            return user;
        }
        else
        {
            return;
        }
    }
    catch(error)
    {
        throw error;
    }
}

const getAllUsers=async()=>
{
    const{rows:users}=await client.query//do not expose password unless required to
    (`
        SELECT user_id,user_name,user_wallet,user_admin
        FROM users;
    `);
    return users;
}

const getUserById=async(id)=>
{
    try 
    {
        const {rows:[user]}=await client.query//do not expose password unless required to
        (`
            SELECT user_id,user_name,user_wallet,user_admin
            FROM users
            WHERE user_id=$1;`,
            [id]
        );
        return user;
    }
    catch(error)
    {
        throw error;
    }
}

const getUserByUsername=async(username)=>
{
    try 
    {
        const {rows:[user]}=await client.query//do not expose password unless required to
        (`
            SELECT user_id,user_name,user_wallet,user_admin
            FROM users
            WHERE user_username=$1;`,
            [username]
        );
        return user;
    }
    catch(error)
    {
        throw error;
    }
}

module.exports=
{
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
}