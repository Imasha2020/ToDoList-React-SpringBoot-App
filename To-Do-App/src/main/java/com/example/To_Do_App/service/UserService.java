package com.example.To_Do_App.service;

import com.example.To_Do_App.dto.UserDTO;
import com.example.To_Do_App.model.UserModel;
import com.example.To_Do_App.repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired private UserRepo userRepo;
    @Autowired private ModelMapper modelMapper;
    @Autowired private PasswordEncoder passwordEncoder;

    public UserDTO registerUser(UserModel userModel) {
        // check exist
        if (userRepo.existsByUsername(userModel.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepo.existsByEmail(userModel.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        // hash password
        userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
        if (userModel.getRole() == null) userModel.setRole(UserModel.Role.ROLE_USER); // default
        UserModel saved = userRepo.save(userModel);
        UserDTO dto = modelMapper.map(saved, UserDTO.class);
        dto.setRole(saved.getRole().name());
        return dto;
    }

    public UserModel findByUsername(String username) {
        return (UserModel) userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("UserModel not found"));
    }
}
