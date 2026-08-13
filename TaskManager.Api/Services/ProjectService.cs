using System.Security.Claims;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;


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
            OwnerId = p.OwnerId,
            CreatedAt = p.CreatedAt
        }).ToList();
    }

    public ProjectDto? GetById(int id)
    {
        var project = _context.Projects.Find(id);
        return project == null ? null : MapToDto(project);
    }

    public ProjectDto Create(CreateProjectDto dto)
    {
        var ownerId = int.Parse(
            _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0"
        );

        var project = new Project
        {
            Name = dto.Name,
            Description = dto.Description,
            OwnerId = ownerId,
            CreatedAt = DateTime.UtcNow,
        };

        _context.Projects.Add(project);
        _context.SaveChanges();

        return MapToDto(project);
    }

    public ProjectDto? Update(int id, UpdateProjectDto dto)
    {
        var project = _context.Projects.Find(id);
        if (project == null) return null;

        project.Name = dto.Name;
        project.Description = dto.Description;
        _context.Projects.Update(project);
        _context.SaveChanges();

        return MapToDto(project);
    }

    public void Delete(int id)
    {
        var project = _context.Projects.Find(id);
        if (project == null) return;

        _context.Projects.Remove(project);
        _context.SaveChanges();
    }

    private static ProjectDto MapToDto(Project project) => new()
    {
        Id = project.Id,
        Name = project.Name,
        Description = project.Description,
        OwnerId = project.OwnerId,
        CreatedAt = project.CreatedAt
    };
}
