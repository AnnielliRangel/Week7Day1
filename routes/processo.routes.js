import express from "express";
import ProcessoModel from "../model/processo.model.js";

const processoRoute = express.Router();

// Processos

//CRUD COM MONGO
processoRoute.post("/create-processo", async (req, res) => {
  try {
    const processo = req.body;
    const novoProcesso = await ProcessoModel.create(processo);
    return res.status(201).json(novoProcesso);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Processo não criado" });
  }
});

processoRoute.get("/all", async (req, res) => {
  try {
    const processos = await ProcessoModel.find({});
    return res.status(200).json(processos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo deu errado" });
  }
});

processoRoute.get("/processo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const processo = await ProcessoModel.findById(id);

    if (!processo) {
      return res.status(400).json({ msg: "Processo não encontrado" });
    }

    return res.status(200).json(processo);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});

processoRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProcesso = await ProcessoModel.findByIdAndDelete(id);
    const processos = await ProcessoModel.find();

    if (!deleteProcesso) {
      return res.status(400).json({ msg: "Processo não encontrado" });
    }

    return res.status(200).json(processos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

processoRoute.put("/edit/:id", async(req,res)=>{
  try {
    const {id} = req.params
    const updatedProcesso = await ProcessoModel.findByIdAndUpdate(id, {...req.body}, {new:true, runValidators:true})
    return res.status(200).json(updatedProcesso)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    
  }
})

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

  processos[index] = { ...editbyId, ...req.body };

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
