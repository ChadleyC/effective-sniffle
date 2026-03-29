using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;
using System.Security.Claims;

namespace TaskManager.Api.Services;

public class ProjectService : IProjectService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ApplicationDbContext _context;


    public ProjectService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public IEnumerable<ProjectDto> GetAll()
    {
        return _context.Projects.Select(p => new ProjectDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            CreatedAt = p.CreatedAt
        }).ToList();
    }

    public ProjectDto Create(CreateProjectDto dto, int ownerId)
    {
        throw new NotImplementedException();
    }

    public ProjectDto Create(CreateProjectDto dto)
    {
        var project = new Project
        {
            Name = dto.Name,
            Description = dto.Description,
            OwnerId = dto.OwnerId,
            CreatedAt = DateTime.UtcNow,
            TaskItem = null
        };

        _context.Projects.Add(project);
        _context.SaveChanges();

        return new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            CreatedAt = project.CreatedAt
        };
    }
}
