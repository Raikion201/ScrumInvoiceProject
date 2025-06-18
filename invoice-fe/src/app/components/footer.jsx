import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '40px 0', background: '#262626', color: '#d9d9d9' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: 'white' }}>Cook'n'Chat</Title>
                        <Paragraph style={{ color: '#d9d9d9' }}>
                            Turn the ingredients in your kitchen into delicious meals with our AI-powered recipe assistant.
                        </Paragraph>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: 'white' }}>Quick Links</Title>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button type="link" style={{ color: '#d9d9d9', padding: '4px 0', textAlign: 'left', height: 'auto' }} onClick={() => navigate('/')}>Home</Button>
                            <Button type="link" style={{ color: '#d9d9d9', padding: '4px 0', textAlign: 'left', height: 'auto' }} onClick={() => navigate('/recipes')}>Recipes</Button>
                            <Button type="link" style={{ color: '#d9d9d9', padding: '4px 0', textAlign: 'left', height: 'auto' }} onClick={() => navigate('/about')}>About Us</Button>
                            <Button type="link" style={{ color: '#d9d9d9', padding: '4px 0', textAlign: 'left', height: 'auto' }} onClick={() => navigate('/contact')}>Contact</Button>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: 'white' }}>Contact Us</Title>
                        <Paragraph style={{ color: '#d9d9d9' }}>
                            Have questions or feedback? We'd love to hear from you!
                        </Paragraph>
                        <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }} onClick={() => navigate('/contact')}>
                            Get In Touch
                        </Button>
                    </Col>
                </Row>

                <Divider style={{ borderColor: '#434343', margin: '24px 0' }} />

                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#d9d9d9' }}>© 2024 Cook'n'Chat. All Rights Reserved.</Text>
                </div>
            </div>
        </div>
    );
};

export default Footer;