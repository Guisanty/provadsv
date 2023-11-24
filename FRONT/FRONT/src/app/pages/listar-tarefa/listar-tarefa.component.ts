import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Tarefa } from "src/app/models/tarefa.models";

@Component({
  selector: "app-listar-tarefa",
  templateUrl: "./listar-tarefa.component.html",
  styleUrls: ["./listar-tarefa.component.css"],
})
export class ListarTarefaComponent {
  colunasTabela: string[] = [
    "id",
    "titulo",
    "descricao",
    "criadoEm",
    "categoria",
    "status",
    "deletar",
    "alterar",
  ];

  tarefas: Tarefa[] = [];

  constructor(private client: HttpClient, private snackBar: MatSnackBar) {}

  //Método que é executado ao abrir um componente
  ngOnInit(): void {
    this.client
      .get<Tarefa[]>("https://localhost:7083/api/tarefa/listar")
      .subscribe({
        //A requição funcionou
        next: (tarefas) => {
          this.tarefas = tarefas;
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  deletar(tarefaId: number) {
    this.client
      .delete<Tarefa[]>(
        `https://localhost:7083/api/tarefa/deletar/${tarefaId}`
      )
      .subscribe({
        //Requisição com sucesso
        next: (tarefas) => {
          this.tarefas = tarefas;
          this.snackBar.open("Tarefa deletada com sucesso!!", "E-commerce", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        },
        //Requisição com erro
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
