using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.DTOs;
using TaskManager.Api.Services;

namespace TaskManager.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    // GET /api/projects
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_projectService.GetAll());
    }

    // GET /api/projects/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var project = _projectService.GetById(id);
        return project == null ? NotFound() : Ok(project);
    }

    // POST /api/projects
    [HttpPost]
    public IActionResult Create(CreateProjectDto dto)
    {
        var ownerId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var project = _projectService.Create(dto);

        return Ok(project);
    }

    // PUT /api/projects/5
    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateProjectDto dto)
    {
        var project = _projectService.Update(id, dto);
        return project == null ? NotFound() : Ok(project);
    }

    // DELETE /api/projects/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _projectService.Delete(id);
        return Ok();
    }
}
