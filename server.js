//estrutura básica de um servidor
const express = require("express")

const app = express()
const porta = 3333

function mostraPorta() {
	console.log("Servidor criado e rodando na porta " , porta)
}

//servidor escutando a porta
app.listen(porta, mostraPorta)
