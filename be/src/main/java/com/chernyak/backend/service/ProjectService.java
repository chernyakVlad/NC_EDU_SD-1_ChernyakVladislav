package com.chernyak.backend.service;

import com.chernyak.backend.entity.Project;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    Optional<Project> getProjectById(Long id);
    Optional<Project> getProjectByCode(String code);
    Page<Project> getAllProjects(int page, int count, String sort, String order);
    Project saveProject(Project project);
    void deleteProject(Long id);
}
