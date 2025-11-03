package com.example.To_Do_App.controller;

import com.example.To_Do_App.dto.ToDoDTO;
import com.example.To_Do_App.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping(value = "api/v1")

public class ToDoController {
    @Autowired
    private ToDoService toDoService;

    @GetMapping("/todos")
    private List<ToDoDTO> getToDos(){
        return toDoService.getAllToDos();
    }

    @GetMapping("/todos/{id}")
    public ToDoDTO getToDo(@PathVariable long id){
        return toDoService.getTodo(id);
    }

    @PostMapping("/todos")
    public ToDoDTO saveToDo(@RequestBody ToDoDTO toDoDTO){
        return toDoService.saveToDo(toDoDTO);
    }

    @PutMapping("/todos/{id}")
    public ToDoDTO updateToDo(@PathVariable long id , @RequestBody ToDoDTO toDoDTO){
        return toDoService.updateToDo(id, toDoDTO);
    }

    @DeleteMapping("/todos/{id}")
    public String deleteToDo(@PathVariable long id){
        return toDoService.deleteToDo(id);
    }
}
