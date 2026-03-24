package com.fitness.analyzer.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fitness.analyzer.model.Fitness;

/**
 * 健身数据仓库接口
 * 提供对健身数据的数据库操作方法
 */
public interface FitnessRepository extends JpaRepository<Fitness, Long> {
    
    /**
     * 根据用户ID查询健身记录
     */
    List<Fitness> findByUserId(String userId);
    
    /**
     * 根据活动类型查询健身记录
     */
    List<Fitness> findByActivityType(String activityType);
    
    /**
     * 查询指定时间范围内的健身记录
     */
    List<Fitness> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    
    /**
     * 查询用户在指定时间范围内的健身记录
     */
    List<Fitness> findByUserIdAndTimestampBetween(String userId, LocalDateTime start, LocalDateTime end);
    
    /**
     * 统计用户的总活动次数
     */
    long countByUserId(String userId);
    
    /**
     * 统计用户的总活动时长
     */
    @Query("SELECT SUM(f.duration) FROM Fitness f WHERE f.userId = :userId")
    Integer sumDurationByUserId(@Param("userId") String userId);
    
    /**
     * 统计用户的总消耗卡路里
     */
    @Query("SELECT SUM(f.caloriesBurned) FROM Fitness f WHERE f.userId = :userId")
    Integer sumCaloriesByUserId(@Param("userId") String userId);
    
    /**
     * 统计用户的总距离
     */
    @Query("SELECT SUM(f.distance) FROM Fitness f WHERE f.userId = :userId")
    Double sumDistanceByUserId(@Param("userId") String userId);
    
    /**
     * 获取所有唯一的用户ID
     */
    @Query("SELECT DISTINCT f.userId FROM Fitness f")
    List<String> findAllUniqueUserIds();
}