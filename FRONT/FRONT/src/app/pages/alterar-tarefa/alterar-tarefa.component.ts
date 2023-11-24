import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "src/app/models/categoria.models";
import { Tarefa } from "src/app/models/tarefa.models";

@Component({
  selector: "app-alterar-tarefa",
  templateUrl: "./alterar-tarefa.component.html",
  styleUrls: ["./alterar-tarefa.component.css"],
})
export class AlterarTarefaComponent {
  tarefaId: number = 0;
  titulo: string = "";
  descricao: string = "";
  categoriaId: number = 0;
  categorias: Categoria[] = [];
  status: string = "";

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parametros) => {
        let { id } = parametros;
        this.client.get<Tarefa>(`https://localhost:7083/api/tarefa/buscar/${id}`).subscribe({
          next: (tarefa) => {
            this.client.get<Categoria[]>("https://localhost:7083/api/categoria/listar").subscribe({
              next: (categorias) => {
                this.categorias = categorias;

                this.tarefaId = tarefa.tarefaId!;
                this.titulo = tarefa.titulo;
                this.descricao = tarefa.descricao;
                this.categoriaId = tarefa.categoriaId;
                this.status = tarefa.status;
              },
              error: (erro) => {
                console.log(erro);
              },
            });
          },
          //Requisição com erro
          error: (erro) => {
            console.log(erro);
          },
        });
      },
    });
  }

  alterar(): void {
    let tarefa: Tarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      categoriaId: this.categoriaId,
      status: this.status,
    };

    console.log(tarefa);

    this.client.put<Tarefa>(`https://localhost:7083/api/tarefa/alterar/${this.tarefaId}`, tarefa).subscribe({
      //A requição funcionou
      next: (tarefa) => {
        this.snackBar.open("Tarefa alterado com sucesso!!", "E-commerce", {
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
