using TaskManager.Api.DTOs;

namespace TaskManager.Api.Services;

public interface IProjectService
{
    IEnumerable<ProjectDto> GetAll();
    ProjectDto? GetById(int id);
    ProjectDto Create(CreateProjectDto dto);
    ProjectDto? Update(int id, UpdateProjectDto dto);
    void Delete(int id);
}
