package com.anil.taskmanager.Controller;

import com.anil.taskmanager.DTO.AuthResponse;
import com.anil.taskmanager.DTO.LoginRequest;
import com.anil.taskmanager.DTO.RegisterRequest;
import com.anil.taskmanager.Service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}