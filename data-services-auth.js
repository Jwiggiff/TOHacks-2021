//set up schemas here

// need these functions. Note: use promises to resolve() and reject() when returning.
module.exports = {
    initialize: function(){
        //initializing functions. e.g. create connection, create model etc.

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

        const pool = new Pool(config);

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
        // passed in a user object with all the properties in your schema, just put this person into your database. oh, but also check if there's already a person.

        // var data = ['Krish', 'Chopra', '15', 'krish.chopra23@gmail.com', 'hello123'];
        // `INSERT INTO data.users (fname, lname, age, email, password) VALUES ('${data[0]}', '${data[1]}', ${data[2]}, '${data[3]}', '${data[4]}');`

        const query = `
            INSERT INTO data.users (fname, lname, age, email, password, day_streak_count, points, level) VALUES ('${userData[fname]}', '${userData[lname]}', ${userData[age]}, '${userData[email]}', '${userData[password]}', ${userData[day_streak_count]}, ${userData[points]}, '${userData[level]}')
        `;

        pool.query(query, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data insert successful');
            pool.end();
        });

    }

}
