package com.example.To_Do_App.dto;

import com.example.To_Do_App.model.ToDo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ToDoDTO {
    private Long id;

    private String title;

    private String description;

    private LocalDate dueDate;

    private ToDo.Priority priority;

    private ToDo.Status status;

    private Long userId; // reference to the owner

}
