package com.chernyak.backend.dto;

import com.chernyak.backend.entity.Project;
import com.chernyak.backend.entity.Role;
import com.chernyak.backend.entity.Task;
import com.chernyak.backend.entity.User;
import com.chernyak.backend.entity.enums.TaskPriority;
import com.chernyak.backend.entity.enums.TaskStatus;
import com.chernyak.backend.repository.ProjectRepository;
import com.chernyak.backend.repository.RoleRepository;
import com.chernyak.backend.repository.TaskRepository;
import com.chernyak.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DtoConverter {

    private UserRepository userRepository;
    private ProjectRepository projectRepository;
    private RoleRepository roleRepository;
    private TaskRepository taskRepository;


    @Autowired
    public DtoConverter(UserRepository userRepository,
                        ProjectRepository projectRepository,
                        RoleRepository roleRepository,
                        TaskRepository taskRepository) {

        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.roleRepository = roleRepository;
        this.taskRepository = taskRepository;
    }

    public Project toProject(ProjectDto projectDto){
        Project project = new Project();
        project.setId(projectDto.getId());
        project.setProjectCode(projectDto.getProjectCode());
        project.setSummary(projectDto.getSummary());
        project.setManager(userRepository.findByUsername(projectDto.getManager()));

        return project;
    }

    public ProjectDto fromProject(Project project){
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(project.getId());
        projectDto.setProjectCode(project.getProjectCode());
        projectDto.setSummary(project.getSummary());
        projectDto.setManager(project.getManager().getUsername());

        return projectDto;
    }

    public User toUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        List<Role> roles = new ArrayList<Role>();
        roles.add(roleRepository.findByName(userDto.getRole()));
        user.setRoles(roles);
        return user;
    }

    public UserDto fromUser(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(user.getRoles().get(0).getName());
        return userDto;
    }

    public TaskDto fromTask(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setId(task.getId());
        taskDto.setProjectId(task.getProjectId().getId().toString());
        taskDto.setTicketCode("Code-XXX");
        taskDto.setAssignee(task.getAssigneeId().getUsername());
        taskDto.setReporter(task.getReporterId().getUsername());
        taskDto.setPriority(task.getPriority().name());
        taskDto.setTaskStatus(task.getTaskStatus().name());
        taskDto.setDueDate(task.getDueDate().toString());
        taskDto.setEstimation(task.getEstimation().toString());
        taskDto.setDescription(task.getDescription());
        taskDto.setTitle(task.getTitle());
        return taskDto;
    }

    public Task toTask(TaskDto taskDto) {
        Task task = new Task();
        task.setProjectId(projectRepository.findById(Long.parseLong(taskDto.getProjectId())).orElse(null));
        task.setId(taskDto.getId());
        task.setTicketCode(taskDto.getTicketCode());
        task.setAssigneeId(userRepository.findByUsername(taskDto.getAssignee()));
        task.setReporterId(userRepository.findByUsername(taskDto.getReporter()));
        task.setPriority(TaskPriority.valueOf(taskDto.getPriority()));
        task.setTaskStatus(TaskStatus.valueOf(taskDto.getTaskStatus()));
        task.setDueDate(Long.parseLong(taskDto.getDueDate()));
        task.setEstimation(Long.parseLong(taskDto.getEstimation()));
        task.setDescription(taskDto.getDescription());
        task.setTitle(taskDto.getTitle());
        return task;
    }


}