package com.example.To_Do_App.filter;

import com.example.To_Do_App.model.UserModel;
import com.example.To_Do_App.repo.UserRepo;
import com.example.To_Do_App.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final UserRepo userRepo;

    public JWTFilter(JWTService jwtService, UserRepo userRepo) {
        this.jwtService = jwtService;
        this.userRepo = userRepo;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull  HttpServletResponse response,@NonNull FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if(authorization == null || !authorization.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        };
        if(!authorization.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String jwt_token = authorization.split(" ")[1];
        String username = jwtService.getUsername(jwt_token);
        if(username==null) {
            filterChain.doFilter(request, response);
            return;
        }

        UserModel userModelData = userRepo.findByUsername(username).orElse(null);
        if(userModelData ==null) {
            filterChain.doFilter(request, response);
            return;
        }

        if(SecurityContextHolder.getContext().getAuthentication()!=null) {
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = User.builder()
                .username(userModelData.getUsername())
                .password(userModelData.getPassword())
                .roles(userModelData.getRole().name().replace("ROLE_", ""))
                .build();

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails , null ,userDetails.getAuthorities());
        token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(token);
        System.out.println(jwt_token);
        filterChain.doFilter(request, response);
    }
}
