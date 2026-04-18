using TaskManager.Api.DTOs;

namespace TaskManager.Api.Services;

public interface IProjectService
{
    IEnumerable<ProjectDto> GetAll();
    ProjectDto Create(CreateProjectDto dto);
}
