const {client}=require('./index');

const buildTables=async()=>
{
    try
    {
        console.log('Drop tables start');

        //create and drop tables in order of dependency
        await client.query
        (`
            DROP TABLE IF EXISTS order_products;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS scores;
            DROP TABLE IF EXISTS softwares;
            DROP TABLE IF EXISTS users;
        `);
        console.log('Drop tables end');
        console.log('create tables start');
        await client.query
        (`
            CREATE TABLE users
            (
                user_id SERIAL PRIMARY KEY,
                user_name VARCHAR(255) UNIQUE NOT NULL,
                user_password VARCHAR(255) NOT NULL,
                user_wallet INTEGER NOT NULL DEFAULT 0,
                user_admin BOOLEAN DEFAULT false
            );

            CREATE TABLE softwares
            (
                software_id SERIAL PRIMARY KEY,
                software_name VARCHAR(255) UNIQUE NOT NULL,
                software_description VARCHAR(255) NOT NULL,
                software_data VARCHAR(255) NOT NULL
            );
            
            CREATE TABLE scores
            (
                score_id SERIAL PRIMARY KEY,
                score_value INTEGER NOT NULL,
                score_user_id INTEGER REFRENCES users(user_id),
                score_software_id INTEGER REFRENCES softwares(software_id),
                UNIQUE(score_user_id,score_software_id)
            );

            CREATE TABLE products
            (
                product_id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                product_description VARCHAR(255) NOT NULL,
                product_price INTEGER NOT NULL
            );

            CREATE TABLE orders
            (
                order_id SERIAL PRIMARY KEY,
                order_user_id INTEGER REFRENCES users(user_id),
                order_status INTEGER NOT NULL,
                order_date DATE
            );

            CREATE TABLE order_products
            (
                order_product_id SERIAL PRIMARY KEY,
                order_product_order_id INTEGER REFRENCES orders(order_id),
                order_product_product_id INTEGER REFRENCES products(product_id),
                order_product_quantity INTEGER NOT NULL
            )
        `);
        console.log('create tables end');
    }
    catch(error)
    {
        throw error;
    }
}

client.connect()
.then(buildTables)
.catch(console.error)
.finally(()=>client.end);