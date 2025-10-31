package com.example.To_Do_App.service;

import com.example.To_Do_App.dto.ToDoDTO;
import com.example.To_Do_App.model.ToDo;
import com.example.To_Do_App.repo.ToDoRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.MappingException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

public class ToDoService {
    @Autowired
    private ToDoRepo toDoRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<ToDoDTO> getAllToDos(){
        try{
            List<ToDo> toDoList = toDoRepo.findAll();

            if(toDoList.isEmpty()){
                return Collections.emptyList();
            }

            return modelMapper.map(toDoList ,new TypeToken<List<ToDoDTO>>() {}.getType());

        }catch (DataAccessException e) {
            // Catches database-related errors
            throw new RuntimeException("Database error occurred while fetching users", e);
        } catch (MappingException e) {
            // Catches mapping-related errors
            throw new RuntimeException("Error occurred while mapping User to UserDTO", e);
        } catch (Exception e) {
            // Catch-all for unexpected exceptions
            throw new RuntimeException("Unexpected error occurred while retrieving users", e);
        }
    }

    public ToDoDTO getTodo(long id){
        ToDo toDo = toDoRepo.findById(id)
                .orElseThrow(()->new RuntimeException("ToDo not found id: "+id));
        return modelMapper.map(toDo, ToDoDTO.class);

    }

    public ToDoDTO saveToDo(ToDoDTO toDoDTO){
        ToDo toDo = modelMapper.map(toDoDTO, ToDo.class);
        ToDo savedToDo = toDoRepo.save(toDo);
        return modelMapper.map(savedToDo, ToDoDTO.class);
    }

    public ToDoDTO updateToDo(long id , ToDoDTO toDoDTO){
        Optional<ToDo> optionalToDo = toDoRepo.findById(id);
        if(optionalToDo.isPresent()){
            ToDo existingToDo = optionalToDo.get();
            existingToDo.setTitle(toDoDTO.getTitle());
            existingToDo.setDescription(toDoDTO.getDescription());
            existingToDo.setPriority(toDoDTO.getPriority());
            existingToDo.setDueDate(toDoDTO.getDueDate());
            existingToDo.setStatus(toDoDTO.getStatus());
            return modelMapper.map(existingToDo, ToDoDTO.class);
        }else{
            throw new RuntimeException("ToDo not found id "+id);
        }
    }

    public String deleteToDo(long id){
        if(toDoRepo.existsById(id)){
            toDoRepo.deleteById(id);
            return "Todo deleted successfully";
        }else {
            return "Todo not found with id:" + id;
        }
    }
}
