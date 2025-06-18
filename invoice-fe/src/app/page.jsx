'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Button, Row, Col, Card, Image, Space, List } from 'antd';
import {
    FileTextOutlined,
    DollarOutlined,
    CloudUploadOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// Dữ liệu mẫu cho các tính năng
const features = [
    {
        icon: <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
        title: 'Quản lý hóa đơn',
        description: 'Lưu trữ, tìm kiếm và quản lý hóa đơn mua hàng một cách dễ dàng.'
    },
    {
        icon: <DollarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
        title: 'Theo dõi chi phí',
        description: 'Tự động tổng hợp và phân tích chi phí mua sắm của bạn.'
    },
    {
        icon: <CloudUploadOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
        title: 'Nhập hóa đơn nhanh',
        description: 'Hỗ trợ nhập hóa đơn bằng file hoặc chụp ảnh.'
    },
    {
        icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />,
        title: 'Báo cáo thông minh',
        description: 'Tạo báo cáo chi tiết về hóa đơn và chi tiêu chỉ với một cú nhấp.'
    }
];

const howItWorks = [
    {
        title: 'Đăng ký tài khoản',
        content: 'Tạo tài khoản miễn phí để bắt đầu sử dụng Invoice Purchase.'
    },
    {
        title: 'Nhập hóa đơn',
        content: 'Thêm hóa đơn mua hàng của bạn bằng cách tải file hoặc nhập tay.'
    },
    {
        title: 'Quản lý & tra cứu',
        content: 'Dễ dàng tìm kiếm, chỉnh sửa và quản lý hóa đơn mọi lúc mọi nơi.'
    },
    {
        title: 'Xem báo cáo',
        content: 'Theo dõi chi tiêu và xuất báo cáo nhanh chóng, trực quan.'
    }
];

const HomePage = () => {
    const router = useRouter();

    return (
        <>
            {/* Hero Section */}
            <div
                style={{
                    background: 'linear-gradient(135deg, #52c41a 0%, #1abc9c 100%)',
                    padding: '60px 0',
                    color: 'white'
                }}
            >
                <Row justify="center" align="middle" gutter={[24, 24]} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                    <Col xs={24} md={12}>
                        <div style={{ padding: '0 16px' }}>
                            <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
                                Invoice Purchase
                            </Title>
                            <Paragraph style={{ fontSize: 18, color: 'white', marginBottom: 24 }}>
                                Công cụ quản lý hóa đơn mua hàng thông minh, giúp bạn kiểm soát chi tiêu và lưu trữ hóa đơn dễ dàng, an toàn.
                            </Paragraph>
                            <Space>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={() => router.push('/register')}
                                    style={{ background: 'white', color: '#52c41a', borderColor: 'white' }}
                                >
                                    Đăng ký ngay
                                </Button>
                                <Button
                                    size="large"
                                    onClick={() => router.push('/login')}
                                    style={{ background: 'transparent', borderColor: 'white', color: 'white' }}
                                >
                                    Đăng nhập
                                </Button>
                                <Button
                                    size="large"
                                    onClick={() => router.push('/purchase-requests')}
                                    style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'white', color: 'white' }}
                                >
                                    Staff Portal
                                </Button>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{ textAlign: 'center' }}>
                            <Image
                                src="https://img.freepik.com/free-vector/invoice-concept-illustration_114360-2143.jpg?w=740"
                                alt="Invoice management illustration"
                                style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}
                                preview={false}
                            />
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Features Section */}
            <div style={{ padding: '60px 0', background: '#f7f7f7' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <Title level={2}>Tính năng nổi bật</Title>
                        <Paragraph style={{ fontSize: 16 }}>
                            Tối ưu hóa việc quản lý hóa đơn và chi tiêu của bạn với các tính năng mạnh mẽ, dễ sử dụng.
                        </Paragraph>
                    </div>

                    <Row gutter={[24, 24]}>
                        {features.map((feature, index) => (
                            <Col xs={24} sm={12} md={6} key={index}>
                                <Card
                                    variant="borderless"
                                    className="feature-card"
                                    style={{
                                        height: '100%',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                        transition: 'transform 0.3s',
                                        cursor: 'pointer'
                                    }}
                                    hoverable
                                >
                                    <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                                    <Title level={4}>{feature.title}</Title>
                                    <Paragraph>{feature.description}</Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* How It Works Section */}
            <div style={{ padding: '60px 0', background: '#fff' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <Title level={2}>Cách hoạt động</Title>
                        <Paragraph style={{ fontSize: 16 }}>
                            Chỉ với vài bước đơn giản, bạn đã có thể quản lý hóa đơn mua hàng hiệu quả.
                        </Paragraph>
                    </div>

                    <List
                        grid={{
                            gutter: 24,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            xl: 4,
                        }}
                        dataSource={howItWorks}
                        renderItem={(item, index) => (
                            <List.Item>
                                <Card
                                    variant="borderless"
                                    style={{ textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
                                >
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: '#52c41a',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            margin: '0 auto 16px'
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                    <Title level={4}>{item.title}</Title>
                                    <Paragraph>{item.content}</Paragraph>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div style={{ padding: '60px 0', background: '#52c41a', color: 'white', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
                    <Title level={2} style={{ color: 'white' }}>Sẵn sàng quản lý hóa đơn của bạn?</Title>
                    <Paragraph style={{ fontSize: 18, color: 'white', marginBottom: 24 }}>
                        Đăng ký ngay để trải nghiệm công cụ Invoice Purchase miễn phí!
                    </Paragraph>
                    <Space size="large">
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => router.push('/register')}
                            style={{ background: 'white', color: '#52c41a', borderColor: 'white' }}
                        >
                            Đăng ký ngay
                        </Button>
                        <Button
                            size="large"
                            onClick={() => router.push('/login')}
                            style={{ background: 'transparent', borderColor: 'white', color: 'white' }}
                        >
                            Đăng nhập
                        </Button>
                    </Space>
                </div>
            </div>
        </>
    );
};

export default HomePage;