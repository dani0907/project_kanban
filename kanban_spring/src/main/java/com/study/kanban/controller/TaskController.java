package com.study.kanban.controller;
import com.study.kanban.entity.Task;
import com.study.kanban.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // 1. 이 클래스가 JSON 데이터를 주고받는 컨트롤러임을 선언
@CrossOrigin(origins = "http://localhost:5174")
public class TaskController {

    @Autowired // 2. 스프링이 아까 만든 Repository를 자동으로 연결해줍니다.
    private TaskRepository taskRepository;

    // 테스트용: 주소창에 /add?title=공부하기 라고 치면 저장됨
    @GetMapping("/add")
    public String addTask(@RequestParam String title) {
        Task newTask = new Task();
        newTask.setTitle(title);
        newTask.setStatus("TODO");

        taskRepository.save(newTask); // 3. DB에 저장!
        return "저장 성공: " + title;
    }

    // 저장된 모든 할 일 목록 보기
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll(); // 4. DB의 모든 데이터 가져오기
    }
}