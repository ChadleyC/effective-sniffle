using TaskManager.Api.DTOs;

namespace TaskManager.Api.Services;

public interface ITaskService
{
    IEnumerable<TaskDto> GetByProject(int projectId);
    TaskDto GetById(int id);
    TaskDto Create(CreateTaskDto dto);
    void UpdateStatus(int id, string status);
    void Delete(int id);
}