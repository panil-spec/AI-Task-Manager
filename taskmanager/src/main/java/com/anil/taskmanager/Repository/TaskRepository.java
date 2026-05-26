package com.anil.taskmanager.Repository;

import com.anil.taskmanager.Entity.Task;
import com.anil.taskmanager.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser(User user);
}