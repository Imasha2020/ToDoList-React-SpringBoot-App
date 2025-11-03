package com.example.To_Do_App.repo;

import com.example.To_Do_App.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
