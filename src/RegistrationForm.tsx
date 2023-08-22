import React, { useState, useRef } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
// import './RegistrationForm.css'; // Import the CSS file for styling
import { Button, Col, Form, Input, Row, Popconfirm, Modal, notification, FormInstance } from "antd";

const RegistrationForm: React.FC = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const handleSubmit = async (event: any) => {
    debugger;
    //event.preventDefault();
    const companyName = event.companyName?.replace(/\s/g, "_");
    const projectName = event.projectName?.replace(/\s/g, "_");
    const userName = event.userName?.replace(/\s/g, "_");
    const serviceName = event.serviceName?.replace(/\s/g, "_");
    const emailId = event.emailId;
    const errorAlerts = event.errorAlerts;
    setIsLoading(true);
//https://ec2-3-9-132-176.eu-west-2.compute.amazonaws.com/registration
//https://loggerregistration20230707150626.azurewebsites.net/registration/
    try {
      const response = await axios.post(
        "https://loggerregistration20230707150626.azurewebsites.net//registration/",
        {
          companyName,
          projectName,
          userName,
          serviceName,
          emailId,
          errorAlerts
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      setRegistrationId(response.data.registrationId);
    } catch (error) {
      notification.error({
        message: "An error occurred. Please try again."
      });
    }

    setIsLoading(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setRegistrationId("");
    formRef.current?.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      {isLoading && (
        <div className="overlay">
          <div className="spinner">
            <ClipLoader color={"#ffffff"} loading={true} size={50} />
          </div>
        </div>
      )}
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Form
            name="basic"
            ref={formRef}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            layout="vertical"
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item
              label="Company Name"
              name="companyName"
              htmlFor="companyName"
              rules={[{ required: true, message: "Please input your company name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project Name"
              name="projectName"
              htmlFor="projectName"
              rules={[{ required: true, message: "Please input your project name!" },{ message: "Please input valid project name!" , type: "string" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="userName"
              htmlFor="userName"
              rules={[{ required: true, message: "Please input your username!" },{ message: "Please input valid username!" , type: "string" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Service Name" name="serviceName" htmlFor="serviceName" rules={[{ message: "Please input valid service name!" , type: "string" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Email Id" name="emailId" htmlFor="emailId" rules={[{ required: true, message: "Please input your email id!" },{ message: "Please enter valid email id!", type:"email" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Error Count" name="errorAlerts" htmlFor="errorAlerts" rules={[{ required: true, message: "Please error count!" }]}>
              <Input />
            </Form.Item>

            <Form.Item
              style={{
                textAlign: "center"
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading || !!registrationId}
                onClick={showModal}
              >
                Register
              </Button>
            </Form.Item>

            {registrationId && (
              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
