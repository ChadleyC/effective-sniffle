using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Services;

namespace TaskManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        // Inject ITaskService here

        // [HttpGet]
        // public IActionResult GetAll() { ... }

        // [HttpPost]
        // public IActionResult Create(TaskDto dto) { ... }
    }
}
