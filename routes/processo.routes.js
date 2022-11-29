import express from "express";


const processoRoute = express.Router();

// Processos

const processos = [
  {
    id: "proc1",
    documentName: "Licitação curso",
    status: "Em Andamento",
    details: "compra de curso capaticação",
    dateInit: "15/10/2022",
    comments: ["processo aberto", "assinaturas requeridas", "em execução"],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "proc2",
    documentName: "Licitação notebook",
    status: "Em Andamento",
    details: "compra de notebook",
    dateInit: "30/11/2022",
    comments: ["processo aberto", "sem previsão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "proc3",
    documentName: "Licitação ar-condicionado",
    status: "Finalizado",
    details: "compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["processo aberto", "compra realizada"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

//ITERAÇÂO 1

//Get para acessar todos os processos
processoRoute.get("/all", (req, res) => {
  return res.status(200).json(processos);
});

//Post para criar um novo processo no body do JSON
processoRoute.post("/create", (req, res) => {
  const novoProcesso = req.body;
  //processos.push(novoProcesso);

  return res.status(201).json(processos);
});

//DELETE para excluir um processo pelo ID
processoRoute.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const deleteById = processos.find((novoProcesso) => novoProcesso.id === id);
  const index = processos.indexOf(deleteById);

  processos.splice(index, 1);

  return res.status(200).json(processos);
});

//PUT para editar um processo
processoRoute.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const editbyId = processos.find((novoProcesso) => novoProcesso.id === id);
  const index = processos.indexOf(editbyId);

  processos[index]= {...editbyId, ...req.body}

  return res.status(200).json(processos[index]);
});

//GET para acessar um processo pela id
processoRoute.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const processoById = processos.find((processo) => processo.id === id);

  return res.status(200).json(processoById);
});

//GET para acessar um processo pelo status
processoRoute.get("/status/open", (req, res) => {
  const processosAbertos = processos.filter(
    (processo) => processo.status === "Em Andamento"
  );
  return res.status(200).json(processosAbertos);
});

processoRoute.get("/status/close", (req, res) => {
  const processosFechados = processos.filter(
    (processo) => processo.status === "Finalizado"
  );
  return res.status(200).json(processosFechados);
});

export default processoRoute;
