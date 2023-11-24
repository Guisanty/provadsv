using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers;

[Route("api/tarefa")]
[ApiController]
public class TarefaController : ControllerBase
{
    private readonly AppDataContext _context;

    public TarefaController(AppDataContext context) =>
        _context = context;

    // GET: api/tarefa/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Tarefa> tarefas = _context.Tarefas.Include(x => x.Categoria).ToList();
            return Ok(tarefas);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: api/tarefa/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Tarefa tarefa)
    {
        try
        {
            Categoria? categoria = _context.Categorias.Find(tarefa.CategoriaId);
            if (categoria == null)
            {
                return NotFound();
            }
            tarefa.Categoria = categoria;
            _context.Tarefas.Add(tarefa);
            _context.SaveChanges();
            return Created("", tarefa);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //tentando implementar oq falta::

    [HttpPatch]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id, [FromBody] Tarefa tarefa)
    {
    try
    {
        Tarefa tarefaCadastrado = _context.Tarefas.FirstOrDefault(x => x.TarefaId == id);

        if (tarefaCadastrado != null)
        {
            Categoria categoria = _context.Categorias.Find(tarefa.CategoriaId);

            if (categoria == null)
            {
                return NotFound("Categoria não encontrada");
            }

            // Atualizar propriedades da tarefa
            tarefaCadastrado.Categoria = categoria;
            tarefaCadastrado.Titulo = tarefa.Titulo;
            tarefaCadastrado.Descricao = tarefa.Descricao;

            // Verificar e atualizar o status
            if (tarefaCadastrado.Status == "Não iniciada")
            {
                tarefaCadastrado.Status = "Em andamento";
            }
            else if (tarefaCadastrado.Status == "Em andamento")
            {
                tarefaCadastrado.Status = "Concluída";
            }

            _context.Tarefas.Update(tarefaCadastrado);
            _context.SaveChanges();

            return Ok();
        }

        return NotFound("Tarefa não encontrada");
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}

    [HttpGet]
    [Route("naoconcluidas")]
    public IActionResult Naoconcluidas()
    
    {
    try
    {
        List<Tarefa> tarefas = _context.Tarefas
            .Include(x => x.Categoria)
            .Where(x => x.Status == "Não iniciada" || x.Status == "Em andamento")
            .ToList();

        return Ok(tarefas);
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
    }

    [HttpGet]
    [Route("concluidas")]
    public IActionResult Concluidas()
    
    {
    try
    {
        // Filtrar apenas as tarefas com o status "naoconcluidas"
        List<Tarefa> tarefas = _context.Tarefas
            .Include(x => x.Categoria)
            .Where(x => x.Status == "Concluída")
            .ToList();

        return Ok(tarefas);
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
    }
}
