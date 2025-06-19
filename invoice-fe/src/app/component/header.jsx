'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, Button, Space } from 'antd';
import '@fontsource/montserrat'; // Nếu dùng npm install @fontsource/montserrat

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [current, setCurrent] = useState('/');
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Cập nhật username mỗi khi route thay đổi
        const user = localStorage.getItem('username');
        setUsername(user);

        // Lắng nghe sự kiện custom (login/logout)
        const updateUsername = () => {
            const user = localStorage.getItem('username');
            setUsername(user);
        };
        window.addEventListener('usernameChanged', updateUsername);

        return () => {
            window.removeEventListener('usernameChanged', updateUsername);
        };
    }, [pathname]); // <-- thêm pathname vào dependency

    const onClick = (e) => {
        setCurrent(e.key);
        router.push(e.key);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
        window.dispatchEvent(new Event('usernameChanged'));
        router.push('/login');
    };

    const items = [
        { label: 'Home', key: '/' },
        { label: 'About', key: '/about' },
        { label: 'Contact', key: '/contact' },
        { label: 'Blog', key: '/blog' },
	{label: 'Staff Portal',
            key: '/purchase-requests'},

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
                        {username ? (
                            <>
                                <span style={{
fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 500,
                                    color: '#888',
                                    opacity: 0.7,
                                    fontSize: '14px', // hoặc '14px' nếu muốn nhỏ hơn nữa
                                }}>
                                    {username},
                                </span>
                                <Button type="text" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button type="text" onClick={() => router.push('/login')}>
                                    Login
                                </Button>
                                <Button type="primary" onClick={() => router.push('/register')}>
                                    Register
                                </Button>
                            </>
                        )}
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default Header;