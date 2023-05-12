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

//PATCH
function corrigeMulher(request, response) {
	function encontraMulher(mulher) {
		if(mulher.id === request.params.id){
			return mulher
		}
	}

	const mulherEncontrada = mulheres.find(encontraMulher)

	if(request.body.nome){
		mulherEncontrada.nome = request.body.nome
	}

	if(request.body.imagem){
		mulherEncontrada = request.body.imagem
	}

	if(request.body.minibio){
		mulherEncontrada.minibio = request.body.minibio
	}

	response.json(mulheres)
}

function deletaMulher(request, response) {
	function todasMenosEla(mulher) {
		if (mulher.id !== request.params.id) {
			return mulher
		}
	}

	const mulheresQueFicaram = mulheres.filter(todasMenosEla)
	response.json(mulheresQueFicaram)
}

//PORTA
function mostraPorta() {
	console.log("Servidor criado e rodando na porta " , porta)
}

//rota GET /mulheres
app.use(router.get('/mulheres', mostraMulheres))

//rota POST /mulheres
app.use(router.post('/mulheres',criaMulher))

//rota PATCH /mulheres/:id
app.use(router.patch('/mulheres/:id', corrigeMulher))

//rota Delete
app.use(router.delete('/mulheres/:id',deletaMulher))

//Servidor ouvindo a porta
app.listen(porta, mostraPorta)
