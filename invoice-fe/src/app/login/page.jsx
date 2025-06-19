'use client'
import React from 'react';
import { Button, Checkbox, Form, Input, Card, Typography, message } from 'antd';
import api from '../ultils/axiosConfig';
import { useRouter } from 'next/navigation';
const { Title } = Typography;

const LoginForm = () => {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            const res = await api.post('/auth/login', {
                username: values.username,
                password: values.password,
            });
            localStorage.setItem('username', values.username);
            window.dispatchEvent(new Event('usernameChanged'));
            message.success(res.data.message || 'Login successful!');
            router.push('/');
        } catch (error) {
            message.error(error.response?.data?.message || 'Login failed!');
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Login Failed:', errorInfo);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7' }}>
            <Card style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Login</Title>
                <Form
                    name="login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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

                    <Form.Item name="remember" valuePropName="checked" label={null} wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null} wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;