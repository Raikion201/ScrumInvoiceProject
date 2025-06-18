'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Button, Space } from 'antd';
import {
    FileTextOutlined,
    DollarOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';

const Header = () => {
    const router = useRouter();
    const [current, setCurrent] = useState('home');

    const onClick = (e) => {
        setCurrent(e.key);
        router.push(e.key);
    };

    const items = [
        {
            label: 'Trang chủ',
            key: '/',
            icon: <FileTextOutlined />,
        },
        {
            label: 'about',
            key: '/about',
            icon: <DollarOutlined />,
        },
        {
            label: 'contact',
            key: '/contact',
            icon: <InfoCircleOutlined />,
        },
        {
            label: 'blog',
            key: '/blog',
            icon: <FileTextOutlined />,
        },
    ];

    return (
        <div className="header" style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <h1
                        style={{ margin: 0, cursor: 'pointer', color: '#52c41a', fontWeight: 'bold', fontSize: 28 }}
                        onClick={() => router.push('/')}
                    >
                        Invoice Purchase
                    </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                        style={{ border: 'none', background: 'transparent' }}
                    />
                    <div style={{ marginLeft: 16 }}>
                        <Space>
                            <Button type="text" onClick={() => router.push('/login')}>
                                Đăng nhập
                            </Button>
                            <Button type="primary" onClick={() => router.push('/register')}>
                                Đăng ký
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;