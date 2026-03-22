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

    // POST /api/projects
    [HttpPost]
    public IActionResult Create(CreateProjectDto dto)
    {
        var ownerId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var project = _projectService.Create(dto, ownerId);

        return Ok(project);
    }
}
