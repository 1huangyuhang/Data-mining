package com.fitness.analyzer.service;

import com.fitness.analyzer.model.Fitness;
import com.fitness.analyzer.repository.FitnessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 健身数据服务类
 * 处理健身数据的业务逻辑
 */
@Service
public class FitnessService {
    
    @Autowired
    private FitnessRepository fitnessRepository;
    
    /**
     * 保存健身数据
     */
    public Fitness saveFitness(Fitness fitness) {
        return fitnessRepository.save(fitness);
    }
    
    /**
     * 根据ID查询健身数据
     */
    public Optional<Fitness> getFitnessById(Long id) {
        return fitnessRepository.findById(id);
    }
    
    /**
     * 查询所有健身数据
     */
    public List<Fitness> getAllFitness() {
        return fitnessRepository.findAll();
    }
    
    /**
     * 根据用户ID查询健身数据
     */
    public List<Fitness> getFitnessByUserId(String userId) {
        return fitnessRepository.findByUserId(userId);
    }
    
    /**
     * 根据活动类型查询健身数据
     */
    public List<Fitness> getFitnessByActivityType(String activityType) {
        return fitnessRepository.findByActivityType(activityType);
    }
    
    /**
     * 查询指定时间范围内的健身数据
     */
    public List<Fitness> getFitnessByTimeRange(LocalDateTime start, LocalDateTime end) {
        return fitnessRepository.findByTimestampBetween(start, end);
    }
    
    /**
     * 查询用户在指定时间范围内的健身数据
     */
    public List<Fitness> getFitnessByUserIdAndTimeRange(String userId, LocalDateTime start, LocalDateTime end) {
        return fitnessRepository.findByUserIdAndTimestampBetween(userId, start, end);
    }
    
    /**
     * 删除健身数据
     */
    public void deleteFitness(Long id) {
        fitnessRepository.deleteById(id);
    }
    
    /**
     * 统计用户的总活动次数
     */
    public long countFitnessByUserId(String userId) {
        return fitnessRepository.countByUserId(userId);
    }
    
    /**
     * 统计用户的总活动时长
     */
    public Integer sumDurationByUserId(String userId) {
        return fitnessRepository.sumDurationByUserId(userId);
    }
    
    /**
     * 统计用户的总消耗卡路里
     */
    public Integer sumCaloriesByUserId(String userId) {
        return fitnessRepository.sumCaloriesByUserId(userId);
    }
    
    /**
     * 统计用户的总距离
     */
    public Double sumDistanceByUserId(String userId) {
        return fitnessRepository.sumDistanceByUserId(userId);
    }
    
    /**
     * 获取所有唯一的用户ID
     */
    public List<String> getAllUserIds() {
        return fitnessRepository.findAllUniqueUserIds();
    }
}