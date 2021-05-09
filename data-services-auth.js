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
        var user_exists = false;

        email_address = userData[email];
        user_password = userData[password];

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
            pool.query(`INSERT INTO data.users VALUES (default, '${userData.fname}', '${userData.lname}', '${userData.email}', '${userData.password}', NULL, NULL, NULL, NULL, NULL, NULL, NULL);`, (err, res) => {
                if (err) {
                    console.log('Something went wrong. Please ensure the user data was inputted correctly.');
                    console.error(err);
                }
                pool.end();
            })
            resolve("user has been added correctly");
        })
    },
    //return list of animal objects of a certain type: dog, cat, bug, fish
    getAnimalByType: function(type) {
        pool.query(`SELECT * FROM data.animals WHERE type='${type}';`, (err, res) => {
            if (err) {
                console.log ('Something went wrong. Please ensure a valid animal type is provided.');
                console.log (err);
            } else {
                let ans = [];
                res.rows.forEach((row) => {
                    ans.push(row);
                });
                return ans;
            }
        });
    },
    //return user object given email
    getUser: function(email) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM data.users WHERE email='${email}';`, (err, res) => {
                if (err) {
                    console.log ('Something went wrong. Please ensure a valid email is provided.');
                    console.log (err);
                } else {
                    let ans;
                    res.rows.forEach((row) => {
                        ans = row;
                    });
                    // return ans;
                    resolve(ans);
                }
            });
        });
    },
    getAnimalbyID: function(id) {
        pool.query(`SELECT * FROM data.animals WHERE id='${id}';`, (err, res) => {
            if (err) {
                console.log ('Something went wrong. Please ensure a valid animal UUID is provided.');
                console.log (err);
            } else {
                let ans;
                res.rows.forEach((row) => {
                    ans = row;
                });
                return ans;
            }
        });
    },
    //TODO: make a function for assign an adopter to an animal and assigning pet to human
    assignAnimal: function(email, animal_id) {
        pool.query(`UPDATE data.users SET adopt='${animal_id}' WHERE email='${email}';`, (err, res) => {
            if (err) {
                console.log('Something went wrong. Please ensure valid user email and animal UUID are provided.');
                console.log(err);
            }
        });
    }
}
