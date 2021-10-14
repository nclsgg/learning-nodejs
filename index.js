const customExpress = require("./config/customExpress")
const connection = require("./database/connection")

connection.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Connection Successful")
  }
})

const app = customExpress()

app.listen(3000, () => console.log("servidor rodando na porta 3000"))
