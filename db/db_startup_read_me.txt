users table
    user_id=unique number for user id
    user_name=unique name entered by user to identify themselves for login and posts
    user_password=hashed password using bcrypt to obscure original password
    user_wallet=integer value of currency that is currently in the account.
    user_admin=boolean value to display and access admin functions

softwares table
    software_id=unique number for software id
    software_name=unique name of software
    software_description=description of software
    software_data=data of software

scores table
    score_id=unique number for score id
    score_value=value of score
    score_user_id=id of user who owns the score
    score_software_id=id of software that the score is on
        only one score per user on a software

products table
    product_id=unique number for product id
    product_name=name of product
    product_description=description of product
    product_price=price of product

orders table
    order_id=unique number for order id
    order_user_id=id of user that owns the order
    order_status=integer denotes status of order
        0=open and active 
        1=submitted not completed 
        2=completed
        -1=stored
        -2=cancelled
    order_date=date order was created

order_products table
    order_product_id=unique number for order_product id
    order_product_order_id=id of order that this order_product belongs to
    order_product_product_id=id of product this order_product refrences
    order_product_quantity=integer value number of products in order_product