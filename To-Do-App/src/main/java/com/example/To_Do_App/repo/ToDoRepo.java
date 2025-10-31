package com.example.To_Do_App.repo;

import com.example.To_Do_App.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToDoRepo extends JpaRepository<ToDo , Long> {

}
