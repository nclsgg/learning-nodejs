const moment = require("moment")
const conexao = require("../database/connection")

class Attendance {
  add(attendance) {
    const createdDate = moment().format("YYYY-MM-DD HH:MM:SS")
    const date = moment(attendance.date, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    )
    const datedAttendance = { ...attendance, createdDate, date }

    const sql = "INSERT INTO Attendances SET ?"

    conexao.query(sql, datedAttendance, (error, results) => {
      if (error) {
        console.log(error)
      } else {
        console.log(results)
      }
    })
  }
}

module.exports = new Attendance()
