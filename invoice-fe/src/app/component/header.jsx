'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Button, Space } from 'antd';

const Header = () => {
    const router = useRouter();
    const [current, setCurrent] = useState('/');

    const onClick = (e) => {
        setCurrent(e.key);
        router.push(e.key);
    };

    const items = [
        {
            label: 'Home',
            key: '/',
        },
        {
            label: 'About',
            key: '/about',
        },
        {
            label: 'Contact',
            key: '/contact',
        },
        {
            label: 'Blog',
            key: '/blog',
        },
    ];

    return (
        <div className="header" style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
            <div style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                height: 64,
            }}>
                <div style={{ flex: 1 }}>
                    <h1
                        style={{ margin: 0, cursor: 'pointer', color: '#52c41a', fontWeight: 'bold', fontSize: 28 }}
                        onClick={() => router.push('/')}
                    >
                        Invoice Purchase
                    </h1>
                </div>
                <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                        style={{ border: 'none', background: 'transparent', fontSize: 16, fontWeight: 500, width: '100%', display: 'flex', justifyContent: 'center' }}
                    />
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Space>
                        <Button type="text" onClick={() => router.push('/login')}>
                            Login
                        </Button>
                        <Button type="primary" onClick={() => router.push('/register')}>
                            Register
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default Header;