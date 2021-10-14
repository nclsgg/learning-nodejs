const conexao = require("../database/connection")

class Attendance {
  adiciona(attendance) {
    const sql = "INSERT INTO Attendances SET ?"

    conexao.query(sql, attendance, (erro, resultados) => {
      if (erro) {
        console.log(erro)
      } else {
        console.log(resultados)
      }
    })
  }
}

module.exports = new Attendance()
