import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Alert, Modal } from 'react-bootstrap';
import { fitnessApi } from '../services/api';

/**
 * 健身数据表格组件
 * 展示和管理健身数据记录
 */
const FitnessData = () => {
  // 状态管理
  const [fitnessData, setFitnessData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /**
   * 获取所有用户ID列表
   */
  const fetchUserIds = async () => {
    setLoadingUsers(true);
    try {
      const response = await fitnessApi.getAllUserIds();
      setUserIds(response.data);
    } catch (err) {
      console.error('Error fetching user IDs:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  /**
   * 获取健身数据
   * 根据用户ID筛选数据
   */
  const fetchFitnessData = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (userId) {
        response = await fitnessApi.getFitnessByUserId(userId);
      } else {
        response = await fitnessApi.getAllFitness();
      }
      setFitnessData(response.data);
    } catch (err) {
      setError('获取数据失败，请检查后端服务是否运行');
      console.error('Error fetching fitness data:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载用户列表和数据
  useEffect(() => {
    fetchUserIds();
    fetchFitnessData();
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
   * 处理删除数据
   * @param {number} id - 要删除的数据ID
   */
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  /**
   * 确认删除数据
   */
  const confirmDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      await fitnessApi.deleteFitness(deleteId);
      // 重新加载数据
      fetchFitnessData();
      setShowDeleteModal(false);
    } catch (err) {
      setError('删除数据失败');
      console.error('Error deleting fitness data:', err);
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">健身数据记录</h1>

      {/* 用户筛选 */}
      <Form className="mb-4">
        <Form.Group controlId="userId">
          <Form.Label>按用户筛选</Form.Label>
          {loadingUsers ? (
            <Form.Select disabled>
              <option>加载用户列表中...</option>
            </Form.Select>
          ) : (
            <Form.Select value={userId} onChange={handleUserIdChange}>
              <option value="">所有用户</option>
              {userIds.map((id, index) => (
                <option key={id} value={id}>
                  用户 {index + 1}
                </option>
              ))}
            </Form.Select>
          )}
        </Form.Group>
      </Form>

      {/* 错误信息 */}
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* 加载状态 */}
      {loading ? (
        <div className="text-center">加载中...</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>用户ID</th>
              <th>活动类型</th>
              <th>时长(分钟)</th>
              <th>消耗卡路里</th>
              <th>心率</th>
              <th>距离(公里)</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {fitnessData.length > 0 ? (
              fitnessData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userId}</td>
                  <td>{item.activityType}</td>
                  <td>{item.duration}</td>
                  <td>{item.caloriesBurned}</td>
                  <td>{item.heartRate}</td>
                  <td>{item.distance.toFixed(2)}</td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="transition-all duration-200 hover:shadow-md"
                    >
                      删除
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* 删除确认模态框 */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>确认删除</Modal.Title>
        </Modal.Header>
        <Modal.Body>确定要删除这条健身记录吗？此操作不可撤销。</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            取消
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? '删除中...' : '确认删除'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FitnessData;
