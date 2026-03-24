import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { fitnessApi } from '../services/api';

/**
 * 添加健身数据组件
 * 用于添加新的健身数据记录
 */
const AddFitnessData = () => {
  // 表单数据状态
  const [formData, setFormData] = useState({
    userId: 'user_1',
    activityType: '跑步',
    duration: 30,
    caloriesBurned: 300,
    heartRate: 140,
    distance: 5.0,
  });
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 错误信息
  const [error, setError] = useState(null);
  // 成功信息
  const [success, setSuccess] = useState(null);

  /**
   * 处理表单输入变更
   * @param {Event} e - 事件对象
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'duration' || name === 'caloriesBurned' || name === 'heartRate'
          ? parseInt(value)
          : name === 'distance'
            ? parseFloat(value)
            : value,
    }));
  };

  /**
   * 处理表单提交
   * @param {Event} e - 事件对象
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 添加时间戳
      const dataToSubmit = {
        ...formData,
        timestamp: new Date().toISOString(),
      };

      await fitnessApi.saveFitness(dataToSubmit);
      setSuccess('数据添加成功！');

      // 重置表单
      setFormData({
        userId: 'user_1',
        activityType: '跑步',
        duration: 30,
        caloriesBurned: 300,
        heartRate: 140,
        distance: 5.0,
      });
    } catch (err) {
      setError('添加数据失败，请检查后端服务是否运行');
      console.error('Error adding fitness data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">添加健身数据</h1>

      {/* 错误信息 */}
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* 成功信息 */}
      {success && (
        <Alert variant="success" className="mb-4">
          {success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userId" className="mb-3">
          <Form.Label>用户ID</Form.Label>
          <Form.Select
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
          >
            <option value="user_1">用户 1</option>
            <option value="user_2">用户 2</option>
            <option value="user_3">用户 3</option>
            <option value="user_4">用户 4</option>
            <option value="user_5">用户 5</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="activityType" className="mb-3">
          <Form.Label>活动类型</Form.Label>
          <Form.Select
            name="activityType"
            value={formData.activityType}
            onChange={handleInputChange}
          >
            <option value="跑步">跑步</option>
            <option value="游泳">游泳</option>
            <option value="骑行">骑行</option>
            <option value="健身">健身</option>
            <option value="瑜伽">瑜伽</option>
            <option value="其他">其他</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="duration" className="mb-3">
          <Form.Label>时长（分钟）</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            min="1"
            max="300"
          />
        </Form.Group>

        <Form.Group controlId="caloriesBurned" className="mb-3">
          <Form.Label>消耗卡路里（千卡）</Form.Label>
          <Form.Control
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleInputChange}
            min="1"
            max="2000"
          />
        </Form.Group>

        <Form.Group controlId="heartRate" className="mb-3">
          <Form.Label>心率（次/分钟）</Form.Label>
          <Form.Control
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleInputChange}
            min="60"
            max="200"
          />
        </Form.Group>

        <Form.Group controlId="distance" className="mb-3">
          <Form.Label>距离（公里）</Form.Label>
          <Form.Control
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            min="0.1"
            max="100"
            step="0.1"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? '添加中...' : '添加数据'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddFitnessData;
