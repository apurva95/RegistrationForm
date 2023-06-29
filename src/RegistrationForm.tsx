import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
// import './RegistrationForm.css'; // Import the CSS file for styling
import { Button, Col, Form, Input, Row, Popconfirm, Modal } from 'antd';

const RegistrationForm: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [userName, setUserName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event: any) => {
    //event.preventDefault();
  const companyName = event.companyName.replace(/\s/g, '_');
  const projectName = event.projectName.replace(/\s/g, '_');
  const userName = event.userName.replace(/\s/g, '_');
  const serviceName = event.serviceName.replace(/\s/g, '_');

    setIsLoading(true);
    setError('');

    try {
      debugger;
      const response = await axios.post(
        'https://localhost:7155/registration/',
        {
          companyName,
          projectName,
          userName,
          serviceName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setRegistrationId(response.data.registrationId);
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }

    setIsLoading(false);
  };

  const handlePopupClose = () => {
    setRegistrationId('');
    setCompanyName('');
    setProjectName('');
    setUserName('');
    setServiceName('');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handlePopupClose();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
            {isLoading && (
        <div className="overlay">
          <div className="spinner">
            <ClipLoader color={'#ffffff'} loading={true} size={50} />
          </div>
        </div>
      )}
      {/* <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceName">Service Name (Optional):</label>
          <input
            type="text"
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading || !!registrationId}>
          Register
        </button>
        {error && <p className="error">{error}</p>}
        {registrationId && (
        <div className="popup">
          <div className="popup-content">
            <h3>Registration ID:</h3>
            <p>{registrationId}</p>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
      </form> */}
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={handleSubmit}
    layout="vertical"
    onFinishFailed={()=>{}}
    autoComplete="off"
  >
    <Form.Item
      label="Company Name"
      name="companyName"
      htmlFor='companyName'
      rules={[{ required: true, message: 'Please input your company name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Project Name"
      name="projectName"
      htmlFor='projectName'
      rules={[{ required: true, message: 'Please input your project name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Username"
      name="userName"
      htmlFor='userName'
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Service Name"
      name="serviceName"
      htmlFor='serviceName'
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" disabled={isLoading || !!registrationId} onClick={showModal}>
        Register
      </Button>
    </Form.Item>

    {error && <p className="error">{error}</p>}
        {registrationId && (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h3>Registration ID:</h3>
            <p>{registrationId}</p>
      </Modal>
      )}

  </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
     
    </div>
  );
};

export default RegistrationForm;