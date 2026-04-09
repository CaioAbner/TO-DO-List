import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListaTarefas from "../../components/ListaTarefas";
import api from "../../services/api.ts";
import type { ITarefa } from "../../types.ts";
import "./style.css"

function Home() {

  let [tarefa, setTarefa] = useState<ITarefa[]>([]);

  async function getTarefas() {
    try {
      const response = await api.get("/tarefas");
      setTarefa(response.data);
    } catch (error) {
      console.log("Não foi possível buscar as tarefas.", error);
    }
  }

  const navigate = useNavigate();
  let [idSelecionado, setIdSelecionado] = useState<number | null>(null);

  function selecionarAtualizar() {
    if (idSelecionado == null) {
      alert("Por favor, selecione uma tarefa na lista primeiro.")
    } else {
      navigate(`atualizar/${idSelecionado}`);
    }
  }

  async function deletarTarefa() {
    if (idSelecionado == null) {
      alert("Por favor, selecione uma tarefa na lista primeiro.")
      return;
    }

    try {
      let resultado = confirm("Você deseja realmente excluir essa tarefa?");
      if (resultado) {
        await api.delete(`tarefas/${idSelecionado}/`);
        alert("Tarefa excluída com sucesso.");
        getTarefas();
        setIdSelecionado(null);
      } else {
        return;
      }
    } catch (error) {
      console.error("Não foi possível excluir a tarefa.", error);
      alert("Erro ao tentar excluir a tarefa.");
    }

  }

  function redirecionar(local: string) {
    return navigate(`/${local}`);
  }

  useEffect(() => {
    getTarefas();
  }, [])

  return (
    <>
      {tarefa.length > 0
        ? <div id="homeContainer">
          <div id="homeTitle">
            <h1 id="homeShow">Seja bem vindo a home</h1>
            <p id="homeDesc">Aqui você poderá ver suas tarefas e o progresso delas</p>
          </div>
          <ListaTarefas
            tarefasParaExibir={tarefa}
            escolherAtualizar={setIdSelecionado}
            idAtivo={idSelecionado} />
          <div id="homeButtons">
            <button title="Clique aqui caso deseje adicionar uma nova tarefa" id="btn_form" onClick={() => redirecionar("cadastrar")}>Cadastrar Tarefa</button>
            <button title="Clique aqui caso deseje atualizar uma tarefa" id="btn_updt" onClick={selecionarAtualizar}>Atualizar Tarefa</button>
            <button title="Clique aqui caso deseje excluir uma tarefa" id="btn_delete" onClick={deletarTarefa}>Excluir Tarefa</button>
          </div>
        </div>
        : <div id="homeContainer">
          <h1>Seja bem vindo a home</h1>
          <p>Você ainda não possui tarefas cadastradas.</p>
          <button onClick={() => redirecionar("cadastrar")}>
            Cadastrar primeira tarefa
          </button>
        </div> }
    </>
  )
}

export default Home;