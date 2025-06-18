import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button, Space, Dropdown, Avatar } from 'antd';
import {
    HomeOutlined,
    BookOutlined,
    MessageOutlined,
    InfoCircleOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import useAuthStore from '../../store/authStore';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [current, setCurrent] = useState('home');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    const items = [
        {
            label: 'Home',
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: 'Recipes',
            key: '/recipes',
            icon: <BookOutlined />,
        },
        {
            label: 'Chat',
            key: '/chat',
            icon: <MessageOutlined />,
        },
        {
            label: 'About',
            key: '/about',
            icon: <InfoCircleOutlined />,
        },
    ];

    const userMenuItems = [
        {
            key: '/profile',
            label: 'My Profile',
            icon: <UserOutlined />,
            onClick: () => navigate('/profile')
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        }
    ];

    return (
        <div className="header" style={{ borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <h1
                        style={{ margin: 0, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>Cook'n'Chat</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                        style={{ border: 'none' }}
                    />

                    <div style={{ marginLeft: 16 }}>
                        {user ? (
                            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                                <Space>
                                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#52c41a' }} />
                                    <span>{user.username}</span>
                                </Space>
                            </Dropdown>
                        ) : (
                            <Space>
                                <Button type="text" onClick={() => navigate('/login')}>
                                    Sign in
                                </Button>
                                <Button type="primary" onClick={() => navigate('/register')}>
                                    Sign up
                                </Button>
                            </Space>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;