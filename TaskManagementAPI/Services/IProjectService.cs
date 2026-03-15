using TaskManagementAPI.DTOs;

namespace TaskManagementAPI.Services;

public interface IProjectService
{
    IEnumerable<ProjectDto> GetAll();
    ProjectDto Create(CreateProjectDto dto, int ownerId);
}
