import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import verificarInput from '../../../utils/verify_input.ts'
import api from '../../services/api.ts';
import type { ITarefa } from '../../types.ts';

function FormAtualizarTarefas() {

  const navigate = useNavigate();

  let [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const { id } = useParams();
  let [titulo, setTitulo] = useState("");
  let [descricao, setDescricao] = useState("");
  let [concluida, setConcluida] = useState(false);

  async function getTarefas() {
    try {
      const response = await api.get("tarefas");
      setTarefas(response.data);
      response.data.find((tarefa_da_vez: ITarefa) => {
        if (tarefa_da_vez.id === Number(id)) {
          setTitulo(tarefa_da_vez.titulo);
          setDescricao(tarefa_da_vez.descricao);
          setConcluida(tarefa_da_vez.concluida);
        }
      });
    } catch (error) {
      console.error("Não foi possível buscar as tarefas.");
    }
  }

  let inputTaskName = useRef<HTMLInputElement>(null);
  let inputTaskDesc = useRef<HTMLInputElement>(null);

  async function atualizarTarefa(e: React.FormEvent) {
    e.preventDefault();
    const valorNomeVerificado = verificarInput(titulo);
    const valorDescVerificado = verificarInput(descricao);
    if (valorNomeVerificado && valorDescVerificado) {
      const resultado = confirm("Você realmente deseja atualizar essa tarefa?");
      if (resultado) {
        try {
          await api.put(`tarefas/${Number(id)}/`, {
            titulo: valorNomeVerificado,
            descricao: valorDescVerificado,
            concluida: concluida
          });
          alert("Parabéns, sua tarefa foi atualizada.");
          navigate("/");
        } catch (error) {
          console.error("Não foi possível atualizar a tarefa.", error);
          alert("Não foi possível atualizar a tarefa.")
        }
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    getTarefas();
  }, []);

  return (
    <>
      <div id="formContainer">
        <div id="formTitle">
          <h3 id="formShow">Formulário de Atualização de Tarefa</h3>
          <p id="formDesc">Aqui você poderá fazer a atualização de uma de suas tarefas</p>
        </div>
        <form id="registerForm">
          <div className="inputsFormater">
            <label htmlFor="name">Nome da tarefa:</label>
            <input type="text" ref={inputTaskName} value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Digite o novo nome da tarefa..." required name="name" id="" />
          </div>
          <div className="inputsFormater">
            <label htmlFor="description">Descrição da tarefa: (Opcional)</label>
            <input type="text" ref={inputTaskDesc} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Digite a nova descrição da tarefa..." name="description" id="" />
          </div>
          <div className="inputsFormater">
            <label htmlFor="status">Status da Tarefa:</label>
            <div id="checkboxContainer">
              <label htmlFor="status">Concluída</label>
              <input type="radio" checked={concluida === true} onChange={() => setConcluida(true)} required name="status" id="" />
              |
              <label htmlFor="status">Não Concluída</label>
              <input type="radio" checked={concluida === false} onChange={() => setConcluida(false)} required name="status" id="" />
            </div>
          </div>
          <div className="inputsFormater">
            <button id="registerButton" onClick={(e) => atualizarTarefa(e)}>Atualizar</button>
          </div>
        </form>
        <div id="formButtons">
          <button id="btn_home" onClick={() => navigate("/")}>Voltar para Home</button>
        </div>
      </div>
    </>
  )
}

export default FormAtualizarTarefas;