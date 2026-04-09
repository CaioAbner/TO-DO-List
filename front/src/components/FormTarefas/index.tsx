import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import verificarInput from '../../../utils/verify_input.ts'
import api from '../../services/api.ts';

function FormTarefas() {

  let inputTaskName = useRef<HTMLInputElement>(null); // No Typescript eu preciso declarar o tipo que ele vai se referir
  let inputTaskDesc = useRef<HTMLInputElement>(null); // E também um valor inicial. Sem essas duas coisas ele nn vai funcionar
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  async function cadastrarTask(e: React.FormEvent) {
    e.preventDefault();
    const valorNomeVerificado = verificarInput(inputTaskName.current?.value || "");
    const valorDescVerificado = verificarInput(inputTaskDesc.current?.value || "");
    if (valorNomeVerificado && valorDescVerificado) {
      try {
        await api.post("/tarefas/", {
          titulo: valorNomeVerificado,
          descricao: valorDescVerificado
        });

        alert(`Parabéns, sua tarefa "${valorNomeVerificado}" foi cadastrada com sucesso!`);
        formRef.current?.reset();
      } catch (error) {
        console.log("Não foi possível cadastrar a tarefa.", error);
        alert("Não foi possível cadastrar a tarefa.");
      }
    }
  }

  return (
    <>
      <div id="formContainer">
        <div id="formTitle">
          <h3 id="formShow">Formulário de Cadastro de Tarefas</h3>
          <p id="formDesc">Aqui você poderá fazer o cadastro das suas tarefas</p>
        </div>
        <form ref={formRef} onSubmit={cadastrarTask} id="registerForm">
          <div className="inputsFormater">
            <label htmlFor="name">Nome da tarefa:</label>
            <input type="text" ref={inputTaskName} placeholder="Digite o nome da tarefa..." required name="name" id="" />
          </div>
          <div className="inputsFormater">
            <label htmlFor="description">Descrição da tarefa: (Opcional)</label>
            <input type="text" ref={inputTaskDesc} placeholder="Digite a descrição da tarefa..." name="description" id="" />
          </div>
          <div className="inputsFormater">
            <button id="registerButton" type='submit'>Cadastrar</button>
          </div>
        </form>
        <div id="formButtons">
          <button id="btn_home" type='button' onClick={() => navigate("/")}>Voltar para Home</button>
        </div>
      </div>
    </>
  )
}

export default FormTarefas;