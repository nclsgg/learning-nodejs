const moment = require("moment")
const connection = require("../database/connection")

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

      connection.query(sql, datedAttendance, (error, results) => {
        if (error) {
          res.status(400).json(error)
        } else {
          res.status(201).json(attendance)
        }
      })
    }
  }

  list(res) {
    const sql = "SELECT * FROM Attendances"

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json(results)
      }
    })
  }

  searchById(id, res) {
    const sql = `SELECT * FROM Attendances WHERE id=${id}`

    connection.query(sql, (error, results) => {
      const attendance = results[0]
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json(attendance)
      }
    })
  }

  update(id, values, res) {
    if (values.date) {
      values.date = moment(values.date, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      )
    }

    const sql = "UPDATE Attendances SET ? WHERE id=?"

    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json({ ...values, id })
      }
    })
  }

  delete(id, res) {
    const sql = `DELETE FROM Attendances WHERE id=${id}`

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error)
      } else {
        res.status(200).json("Deletado")
      }
    })
  }
}

module.exports = new Attendance()
