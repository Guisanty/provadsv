import { Categoria } from "./categoria.models";

export interface Tarefa{
    tarefaId? : number;
    titulo : string;
    descricao : string;
    criadoEm ?: string;
    categoria ?: string;
    categoriaId : number;
    status : string;
}