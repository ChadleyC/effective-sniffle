using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Services;

namespace TaskManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        // Inject IProjectService here

        // [HttpGet]
        // public IActionResult GetAll() { ... }

        // [HttpPost]
        // public IActionResult Create(ProjectDto dto) { ... }
    }
}
