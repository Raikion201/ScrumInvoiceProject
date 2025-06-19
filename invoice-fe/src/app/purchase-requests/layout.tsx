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

            <Content style={{ padding: 0, background: '#f5f5f5' }}>
                {children}
            </Content>
        </Layout>
    );
} 