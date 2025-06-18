'use client'
import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const AboutPage = () => (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Title level={2}>Về Invoice Purchase</Title>
        <Paragraph>
            <b>Invoice Purchase</b> là công cụ quản lý hóa đơn mua hàng thông minh, giúp bạn lưu trữ, tra cứu và kiểm soát chi tiêu một cách dễ dàng, an toàn và hiệu quả.
        </Paragraph>
        <Paragraph>
            Với các tính năng nổi bật như nhập hóa đơn nhanh, báo cáo chi tiêu tự động, và giao diện thân thiện, Invoice Purchase là lựa chọn lý tưởng cho cá nhân và doanh nghiệp nhỏ muốn tối ưu hóa việc quản lý hóa đơn.
        </Paragraph>
        <Paragraph>
            Nếu bạn có bất kỳ thắc mắc hoặc góp ý nào, hãy liên hệ với chúng tôi qua email: <a href="mailto:support@invoicepurchase.com">support@invoicepurchase.com</a>
        </Paragraph>
    </div>
);

export default AboutPage; 