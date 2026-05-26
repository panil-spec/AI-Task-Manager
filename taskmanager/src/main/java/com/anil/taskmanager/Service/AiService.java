package com.anil.taskmanager.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    @Value("${groq.api.key}")
    private String apiKey;

    public Map<String, String> generateTaskDetails(String title) {

        Map<String, String> result = new HashMap<>();

        try {

            RestTemplate restTemplate = new RestTemplate();

            String prompt = """
                    Generate:
                    1. Task Description
                    2. Priority
                    3. Estimated Time

                    Task Title:
                    """ + title;

            HttpHeaders headers = new HttpHeaders();

            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> message = Map.of(
                    "role", "user",
                    "content", prompt
            );

            Map<String, Object> requestBody = new HashMap<>();

            requestBody.put("model", "llama-3.3-70b-versatile");
            requestBody.put("messages", List.of(message));

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            String url =
                    "https://api.groq.com/openai/v1/chat/completions";

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            Map.class
                    );

            List choices =
                    (List) response.getBody().get("choices");

            Map choice =
                    (Map) choices.get(0);

            Map messageResponse =
                    (Map) choice.get("message");

            String aiText =
                    messageResponse.get("content").toString();

            result.put("taskTitle", title);
            result.put("aiResponse", aiText);

            return result;

        } catch (Exception e) {

            result.put("error", e.getMessage());

            return result;
        }
    }
}