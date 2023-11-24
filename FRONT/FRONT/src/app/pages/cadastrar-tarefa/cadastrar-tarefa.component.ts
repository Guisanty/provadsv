import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.models";
import { Tarefa } from "src/app/models/tarefa.models";

@Component({
  selector: "app-cadastrar-tarefa",
  templateUrl: "./cadastrar-tarefa.component.html",
  styleUrls: ["./cadastrar-tarefa.component.css"],
})
export class CadastrarTarefaComponent {
  titulo: string = "";
  descricao: string = "";
  categoriaId: number = 0;
  categorias: Categoria[] = [];
  status: string = "";

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.client
      .get<Categoria[]>("https://localhost:7083/api/categoria/listar")
      .subscribe({
        //A requição funcionou
        next: (categorias) => {
          this.categorias = categorias;
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  cadastrar(): void {
    let tarefa: Tarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      categoriaId: this.categoriaId,
      status: this.status,
    };

    this.client
      .post<Tarefa>("https://localhost:7083/api/tarefa/cadastrar", tarefa)
      .subscribe({
        //A requição funcionou
        next: (tarefa) => {
          this.snackBar.open("Tarefa cadastrado com sucesso!!", "E-commerce", {
            duration: 1500,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/tarefa/listar"]);
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
        },
      });
  }
}
