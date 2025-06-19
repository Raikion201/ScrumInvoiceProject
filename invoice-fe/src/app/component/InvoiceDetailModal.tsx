'use client'

import React from 'react'
import { Modal, Descriptions, Tag, Typography, Divider, Space, Button } from 'antd'
import { CheckCircleOutlined, DollarOutlined } from '@ant-design/icons'
import { Invoice } from '../services/apiService'
import { usePurchaseRequestStore } from '../store/purchaseRequestStore'
import dayjs from 'dayjs'

const { Text, Title } = Typography

interface InvoiceDetailModalProps {
    visible: boolean
    onClose: () => void
    invoice: Invoice | null
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({
    visible,
    onClose,
    invoice
}) => {
    const { markInvoiceAsPaid, loading } = usePurchaseRequestStore()

    if (!invoice) return null

    const isOverdue = dayjs(invoice.dueDate).isBefore(dayjs(), 'day')

    const handleMarkAsPaid = async () => {
        await markInvoiceAsPaid(invoice.id!)
        onClose()
    }

    return (
        <Modal
            title={
                <div>
                    <Title level={4} style={{ margin: 0 }}>
                        Invoice Details
                    </Title>
                    <Text type="secondary">#{invoice.invoiceNumber}</Text>
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
        >
            <div className="mt-4">
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="Invoice Number" span={2}>
                        <Text strong>{invoice.invoiceNumber}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Customer Name">
                        <Text strong>{invoice.customerName}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Customer Email">
                        <Text>{invoice.customerEmail}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Description" span={2}>
                        <Text>{invoice.description}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Amount" span={2}>
                        <Text strong style={{ fontSize: '24px', color: '#1890ff' }}>
                            ${invoice.amount.toLocaleString()}
                        </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Invoice Date">
                        <Text>{dayjs(invoice.invoiceDate).format('MMMM DD, YYYY')}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Due Date">
                        <div>
                            <Text style={{
                                color: isOverdue && !invoice.paid ? '#ff4d4f' : 'inherit',
                                fontWeight: isOverdue && !invoice.paid ? 'bold' : 'normal'
                            }}>
                                {dayjs(invoice.dueDate).format('MMMM DD, YYYY')}
                            </Text>
                            {isOverdue && !invoice.paid && (
                                <div><Text type="danger" style={{ fontSize: '12px' }}>OVERDUE</Text></div>
                            )}
                        </div>
                    </Descriptions.Item>

                    <Descriptions.Item label="Payment Status" span={2}>
                        <Tag
                            color={invoice.paid ? 'green' : 'red'}
                            icon={invoice.paid ? <CheckCircleOutlined /> : <DollarOutlined />}
                        >
                            {invoice.paid ? 'Paid' : 'Unpaid'}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>

                <Divider />

                <div className="text-center">
                    <Space direction="vertical" size="large">
                        <div>
                            <Text type="secondary">
                                Invoice generated on {dayjs(invoice.invoiceDate).format('MMMM DD, YYYY')}
                            </Text>
                        </div>

                        {!invoice.paid && (
                            <div>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<CheckCircleOutlined />}
                                    onClick={handleMarkAsPaid}
                                    loading={loading}
                                >
                                    Mark as Paid
                                </Button>
                            </div>
                        )}

                        {invoice.paid && (
                            <div>
                                <Tag color="green" icon={<CheckCircleOutlined />}>
                                    Payment Completed
                                </Tag>
                            </div>
                        )}
                    </Space>
                </div>
            </div>
        </Modal>
    )
}

export default InvoiceDetailModal 