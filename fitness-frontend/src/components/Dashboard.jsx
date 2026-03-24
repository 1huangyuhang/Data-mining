import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { fitnessApi } from '../services/api';

/**
 * 仪表盘组件
 * 展示用户健身数据统计信息
 */
const Dashboard = () => {
  // 状态管理
  const [userId, setUserId] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [stats, setStats] = useState(null);
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
   * 获取用户统计数据
   */
  const fetchUserStats = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fitnessApi.getUserStats(userId);
      setStats(response.data);
    } catch (err) {
      setError('获取数据失败，请检查后端服务是否运行');
      console.error('Error fetching user stats:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载用户列表
  useEffect(() => {
    fetchUserIds();
  }, []);

  // 当用户ID变更时，重新获取统计数据
  useEffect(() => {
    fetchUserStats();
  }, [userId]);

  /**
   * 处理用户ID变更
   * @param {Event} e - 事件对象
   */
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">健身数据仪表盘</h1>

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
      ) : stats ? (
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>总活动次数</Card.Title>
                <Card.Text className="display-4">
                  {stats.totalActivities}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>总活动时长</Card.Title>
                <Card.Text className="display-4">
                  {stats.totalDuration} 分钟
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>总消耗卡路里</Card.Title>
                <Card.Text className="display-4">
                  {stats.totalCalories} 千卡
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Card.Title>总距离</Card.Title>
                <Card.Text className="display-4">
                  {stats.totalDistance.toFixed(2)} 公里
                </Card.Text>
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

export default Dashboard;
