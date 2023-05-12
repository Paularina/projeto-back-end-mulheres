//aqui estou iniciando o express
const express = require("express")

//configurando primeira parte da rota
const router = express.Router()

const {v4: uuidv4} = require('uuid')

//iniciando o app
const app = express()
app.use(express.json())
const porta = 3333//criando a porta


//criando lista inicial de mulheres
const mulheres = [
	{
		id: '1',
		nome: 'Simara Conceição',
		imagem: '',
		minibio: 'Desenvolvedora e instrutora'
	},

	{	
		id: '2',
		nome: 'Iana Chan',
		imagem: '',
		minibio: 'Fundadora da Programaria'
	},
	{
		id: '3',
		nome: 'Nina da Hora',
		imagem: '',
		minibio: 'Hacker antirracista'
	}
]

//GET
function mostraMulheres(request, response) {
	response.json(mulheres)
}

//POST
function criaMulher(request, response) {
	const novaMulher = {
		id: uuidv4(),
		nome: request.body.nome,
		imagem: request.body.imagem,
		minibio: request.body.minibio
	}

	mulheres.push(novaMulher)

	response.json(mulheres)
}



//PORTA
function mostraPorta() {
	console.log("Servidor criado e rodando na porta " , porta)
}

//rota GET /mulheres
app.use(router.get('/mulheres', mostraMulheres))

//rota POST /mulheres
app.use(router.post('/mulheres',criaMulher))

//Servidor ouvindo a porta
app.listen(porta, mostraPorta)
