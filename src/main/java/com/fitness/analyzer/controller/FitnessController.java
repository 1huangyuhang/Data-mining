package com.fitness.analyzer.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitness.analyzer.model.Fitness;
import com.fitness.analyzer.service.FitnessService;

/**
 * 健身数据控制器
 * 提供 RESTful API 接口
 */
@RestController
@RequestMapping("/v1/fitness")
public class FitnessController {
    
    @Autowired
    private FitnessService fitnessService;
    
    /**
     * 保存健身数据
     */
    @PostMapping
    public ResponseEntity<Fitness> saveFitness(@RequestBody Fitness fitness) {
        Fitness savedFitness = fitnessService.saveFitness(fitness);
        return new ResponseEntity<>(savedFitness, HttpStatus.CREATED);
    }
    
    /**
     * 根据ID查询健身数据
     */
    @GetMapping("/{id}")
    public ResponseEntity<Fitness> getFitnessById(@PathVariable Long id) {
        Optional<Fitness> fitness = fitnessService.getFitnessById(id);
        return fitness.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    /**
     * 查询所有健身数据
     */
    @GetMapping
    public ResponseEntity<List<Fitness>> getAllFitness() {
        List<Fitness> fitnessList = fitnessService.getAllFitness();
        return ResponseEntity.ok(fitnessList);
    }
    
    /**
     * 根据用户ID查询健身数据
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Fitness>> getFitnessByUserId(@PathVariable String userId) {
        List<Fitness> fitnessList = fitnessService.getFitnessByUserId(userId);
        return ResponseEntity.ok(fitnessList);
    }
    
    /**
     * 根据活动类型查询健身数据
     */
    @GetMapping("/activity/{activityType}")
    public ResponseEntity<List<Fitness>> getFitnessByActivityType(@PathVariable String activityType) {
        List<Fitness> fitnessList = fitnessService.getFitnessByActivityType(activityType);
        return ResponseEntity.ok(fitnessList);
    }
    
    /**
     * 查询指定时间范围内的健身数据
     */
    @GetMapping("/time-range")
    public ResponseEntity<List<Fitness>> getFitnessByTimeRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<Fitness> fitnessList = fitnessService.getFitnessByTimeRange(start, end);
        return ResponseEntity.ok(fitnessList);
    }
    
    /**
     * 查询用户在指定时间范围内的健身数据
     */
    @GetMapping("/user/{userId}/time-range")
    public ResponseEntity<List<Fitness>> getFitnessByUserIdAndTimeRange(
            @PathVariable String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<Fitness> fitnessList = fitnessService.getFitnessByUserIdAndTimeRange(userId, start, end);
        return ResponseEntity.ok(fitnessList);
    }
    
    /**
     * 删除健身数据
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFitness(@PathVariable Long id) {
        fitnessService.deleteFitness(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * 获取用户的健身统计数据
     */
    @GetMapping("/user/{userId}/stats")
    public ResponseEntity<Object> getUserStats(@PathVariable String userId) {
        long count = fitnessService.countFitnessByUserId(userId);
        Integer totalDuration = fitnessService.sumDurationByUserId(userId);
        Integer totalCalories = fitnessService.sumCaloriesByUserId(userId);
        Double totalDistance = fitnessService.sumDistanceByUserId(userId);
        
        // 构建统计结果
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("userId", userId);
        stats.put("totalActivities", count);
        stats.put("totalDuration", totalDuration);
        stats.put("totalCalories", totalCalories);
        stats.put("totalDistance", totalDistance);
        
        return ResponseEntity.ok(stats);
    }
    
    /**
     * 获取所有唯一的用户ID列表
     */
    @GetMapping("/users")
    public ResponseEntity<List<String>> getAllUserIds() {
        List<String> userIds = fitnessService.getAllUserIds();
        return ResponseEntity.ok(userIds);
    }
}