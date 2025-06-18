'use client'
import React from 'react';
import { Card, Avatar, Typography, Row, Col, Divider } from 'antd';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import './about.css';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Thai Bao Nhan',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
    description: 'Experienced in React, Node.js, and database design',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'john@example.com'
  },
  {
    id: 2,
    name: 'Tran Huy Hoang',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
    description: 'Passionate about creating intuitive user experiences',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'jane@example.com'
  },
  {
    id: 3,
    name: 'Luu Quang Hieu',
    role: 'Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
    description: 'Expert in API development and system architecture',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mike@example.com'
  },
  {
    id: 4,
    name: 'Han Minh Dinh',
    role: 'Frontend Dev',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
    description: 'Skilled in agile methodologies and team coordination',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'sarah@example.com'
  },
  {
    id: 5,
    name: 'Nguyen Hai Trieu',
    role: 'Scrum Master',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=5',
    description: 'Specialized in cloud infrastructure and CI/CD pipelines',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'david@example.com'
  },
  {
    id: 6,
    name: 'Nguyen Hai Duong',
    role: 'Project Owner',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=6',
    description: 'Expert in modern web technologies and responsive design',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'emily@example.com'
  },
  {
    id: 7,
    name: 'Le Cong Bao',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=7',
    description: 'Ensures product quality through comprehensive testing',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'alex@example.com'
  },
  {
    id: 8,
    name: 'Do Minh Khoa',
    role: 'Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=8',
    description: 'Bridges business requirements with technical solutions',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'lisa@example.com'
  },
  {
    id: 9,
    name: 'Nguyen Tri Thong',
    role: 'Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=9',
    description: 'Focuses on application security and data protection',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mark@example.com'
  }
];

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Title level={1} className="hero-title">
          Meet Our Team
        </Title>
        <Paragraph className="hero-description">
          We are a passionate team of developers and designers committed to creating 
          innovative solutions that make invoice management simple and efficient.
        </Paragraph>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <Card className="mission-card">
          <div className="mission-content">
            <Title level={2} className="mission-title">
              Our Mission
            </Title>
            <Paragraph className="mission-text">
              To revolutionize invoice management by providing intuitive, efficient, and 
              reliable tools that help businesses streamline their financial processes. 
              We believe in the power of technology to simplify complex tasks and 
              empower users to focus on what matters most.
            </Paragraph>
          </div>
        </Card>
      </div>

      {/* Team Members Section */}
      <div className="team-section">
        <Title level={2} className="team-title">
          Our Team Members
        </Title>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              hoverable
              className="team-card"
              cover={
                <div className="team-card-cover">
                  <Avatar
                    size={120}
                    src={member.avatar}
                    className="team-avatar"
                  />
                </div>
              }
            >
              <div style={{ padding: '16px' }}>
                <Title level={4} className="team-member-name">
                  {member.name}
                </Title>
                <span className="team-member-role">
                  {member.role}
                </span>
                <Paragraph className="team-member-description">
                  {member.description}
                </Paragraph>
              </div>
              <div className="team-card-actions">
                <GithubOutlined 
                  className="action-icon"
                  onClick={() => window.open(member.github, '_blank')}
                />
                <LinkedinOutlined 
                  className="action-icon"
                  onClick={() => window.open(member.linkedin, '_blank')}
                />
                <MailOutlined 
                  className="action-icon"
                  onClick={() => window.open(`mailto:${member.email}`)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <Title level={2} className="values-title">
          Our Values
        </Title>
        
        <div className="values-grid">
          <Card className="value-card">
            <span className="value-emoji">🚀</span>
            <Title level={4} className="value-title">Innovation</Title>
            <Paragraph className="value-description">
              We constantly seek new ways to improve and innovate, 
              staying ahead of technology trends to deliver cutting-edge solutions.
            </Paragraph>
          </Card>
          
          <Card className="value-card">
            <span className="value-emoji">🤝</span>
            <Title level={4} className="value-title">Collaboration</Title>
            <Paragraph className="value-description">
              We believe in the power of teamwork and open communication 
              to achieve exceptional results together.
            </Paragraph>
          </Card>
          
          <Card className="value-card">
            <span className="value-emoji">💎</span>
            <Title level={4} className="value-title">Quality</Title>
            <Paragraph className="value-description">
              We are committed to delivering high-quality products 
              that exceed expectations and provide lasting value.
            </Paragraph>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <Card className="contact-card">
          <div className="contact-content">
            <Title level={2} className="contact-title">
              Get In Touch
            </Title>
            <Paragraph className="contact-description">
              Have questions or want to learn more about our project? 
              We'd love to hear from you!
            </Paragraph>
            <div className="contact-info">
              <div className="contact-info-card contact-email">
                <span className="contact-email-text">
                  📧 contact@invoiceapp.com
                </span>
              </div>
              <div className="contact-info-card contact-phone">
                <span className="contact-phone-text">
                  📱 +1 (555) 123-4567
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;