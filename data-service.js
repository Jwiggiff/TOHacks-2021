module.exports = {
    //return list of animal objects of a certain type: dog, cat, bug, fish
    getAnimalByType: function(client, type) {
        client.query(`SELECT * FROM data.animals WHERE type='${type}';`, (err, res) => {
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
    getUser: function(client, email) {
        client.query(`SELECT * FROM data.users WHERE email='${email}';`, (err, res) => {
            if (err) {
                console.log ('Something went wrong. Please ensure a valid email is provided.');
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
    getAnimalbyID: function(client, id) {
        client.query(`SELECT * FROM data.animals WHERE id='${id}';`, (err, res) => {
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
    assignAnimal: function(client, email, animal_id) {
        client.query(`UPDATE data.users SET adopt='${animal_id}' WHERE email='${email}';`, (err, res) => {
            if (err) {
                console.log('Something went wrong. Please ensure valid user email and animal UUID are provided.');
                console.log(err);
            }
        });
    }
}