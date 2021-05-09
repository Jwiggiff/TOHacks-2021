const { Pool } = require("pg");
let pool;

module.exports = {
    initialize: function(){
        //initializing functions. e.g. create connection, create model etc.
        return new Promise((resolve,reject) => {
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
        return new Promise((resolve,reject)=> {

            email_address = userData.email;
            user_password = userData.password;
    
            console.log(userData)
            const query = `
                SELECT email, password
                FROM data.users
                WHERE email = '${email_address}' AND password = '${user_password}';
            `;
            
            pool.query(query, (err, res) => {
                console.log(res);
                if (err) {
                    reject(err);
                }
                if (res.rowCount = 1) {
                    resolve('Successfully authenticated');
                } else {
                    resolve('Invalid email or password');
                }
            });
        })

    },

    registerUser: function(userData){
        return new Promise((resolve,reject)=>{
            pool.query(`INSERT INTO data.users VALUES (default, '${userData.fname}', '${userData.lname}', '${userData.email}', '${userData.password}', NULL, NULL, NULL, NULL, NULL, NULL, NULL);`, (err, res) => {
                if (err) {
                    console.log('Something went wrong. Please ensure the user data was inputted correctly.');
                    console.error(err);
                }
                resolve("user has been added correctly");
            })
        })
    }

}
