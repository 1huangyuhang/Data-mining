#!/usr/bin/env python3
"""
数据导入脚本
将健身数据从 CSV 文件导入到 PostgreSQL 数据库
"""

import csv
import psycopg2
from datetime import datetime

# 数据库连接参数
DB_PARAMS = {
    'host': 'localhost',
    'database': 'fitness_db',
    'user': 'huangyuhang',
    'port': '5432'
}

# CSV 文件路径
CSV_FILE = 'fitness_data.csv'

def create_table():
    """创建健身数据表"""
    conn = None
    try:
        # 连接数据库
        conn = psycopg2.connect(**DB_PARAMS)
        cur = conn.cursor()
        
        # 创建表
        create_table_query = '''
        CREATE TABLE IF NOT EXISTS fitness (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            activity_type VARCHAR(255) NOT NULL,
            duration INTEGER NOT NULL,
            calories_burned INTEGER NOT NULL,
            heart_rate INTEGER NOT NULL,
            distance DOUBLE PRECISION NOT NULL,
            timestamp TIMESTAMP NOT NULL
        )
        '''
        cur.execute(create_table_query)
        conn.commit()
        print("表创建成功")
        
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"创建表时出错: {error}")
    finally:
        if conn is not None:
            conn.close()

def import_data():
    """导入数据到数据库"""
    conn = None
    try:
        # 连接数据库
        conn = psycopg2.connect(**DB_PARAMS)
        cur = conn.cursor()
        
        # 读取 CSV 文件并导入数据
        with open(CSV_FILE, 'r', encoding='utf-8') as csvfile:
            csvreader = csv.DictReader(csvfile)
            count = 0
            
            for row in csvreader:
                # 准备插入语句
                insert_query = '''
                INSERT INTO fitness (user_id, activity_type, duration, calories_burned, heart_rate, distance, timestamp)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                '''
                
                # 转换数据类型 - 适配 CSV 文件的列名
                user_id = row['user_id']
                activity_type = row['activity']
                duration = int(float(row['duration_minutes']))  # 转换为整数分钟
                calories_burned = int(float(row['calories_burned']))  # 转换为整数
                heart_rate = int(row['heart_rate_avg'])  # 使用平均心率
                distance = float(row['distance_km'])
                # 组合日期和开始时间为完整的时间戳
                timestamp_str = f"{row['date']} {row['start_time']}"
                timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
                
                # 执行插入
                cur.execute(insert_query, (user_id, activity_type, duration, calories_burned, heart_rate, distance, timestamp))
                count += 1
            
            # 提交事务
            conn.commit()
            print(f"成功导入 {count} 条数据")
        
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"导入数据时出错: {error}")
    finally:
        if conn is not None:
            conn.close()

def main():
    """主函数"""
    print("开始导入健身数据...")
    create_table()
    import_data()
    print("数据导入完成！")

if __name__ == "__main__":
    main()