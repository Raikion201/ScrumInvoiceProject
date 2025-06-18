import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Card, Carousel, Image, Space, List } from 'antd';
import {
    FireOutlined,
    MessageOutlined,
    SearchOutlined,
    HeartOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import useAuthStore from '../../store/authStore';

const { Title, Paragraph, Text } = Typography;

// Dữ liệu mẫu cho trang chủ
const features = [
    {
        icon: <FireOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />,
        title: 'Discover Recipes',
        description: 'Find delicious recipes based on ingredients you already have at home.'
    },
    {
        icon: <MessageOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
        title: 'Chat Interface',
        description: 'Interact with our AI assistant to get personalized recipe recommendations.'
    },
    {
        icon: <SearchOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
        title: 'Smart Search',
        description: 'Search by ingredients, cuisine type, or dietary restrictions.'
    },
    {
        icon: <HeartOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
        title: 'Save Favorites',
        description: 'Create a collection of your favorite recipes for quick access.'
    }
];

const howItWorks = [
    {
        title: 'Tell us what you have',
        content: 'Input the ingredients you have in your kitchen through our chat interface.'
    },
    {
        title: 'Get recipe suggestions',
        content: 'Our AI will suggest recipes that match your available ingredients.'
    },
    {
        title: 'Cook and enjoy',
        content: 'Follow the step-by-step instructions and enjoy your delicious meal.'
    },
    {
        title: 'Share your experience',
        content: 'Rate recipes and share your cooking experience with the community.'
    }
];

const popularRecipes = [
    {
        title: 'Creamy Garlic Pasta',
        description: 'A quick and delicious pasta dish with a creamy garlic sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        title: 'Vegetable Stir Fry',
        description: 'Healthy stir-fried vegetables with a flavorful sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        title: 'Chocolate Chip Cookies',
        description: 'Classic homemade cookies with chunks of chocolate.',
        imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
];

const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

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
                                Cook Smart with What You Have
                            </Title>
                            <Paragraph style={{ fontSize: 18, color: 'white', marginBottom: 24 }}>
                                Turn the ingredients in your kitchen into delicious meals with Cook'n'Chat's
                                AI-powered recipe assistant.
                            </Paragraph>
                            <Space>
                                {!user ? (
                                    <>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() => navigate('/register')}
                                            style={{ background: 'white', color: '#52c41a', borderColor: 'white' }}
                                        >
                                            Get Started
                                        </Button>
                                        <Button
                                            size="large"
                                            onClick={() => navigate('/login')}
                                            style={{ background: 'transparent', borderColor: 'white', color: 'white' }}
                                        >
                                            Sign In
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => navigate('/chat')}
                                        style={{ background: 'white', color: '#52c41a', borderColor: 'white' }}
                                    >
                                        Start Cooking
                                    </Button>
                                )}
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div style={{ textAlign: 'center' }}>
                            <Image
                                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                                alt="Cooking with ingredients"
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
                        <Title level={2}>Why Cook'n'Chat?</Title>
                        <Paragraph style={{ fontSize: 16 }}>
                            Our platform makes cooking easy, fun, and personalized to your needs.
                        </Paragraph>
                    </div>

                    <Row gutter={[24, 24]}>
                        {features.map((feature, index) => (
                            <Col xs={24} sm={12} md={6} key={index}>
                                <Card
                                    bordered={false}
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

            {/* Popular Recipes Section */}
            <div style={{ padding: '60px 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <Title level={2} style={{ margin: 0 }}>Popular Recipes</Title>
                        <Button
                            type="link"
                            onClick={() => navigate('/recipes')}
                            icon={<ArrowRightOutlined />}
                        >
                            View All
                        </Button>
                    </div>

                    <Row gutter={[24, 24]}>
                        {popularRecipes.map((recipe, index) => (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <Card
                                    hoverable
                                    cover={
                                        <div style={{ height: 200, overflow: 'hidden' }}>
                                            <img
                                                alt={recipe.title}
                                                src={recipe.imageUrl}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    }
                                    onClick={() => navigate('/recipes')}
                                >
                                    <Card.Meta
                                        title={recipe.title}
                                        description={recipe.description}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* How It Works Section */}
            <div style={{ padding: '60px 0', background: '#f7f7f7' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <Title level={2}>How It Works</Title>
                        <Paragraph style={{ fontSize: 16 }}>
                            Get cooking with Cook'n'Chat in just a few simple steps
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
                                    bordered={false}
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
                    <Title level={2} style={{ color: 'white' }}>Ready to start cooking?</Title>
                    <Paragraph style={{ fontSize: 18, color: 'white', marginBottom: 24 }}>
                        Join thousands of home cooks using Cook'n'Chat to discover delicious recipes tailored to their ingredients.
                    </Paragraph>
                    {!user ? (
                        <Space size="large">
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => navigate('/register')}
                                style={{ background: 'white', color: '#52c41a', borderColor: 'white' }}
                            >
                                Sign Up Now
                            </Button>
                            <Button
                                size="large"
                                onClick={() => navigate('/login')}
                                style={{ background: 'transparent', borderColor: 'white', color: 'white' }}
                            >
                                Log In
                            </Button>
                        </Space>
                    ) : (
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate('/chat')}
                            style={{ background: 'white', color: '#52c41a', borderColor: 'white' }}
                        >
                            Start Chatting
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomePage;