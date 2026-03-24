#!/bin/bash

# 启动脚本 - 一键启动后端、前端和 fitai-decision 服务

echo "开始启动健身数据分析系统..."

# 启动后端服务
echo "启动后端服务..."
cd "$(dirname "$0")"
# 在后台启动后端服务
nohup mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务已启动，进程ID: $BACKEND_PID"

# 等待后端服务启动
echo "等待后端服务启动..."
sleep 5

# 启动前端服务
echo "启动前端服务..."
cd fitness-frontend
# 在后台启动前端服务
nohup npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "前端服务已启动，进程ID: $FRONTEND_PID"

# 启动 fitai-decision 服务
echo "启动 fitai-decision 服务..."
cd "$(dirname "$0")/fitai-decision"
# 在后台启动 fitai-decision 服务
nohup npm run dev > fitai-decision.log 2>&1 &
FITAI_PID=$!
echo "fitai-decision 服务已启动，进程ID: $FITAI_PID"

# 等待 fitai-decision 服务启动
sleep 3

# 输出服务状态
echo "\n服务启动完成！"
echo "后端服务: http://localhost:8080/api"
echo "前端服务: http://localhost:5173/"
echo "fitai-decision 服务: http://localhost:3000/"
echo "\n查看日志："
echo "后端日志: tail -f backend.log"
echo "前端日志: tail -f fitness-frontend/frontend.log"
echo "fitai-decision 日志: tail -f fitai-decision/fitai-decision.log"
echo "\n停止服务: kill $BACKEND_PID $FRONTEND_PID $FITAI_PID"
