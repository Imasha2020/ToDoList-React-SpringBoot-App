package com.example.To_Do_App.controller;

import com.example.To_Do_App.model.UserModel;
import com.example.To_Do_App.repo.UserRepo;
import com.example.To_Do_App.service.AuthService;
import com.example.To_Do_App.service.JWTService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")

public class AuthContoller {
    private final JWTService jwtService;
    private final AuthService authService;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthContoller(JWTService jwtService, AuthService authService, UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.authService = authService;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserModel> getAllUsers(){
        return authService.getAllUsers();
    }

    @PostMapping("/register")
    public UserModel createUser(@RequestBody UserModel userdata){
        userdata.setPassword(passwordEncoder.encode(userdata.getPassword()));
        return userRepo.save(userdata);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserModel data){
        UserModel user = userRepo.findByUsername(data.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(data.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getUsername());
        Map<String,String> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("role", String.valueOf(user.getRole()));   // e.g. "ADMIN" or "USER"
        return resp;
    }

}
