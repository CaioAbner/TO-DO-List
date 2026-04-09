import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import FormTarefas from "../components/FormTarefas";
import FormAtualizarTarefas from "../components/FormAtualizarTarefas";

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/cadastrar" element={<FormTarefas/>}></Route>
        <Route path="/atualizar/:id" element={<FormAtualizarTarefas/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;