const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "ncls",
  password: "senhateste123",
  database: "petshop-agenda",
})

module.exports = connection
