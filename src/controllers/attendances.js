const Attendance = require("../models/attendances")

module.exports = (app) => {
  app.get("/atendimentos", (req, res) =>
    res.send("Você está na rota de atendimentos e está realizando um GET")
  )

  app.post("/atendimentos", (req, res) => {
    const attendance = req.body

    Attendance.add(attendance, res)
  })
}
