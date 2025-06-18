'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Row, Col, Button, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Footer = () => {
    const router = useRouter();

    return (
        <div style={{ padding: '40px 0', background: '#262626', color: '#d9d9d9' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: 'white' }}>Invoice Purchase</Title>
                        <Paragraph style={{ color: '#d9d9d9' }}>
                            Công cụ quản lý hóa đơn mua hàng thông minh, giúp bạn kiểm soát chi tiêu và lưu trữ hóa đơn dễ dàng, an toàn.
                        </Paragraph>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: 'white' }}>Đường dẫn nhanh</Title>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button type="link" style={{ color: '#d9d9d9', padding: '4px 0', textAlign: 'left', height: 'auto' }} onClick={() => router.push('/')}>Trang chủ</Button>
                            <Button type="link" style={{ color: '#d9d9d9', padding: '4px 0', textAlign: 'left', height: 'auto' }} onClick={() => router.push('/invoices')}>Quản lý hóa đơn</Button>
                            <Button type="link" style={{ color: '#d9d9d9', padding: '4px 0', textAlign: 'left', height: 'auto' }} onClick={() => router.push('/about')}>Giới thiệu</Button>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: 'white' }}>Liên hệ</Title>
                        <Paragraph style={{ color: '#d9d9d9' }}>
                            Mọi thắc mắc hoặc góp ý, vui lòng liên hệ với chúng tôi qua email:
                        </Paragraph>
                        <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }} onClick={() => window.open('mailto:support@invoicepurchase.com', '_blank')}>
                            support@invoicepurchase.com
                        </Button>
                    </Col>
                </Row>

                <Divider style={{ borderColor: '#434343', margin: '24px 0' }} />

                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#d9d9d9' }}>© 2024 Invoice Purchase. All Rights Reserved.</Text>
                </div>
            </div>
        </div>
    );
};

export default Footer;