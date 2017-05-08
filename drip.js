var mysql      = require('mysql');
var connection;
const mysqlHost = process.env.MYSQL_HOST || "localhost"
const mysqlPassword = process.env.MYSQL_PASSWORD || "banana"
const mysqlPort = process.env.MYSQL_PORT || 3306

function createDBConnection () {
    console.log ("Connecting to DB on " + mysqlHost + " port " + mysqlPort + " password " + mysqlPassword)
    connection = mysql.createConnection({
        host     : mysqlHost,
        user     : 'root',
        password : mysqlPassword,
        database : 'drip',
        port     : mysqlPort
    });

    connection.connect();
}

function createTable () {
    console.log ("Creating table...")
    connection.query ("CREATE TABLE DRIP (time TIMESTAMP, PRIMARY KEY(time))", 
        function (error, results, fields) {
            if (error) {
                console.log ("Error: " + error)
            } else {
                console.log ("Result: " + fields)
            }
        }
    );

}

function count() {
    console.log ("Counting records...")
    connection.query ("SELECT COUNT(*) as c FROM DRIP", 
        function (error, results, fields) {
            if (error) {
                console.log ("Error: " + error)
            } else {
                console.log ("Count: " + results[0]['c'])
            }
        }
    );

}

function drip () {
    console.log ("Adding record...")
    connection.query ("INSERT INTO DRIP VALUES ()", 
        function (error, results, fields) {
            if (error) {
                console.log ("Error: " + error)
            } else {
                console.log ("Record added")
            }
            setTimeout (drip, 1000)
        }
    );
}

createDBConnection()
createTable()
count()
drip ()

