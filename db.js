const mysql = require('mysql');

const dbconf = {
    host: "localhost",
    user: "event",
    password: "event",
    database: "project2"
};


function addip(address,done) {

    let conn = mysql.createConnection(dbconf);
    conn.connect();

    conn.query("insert into onlineip (ip) values('" + address.a + "');",
        function (err, rows, fields) {

            if (err) {

                done("NotExist");
                throw err;

            }

            done(rows);
        })
}

module.exports = {
    addip
}
