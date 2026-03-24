import axios from 'axios';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 健身数据相关 API
export const fitnessApi = {
  // 获取所有健身数据
  getAllFitness: () => api.get('/fitness'),

  // 获取所有用户ID
  getAllUserIds: () => api.get('/fitness/users'),

  // 根据用户 ID 获取健身数据
  getFitnessByUserId: (userId) => api.get(`/fitness/user/${userId}`),

  // 根据活动类型获取健身数据
  getFitnessByActivityType: (activityType) =>
    api.get(`/fitness/activity/${activityType}`),

  // 根据时间范围获取健身数据
  getFitnessByTimeRange: (start, end) =>
    api.get(`/fitness/time-range`, {
      params: {
        start,
        end,
      },
    }),

  // 获取用户的健身统计数据
  getUserStats: (userId) => api.get(`/fitness/user/${userId}/stats`),

  // 保存健身数据
  saveFitness: (fitnessData) => api.post('/fitness', fitnessData),

  // 删除健身数据
  deleteFitness: (id) => api.delete(`/fitness/${id}`),
};

export default api;
