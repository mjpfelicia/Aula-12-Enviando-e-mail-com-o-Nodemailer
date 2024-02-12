const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const port = 443;

app.get("/", (req, res) => res.send("Enviando email com o Nodemailer!"));

app.get("/sendemail", async (req, res) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e837e9989e0c24",
      pass: "26850403d8c149",
    },
  });

  var message = {
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Recuperação de senha",
    text: "Sandra.Voce solicitou a alteração de senha.",
    html: "<p>alteração de senha</p>",
  };

  transport.sendMail(message, function (err, info) {
    console.warn({ info });
    console.warn({ err });

    if (err) {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro: E-mail não enviado!",
        message: err.message,
      });
    } else
      return res.json({
        erro: false,
        mensagem: "E-mail enviado com sucesso!",
      });
  });
});
app.listen(port, () => {
  console.log(`App rodando na porta`);
});
