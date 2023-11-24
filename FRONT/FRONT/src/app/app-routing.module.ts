import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListarTarefaComponent } from "../app/pages/listar-tarefa/listar-tarefa.component";
import { CadastrarTarefaComponent } from "../app/pages/cadastrar-tarefa/cadastrar-tarefa.component";
import { AlterarTarefaComponent } from "../app/pages/alterar-tarefa/alterar-tarefa.component";




const routes: Routes = [
  {
    path: "",
    component: ListarTarefaComponent,
  },
  {
    path: "pages/tarefa/listar",
    component: ListarTarefaComponent,
  },
  {
    path: "pages/tarefa/cadastrar",
    component: CadastrarTarefaComponent,
  },
  {
    path: "pages/tarefa/alterar/:id",
    component: AlterarTarefaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
