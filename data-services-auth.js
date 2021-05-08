//set up schemas here

// need these functions. Note: use promises to resolve() and reject() when returning.
module.exports = {
  initialize: function () {
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
      },
    };

    const pool = new Pool(config);
  },

  checkUser: function (userData) {
    // checks if user is in database
  },

  registerUser: async function (userData) {
    // passed in a user object with all the properties in your schema, just put this person into your database. oh, but also check if there's already a person.

    var data = [
      "Krish",
      "Chopra",
      "15",
      "krish.chopra23@gmail.com",
      "hello123",
      6,
      2700,
      11,
    ];

    await pool.query(
      `INSERT INTO data.users (fname, lname, age, email, password, day_streak_count, points, level) VALUES ('${userData[fname]}', '${userData[lname]}', ${userData[age]}, '${userData[email]}', '${userData[password]}', ${userData[day_streak_count]}, ${userData[points]}, '${userData[level]}');`,
      callback
    );
    await pool.query("SELECT id, balance FROM accounts;", callback);
  },
};
