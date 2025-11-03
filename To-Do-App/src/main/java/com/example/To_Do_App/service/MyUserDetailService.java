package com.example.To_Do_App.service;

import com.example.To_Do_App.model.UserModel;
import com.example.To_Do_App.repo.UserRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyUserDetailService implements UserDetailsService {

    private final UserRepo userRepo;

    public MyUserDetailService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModelData = userRepo.findByUsername(username).orElse(null);
        if(userModelData == null) throw new UsernameNotFoundException("user not found");
        UserDetails user = User.builder()
                .username(userModelData.getUsername())
                .password(userModelData.getPassword())
                .build();
        return user;
    }
}
