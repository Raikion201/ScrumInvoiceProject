'use client'
import React from 'react';
import { Layout, Menu, Button, Space, Typography } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import {
    HomeOutlined,
    FileTextOutlined,
    DollarOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function PurchaseRequestsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Home',
            onClick: () => router.push('/')
        },
        {
            key: '/purchase-requests',
            icon: <FileTextOutlined />,
            label: 'Purchase Requests',
            onClick: () => router.push('/purchase-requests')
        },
        {
            key: '/invoices',
            icon: <DollarOutlined />,
            label: 'Invoices',
            onClick: () => router.push('/purchase-requests?tab=invoices')
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                background: '#fff',
                borderBottom: '1px solid #f0f0f0',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={3} style={{ margin: 0, color: '#1890ff', marginRight: 48 }}>
                        Invoice Management
                    </Title>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[pathname]}
                        items={menuItems}
                        style={{ border: 'none', background: 'transparent' }}
                    />
                </div>
                <Space>
                    <Button
                        type="text"
                        icon={<HomeOutlined />}
                        onClick={() => router.push('/')}
                    >
                        Back to Home
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined />}
                        onClick={() => router.push('/')}
                    >
                        Logout
                    </Button>
                </Space>
            </Header>
            <Content style={{ padding: 0, background: '#f5f5f5' }}>
                {children}
            </Content>
        </Layout>
    );
} 