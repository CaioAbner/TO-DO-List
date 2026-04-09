import type { ITarefa } from "../../types.ts";
import "./style.css";

interface ListaProps {
    tarefasParaExibir: ITarefa[];
    escolherAtualizar: (id: number) => void;
    idAtivo: number | null;
}

function ListaTarefas({ tarefasParaExibir, escolherAtualizar, idAtivo }: ListaProps) {

    return (
        <>
            <div id="tarefasContainer">
                <h2 id="tarefasTitle">Aqui estão suas tarefas:</h2>
                <ul id="tarefasLista">
                    {tarefasParaExibir.map((tarefa_da_vez) => (
                        <li key={tarefa_da_vez.id} className="tarefaItem"
                            onClick={() => {
                                if (tarefa_da_vez.id) {
                                    escolherAtualizar(tarefa_da_vez.id)
                                }}}
                            style={{
                                cursor: "pointer",
                                transition: "0.3s ease-in",
                                border: idAtivo === tarefa_da_vez.id ? "2px solid white" : "2px solid transparent"
                            }}
                        >
                            <div className="itemFormater"><strong>Título: </strong><p>{tarefa_da_vez.titulo}</p></div>
                            <div className="itemFormater"><strong>Descrição: </strong><p>{tarefa_da_vez.descricao}</p></div>
                            <div className="itemFormater"><strong>Status: </strong><p>{tarefa_da_vez.concluida == false ? "Tarefa não concluída" : "Tarefa concluída"}</p></div>
                            <div className="itemFormater"><strong>Criada em: </strong><p>{new Date(tarefa_da_vez.criada_em!).toLocaleDateString("pt-BR")}</p></div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ListaTarefas;