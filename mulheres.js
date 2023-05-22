//aqui estou iniciando o express
const express = require("express")

//configurando primeira parte da rota
const router = express.Router()

const cors = require('cors')

//ligando ao arquivo bancoDeDados
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados()

const Mulher = require('./mulherModel')

//iniciando o app
const app = express()
app.use(express.json())
app.use(cors())

const porta = 3333//criando a porta

//GET
async function mostraMulheres(request, response) {
	try {
		const mulheresVindasDoBancoDeDados = await Mulher.find()

		response.json(mulheresVindasDoBancoDeDados)
	}catch (erro) {
		console.log(erro)
	}
	
}

//POST
async function criaMulher(request, response) {
	const novaMulher = new Mulher({
		nome: request.body.nome,
		imagem: request.body.imagem,
		minibio: request.body.minibio,
		citacao: request.body.citacao
	})

	try {
		const mulherCriada = await novaMulher.save()
		response.status(201).json(mulherCriada)
	} catch (erro) {
		console.log(erro)
	}
}

//PATCH
async function corrigeMulher(request, response) {
	try {
			const mulherEncontrada = await Mulher.findById(request.params.id)
			if(request.body.nome){
				mulherEncontrada.nome = request.body.nome
			}
		
			if(request.body.imagem){
				mulherEncontrada = request.body.imagem
			}
		
			if(request.body.minibio){
				mulherEncontrada.minibio = request.body.minibio
			}

			if (request.body.citacao){
				mulherEncontrada = request.body.citacao
			}

			const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
			response.json(mulherAtualizadaNoBancoDeDados)
		
	} catch(erro) {
		console.log(erro)
	}
	
	
	
}

async function deletaMulher(request, response) {
	try{

		await Mulher.findByIdAndDelete(request.params.id)
		response.json({ mensagem: 'Mulher Deletada com sucesso!'})

	}catch(erro){
		console.log(erro)
	}
	
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
