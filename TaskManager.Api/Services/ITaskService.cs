using TaskManager.Api.DTOs;
using TaskStatus = TaskManager.Api.Models.Enums.TaskStatus;

namespace TaskManager.Api.Services;

public interface ITaskService
{
    IEnumerable<TaskDto> GetByProject(int projectId);
    TaskDto? GetById(int id);
    TaskDto Create(CreateTaskDto dto);
    void UpdateStatus(int id, TaskStatus status);
    void Delete(int id);
}