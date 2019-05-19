package com.chernyak.backend.service.impl;

import com.chernyak.backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private HttpServletRequest request;

    @Override
    public Resource loadFileAsResource(String fileName, Path path) {
        try {
            Path filePath = path.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

    public List<String> allFiles(String taskId, String projectId) {
        String uploadsDir = "./files/" + projectId + "/" + taskId + "/";
        Path path = Paths.get(uploadsDir);
        File folder = new File(path.toUri());
        final String[] list = folder.list();
        List<String> test =  Arrays.stream(list)
                .map(file->loadFileAsResource(file, path))
                .map(Resource::getFilename)
                .collect(Collectors.toList());
        return  test;
    }

    @Override
    public void saveFile(MultipartFile file, String taskId, String projectId) throws IOException {
        String uploadsDir = "./files/" + projectId + "/" + taskId + "/";


        if(! new File(uploadsDir).exists()){
            try{
                new File(uploadsDir).mkdirs();
            }
            catch(SecurityException se){
                //handle it
            }
        }

        String filePath = uploadsDir + file.getOriginalFilename();
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());
    }
}
