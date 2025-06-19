'use client'
import React from 'react';
import { Button, Form, Input, Card, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import api from '../ultils/axiosConfig';
const { Title } = Typography;

const RegisterForm = () => {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            await api.post('/auth/register', {
                username: values.username,
                password: values.password,
                email: values.email,
            });
            message.success('Register successful!');
            router.push('/login'); // Chuyển sang trang login
        } catch (error) {
            message.error(error.response?.data || 'Register failed!');
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Register Failed:', errorInfo);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
            <Card style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Register</Title>
                <Form
                    name="register"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Invalid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Retype Password"
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please retype your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterForm;