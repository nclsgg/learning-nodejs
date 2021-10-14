const moment = require("moment")
const conexao = require("../database/connection")

class Attendance {
  add(attendance, res) {
    const createdDate = moment().format("YYYY-MM-DD HH:MM:SS")

    const date = moment(attendance.date, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    )

    const isDateValid = moment(date).isSameOrAfter(createdDate)
    const isClientValid = attendance.client.length >= 5

    const validations = [
      {
        name: date,
        valid: isDateValid,
        message: "Não é possível marcar um agendamento para o passado.",
      },
      {
        name: "client",
        valid: isClientValid,
        message: "O nome do cliente deve ter pelo menos 5 caracteres.",
      },
    ]

    const errors = validations.filter((camp) => !camp.valid)
    const errorsExists = errors.length

    if (errorsExists) {
      res.status(400).json(errors)
    } else {
      const datedAttendance = { ...attendance, createdDate, date }

      const sql = "INSERT INTO Attendances SET ?"

      conexao.query(sql, datedAttendance, (error, results) => {
        if (error) {
          res.status(400).json(error)
        } else {
          res.status(201).json(results)
        }
      })
    }
  }
}

module.exports = new Attendance()
