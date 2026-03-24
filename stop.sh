#!/bin/bash

# 停止脚本 - 一键停止后端、前端和 fitai-decision 服务

echo "开始停止健身数据分析系统..."

# 查找并停止后端服务
echo "停止后端服务..."
BACKEND_PID=$(ps aux | grep "spring-boot:run" | grep -v grep | awk '{print $2}')
if [ ! -z "$BACKEND_PID" ]; then
  kill $BACKEND_PID
  echo "后端服务已停止，进程ID: $BACKEND_PID"
else
  echo "后端服务未运行"
fi

# 查找并停止前端服务
echo "停止前端服务..."
FRONTEND_PID=$(ps aux | grep "npm run dev" | grep "fitness-frontend" | grep -v grep | awk '{print $2}')
if [ ! -z "$FRONTEND_PID" ]; then
  kill $FRONTEND_PID
  echo "前端服务已停止，进程ID: $FRONTEND_PID"
else
  echo "前端服务未运行"
fi

# 查找并停止 fitai-decision 服务
echo "停止 fitai-decision 服务..."
FITAI_PID=$(ps aux | grep "npm run dev" | grep "fitai-decision" | grep -v grep | awk '{print $2}')
if [ ! -z "$FITAI_PID" ]; then
  kill $FITAI_PID
  echo "fitai-decision 服务已停止，进程ID: $FITAI_PID"
else
  echo "fitai-decision 服务未运行"
fi

echo "\n服务停止完成！"
