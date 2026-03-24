import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json

# 生成模拟运动数据
def generate_fitness_data():
    # 运动类型
    activities = ['Running', 'Cycling', 'Swimming', 'Walking', 'HIIT', 'Yoga']
    
    # 用户列表
    users = ['User1', 'User2', 'User3', 'User4', 'User5']
    
    # 生成数据的日期范围
    start_date = datetime(2024, 1, 1)
    end_date = datetime(2024, 3, 18)
    date_range = pd.date_range(start=start_date, end=end_date, freq='D')
    
    # 存储所有数据
    all_data = []
    
    for user in users:
        for date in date_range:
            # 每天可能进行0-2次运动
            num_activities = np.random.randint(0, 3)
            
            for _ in range(num_activities):
                activity = np.random.choice(activities)
                
                # 根据运动类型生成不同的指标
                if activity == 'Running':
                    distance = np.random.uniform(2, 10)  # 2-10公里
                    duration = distance * np.random.uniform(5, 8)  # 5-8分钟/公里
                    calories = distance * np.random.uniform(60, 80)  # 60-80卡路里/公里
                    heart_rate = np.random.randint(130, 160)  # 130-160 bpm
                elif activity == 'Cycling':
                    distance = np.random.uniform(5, 30)  # 5-30公里
                    duration = distance * np.random.uniform(2, 4)  # 2-4分钟/公里
                    calories = distance * np.random.uniform(30, 50)  # 30-50卡路里/公里
                    heart_rate = np.random.randint(120, 150)  # 120-150 bpm
                elif activity == 'Swimming':
                    distance = np.random.uniform(0.5, 2)  # 0.5-2公里
                    duration = distance * np.random.uniform(15, 25)  # 15-25分钟/公里
                    calories = distance * np.random.uniform(400, 600)  # 400-600卡路里/公里
                    heart_rate = np.random.randint(110, 140)  # 110-140 bpm
                elif activity == 'Walking':
                    distance = np.random.uniform(1, 5)  # 1-5公里
                    duration = distance * np.random.uniform(10, 15)  # 10-15分钟/公里
                    calories = distance * np.random.uniform(40, 60)  # 40-60卡路里/公里
                    heart_rate = np.random.randint(90, 120)  # 90-120 bpm
                elif activity == 'HIIT':
                    duration = np.random.uniform(15, 45)  # 15-45分钟
                    calories = duration * np.random.uniform(8, 12)  # 8-12卡路里/分钟
                    distance = 0  # HIIT通常不计算距离
                    heart_rate = np.random.randint(140, 170)  # 140-170 bpm
                else:  # Yoga
                    duration = np.random.uniform(30, 90)  # 30-90分钟
                    calories = duration * np.random.uniform(2, 4)  # 2-4卡路里/分钟
                    distance = 0  # 瑜伽不计算距离
                    heart_rate = np.random.randint(80, 110)  # 80-110 bpm
                
                # 生成开始时间
                start_hour = np.random.randint(6, 22)  # 6:00-22:00
                start_minute = np.random.randint(0, 60)
                start_time = datetime(date.year, date.month, date.day, start_hour, start_minute)
                
                # 生成结束时间
                end_time = start_time + timedelta(minutes=duration)
                
                # 添加到数据列表
                all_data.append({
                    'user_id': user,
                    'activity': activity,
                    'date': date.strftime('%Y-%m-%d'),
                    'start_time': start_time.strftime('%H:%M:%S'),
                    'end_time': end_time.strftime('%H:%M:%S'),
                    'duration_minutes': round(duration, 2),
                    'distance_km': round(distance, 2),
                    'calories_burned': round(calories, 2),
                    'heart_rate_avg': heart_rate,
                    'heart_rate_max': heart_rate + np.random.randint(5, 15),
                    'fatigue_level': np.random.randint(1, 6),  # 1-5
                    'satisfaction_level': np.random.randint(1, 6)  # 1-5
                })
    
    return all_data

# 生成数据
data = generate_fitness_data()

# 保存为CSV文件
df = pd.DataFrame(data)
df.to_csv('fitness_data.csv', index=False)

# 保存为JSON文件
with open('fitness_data.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"生成了 {len(data)} 条运动数据")
print("数据已保存为 fitness_data.csv 和 fitness_data.json")

# 显示前10条数据作为预览
print("\n前10条数据预览：")
print(df.head(10))
