package com.example.To_Do_App.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JWTService {
    private final SecretKey secretKey;

    public JWTService() {
        try{
            SecretKey key = KeyGenerator.getInstance("HmacSHA256").generateKey();
            secretKey = Keys.hmacShaKeyFor(key.getEncoded());
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }


    public String getUsername(String token){
        try{
            return Jwts
                    .parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        }catch(Exception e){
            return null;
        }
    }

    public String generateToken(String username) {
        try{
            return Jwts.builder()
                    .subject(username)
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))
                    .signWith(secretKey)
                    .compact();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
