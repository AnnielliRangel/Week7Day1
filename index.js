import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

//Banco de dados

const bancoDados = [
  {
    id: "12345",
    name: "Annielli",
    age: "35 anos",
    role: "student",
    active: true,
    tasks: ["aprender MongoCompass", "rever aula", "assistir o jogo"],
  },
];

// Processos

const processos = [
    {
		"id": "proc1",
		"documentName": "Licitação curso",
		"status": "Em Andamento",
		"details": "compra de curso capaticação",
		"dateInit": "15/10/2022",
		"comments": [
			"processo aberto",
			"assinaturas requeridas",
			"em execução"
		],
		"dateEnd": "16/12/2022",
		"setor": "enap"
	},
	{
		"id": "proc2",
		"documentName": "Licitação notebook",
		"status": "Em Andamento",
		"details": "compra de notebook",
		"dateInit": "30/11/2022",
		"comments": [
			"processo aberto",
			"sem previsão"
		],
		"dateEnd": "",
		"setor": "tre"
	},
	{
		"id": "proc3",
		"documentName": "Licitação ar-condicionado",
		"status": "Finalizado",
		"details": "compra de ar-condicionado",
		"dateInit": "15/11/2022",
		"comments": [
			"processo aberto",
			"compra realizada"
		],
		"dateEnd": "25/11/2022",
		"setor": "trj"
	}
  
];

//Criar a ROTA

/*
app.get("/enap", (req, res) => {
  const mensagemInicial = "Bem vindo ao primeiro servidor";
  return res.status(200).json({ msg: mensagemInicial, turma: "92WD" });
});

app.get("/all-users", (req, res) => {
  const users = bancoDados;
  return res.status(200).json(users);
});

//CRUD - create
app.post("/new-user", (req, res) => {
  const form = req.body;
  bancoDados.push(form);

  return res.status(201).json(bancoDados);
});

//CRUD - delete

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const deleteById = bancoDados.find((user) => user.id === id);
  const index = bancoDados.indexOf(deleteById);
  bancoDados.splice(index, 1);

  return res.status(200).json(bancoDados);
});
*/

//ITERAÇÂO 1

//Get para acessar todos os processos
app.get("/all", (req, res) => {
  return res.status(200).json(processos);
});

//Post para criar um novo processo no body do JSON
app.post("/create", (req, res) => {
  const novoProcesso = req.body;
  processos.push(novoProcesso);

  return res.status(201).json(processos);
});

//DELETE para excluir um processo pelo ID
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const deleteById = processos.find((novoProcesso) => novoProcesso.id === id);
  const index = processos.indexOf(deleteById);

  processos.splice(index, 1);

 return res.status(200).json(processos);
});

//PUT para editar um processo
app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const editbyId = processos.find((novoProcesso) => novoProcesso.id === id);
  const index = processos.indexOf(editbyId);

  //função para editar o processo no index da id encontrada

  return res.status(200).json(processos)


});

//GET para acessar um processo pela id
app.get("/process/:id", (req,res)=>{
    const {id}=req.params;
    const processoById = processos.find((processo)=> processo.id === id);
    
    return res.status(200).json(processoById)
})

//GET para acessar um processo pelo status
app.get("/status/open", (req,res)=>{

    const processosAbertos = processos.filter((processo)=> processo.status === "Em Andamento")
    return res.status(200).json(processosAbertos)
})

app.get("/status/close", (req,res)=>{

    const processosFechados = processos.filter((processo)=> processo.status === "Finalizado")
    return res.status(200).json(processosFechados)
})

// o servidor roda
app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
