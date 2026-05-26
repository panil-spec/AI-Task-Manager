package com.anil.taskmanager.Controller;

import com.anil.taskmanager.DTO.AiRequest;
import com.anil.taskmanager.Service.AiService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiService aiService;

    @PostMapping("/generate")
    public Map<String, String> generateTask(
            @RequestBody AiRequest request
    ) {

        return aiService.generateTaskDetails(
                request.getTitle()
        );
    }
}