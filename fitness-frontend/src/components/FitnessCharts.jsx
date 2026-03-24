import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { fitnessApi } from '../services/api';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * 健身数据图表组件
 * 展示用户健身数据的可视化图表
 */
const FitnessCharts = () => {
  // 状态管理
  const [userId, setUserId] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [fitnessData, setFitnessData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);

  /**
   * 获取所有用户ID列表
   */
  const fetchUserIds = async () => {
    setLoadingUsers(true);
    try {
      const response = await fitnessApi.getAllUserIds();
      setUserIds(response.data);
      if (response.data.length > 0) {
        setUserId(response.data[0]);
      }
    } catch (err) {
      setError('获取用户列表失败');
      console.error('Error fetching user IDs:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  /**
   * 获取健身数据
   */
  const fetchFitnessData = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fitnessApi.getFitnessByUserId(userId);
      setFitnessData(response.data);
    } catch (err) {
      setError('获取数据失败，请检查后端服务是否运行');
      console.error('Error fetching fitness data:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载用户列表
  useEffect(() => {
    fetchUserIds();
  }, []);

  // 当用户ID变更时，重新获取数据
  useEffect(() => {
    fetchFitnessData();
  }, [userId]);

  /**
   * 处理用户ID变更
   * @param {Event} e - 事件对象
   */
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  /**
   * 准备活动类型分布数据
   * @returns {Object} 活动类型分布数据
   */
  const prepareActivityTypeData = () => {
    const activityTypes = {};
    fitnessData.forEach((item) => {
      if (activityTypes[item.activityType]) {
        activityTypes[item.activityType]++;
      } else {
        activityTypes[item.activityType] = 1;
      }
    });

    return {
      labels: Object.keys(activityTypes),
      datasets: [
        {
          data: Object.values(activityTypes),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  /**
   * 准备活动时长分布数据
   * @returns {Object} 活动时长分布数据
   */
  const prepareDurationData = () => {
    const activityDurations = {};
    fitnessData.forEach((item) => {
      if (activityDurations[item.activityType]) {
        activityDurations[item.activityType] += item.duration;
      } else {
        activityDurations[item.activityType] = item.duration;
      }
    });

    return {
      labels: Object.keys(activityDurations),
      datasets: [
        {
          label: '活动时长（分钟）',
          data: Object.values(activityDurations),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  /**
   * 准备卡路里消耗分布数据
   * @returns {Object} 卡路里消耗分布数据
   */
  const prepareCaloriesData = () => {
    const activityCalories = {};
    fitnessData.forEach((item) => {
      if (activityCalories[item.activityType]) {
        activityCalories[item.activityType] += item.caloriesBurned;
      } else {
        activityCalories[item.activityType] = item.caloriesBurned;
      }
    });

    return {
      labels: Object.keys(activityCalories),
      datasets: [
        {
          label: '消耗卡路里（千卡）',
          data: Object.values(activityCalories),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">健身数据图表</h1>

      {/* 用户选择 */}
      <Form className="mb-4">
        <Form.Group controlId="userId">
          <Form.Label>选择用户</Form.Label>
          {loadingUsers ? (
            <Form.Select disabled>
              <option>加载用户列表中...</option>
            </Form.Select>
          ) : (
            <Form.Select value={userId} onChange={handleUserIdChange}>
              {userIds.length > 0 ? (
                userIds.map((id, index) => (
                  <option key={id} value={id}>
                    用户 {index + 1}
                  </option>
                ))
              ) : (
                <option value="">暂无用户数据</option>
              )}
            </Form.Select>
          )}
        </Form.Group>
      </Form>

      {/* 错误信息 */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* 加载状态 */}
      {loading ? (
        <div className="text-center">加载中...</div>
      ) : fitnessData.length > 0 ? (
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>活动类型分布</Card.Header>
              <Card.Body>
                <Pie data={prepareActivityTypeData()} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>活动时长分布</Card.Header>
              <Card.Body>
                <Bar data={prepareDurationData()} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card className="mb-4">
              <Card.Header>卡路里消耗分布</Card.Header>
              <Card.Body>
                <Bar data={prepareCaloriesData()} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="text-center">暂无数据</div>
      )}
    </Container>
  );
};

export default FitnessCharts;
