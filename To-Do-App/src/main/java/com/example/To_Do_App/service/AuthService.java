package com.example.To_Do_App.service;

import com.example.To_Do_App.model.UserModel;
import com.example.To_Do_App.repo.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserModel> getAllUsers(){
        return userRepo.findAll();
    }

    public UserModel createUser(UserModel userData){
        UserModel newUser = new UserModel(
                userData.getUsername() ,
                passwordEncoder.encode(userData.getPassword()),
                userData.getEmail(),
                userData.getRole()
        );
        return userRepo.save(newUser);
    }
}
