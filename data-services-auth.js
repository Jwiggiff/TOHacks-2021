//set up schemas here

const e = require("express");

// need these functions. Note: use promises to resolve() and reject() when returning.

let pool;
module.exports = {
    initialize: function(){
        //initializing functions. e.g. create connection, create model etc.
        return new Promise((resolve,reject) => {
            const { Pool } = require("pg");

            const config = {
                user: "om",
                password: "TnMfK5w8C9tnMb6L",
                host: "free-tier5.gcp-europe-west1.cockroachlabs.cloud",
                database: "lumpy-orca-283.data",
                port: 26257,
                ssl: {
                  rejectUnauthorized: false,
                }
            };
            pool = new Pool(config);
            resolve("database connected");
        })
    },

    checkUser: function(userData){
        // authenticates user

        var user_exists = false;

        email_address = userData[email];
        user_password = userData[password];
        // const query = (
        //     `SELECT COUNT(*) FROM data.users WHERE email = ${email_address};`
        // );

        const query = `
            SELECT email, password
            FROM data.users
            WHERE email = ${email_address} AND password = ${user_password};
        `;
        
        pool.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }

            if (res.length > 0) {
                user_exists = true;
                console.log('Successfully authenticated')
            } else {
                console.log('Invalid email or password')
            }

            pool.end();
        });
        
        return user_exists;
    },

    registerUser: function(userData){
        return new Promise((resolve,reject)=>{
            pool.query(`INSERT INTO data.users VALUES (default, '${userData.f_name}', '${userData.l_name}', '${userData.email}', '${userData.password}', NULL, NULL, NULL, NULL, NULL, NULL, NULL);`, (err, res) => {
                if (err) {
                    console.log('Something went wrong. Please ensure the user data was inputted correctly.');
                    console.error(err);
                }
                pool.end();
            })
            resolve("user has been added correctly");
        })
    }

}
