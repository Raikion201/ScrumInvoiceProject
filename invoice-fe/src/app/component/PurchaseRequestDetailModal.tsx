'use client'

import React from 'react'
import { Modal, Descriptions, Tag, Typography, Divider, Space } from 'antd'
import { PurchaseRequest } from '../services/apiService'
import dayjs from 'dayjs'

const { Text, Title } = Typography

interface PurchaseRequestDetailModalProps {
    visible: boolean
    onClose: () => void
    purchaseRequest: PurchaseRequest | null
}

const PurchaseRequestDetailModal: React.FC<PurchaseRequestDetailModalProps> = ({
    visible,
    onClose,
    purchaseRequest
}) => {
    if (!purchaseRequest) return null

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'orange'
            case 'DELIVERED':
                return 'blue'
            case 'CONVERTED_TO_INVOICE':
                return 'green'
            default:
                return 'default'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Pending'
            case 'DELIVERED':
                return 'Delivered'
            case 'CONVERTED_TO_INVOICE':
                return 'Converted to Invoice'
            default:
                return status
        }
    }

    return (
        <Modal
            title={
                <div>
                    <Title level={4} style={{ margin: 0 }}>
                        Purchase Request Details
                    </Title>
                    <Text type="secondary">#{purchaseRequest.invoiceNumber}</Text>
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
                        <Text strong>{purchaseRequest.invoiceNumber}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Customer Name">
                        <Text strong>{purchaseRequest.customerName}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Customer Email">
                        <Text>{purchaseRequest.customerEmail}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Description" span={2}>
                        <Text>{purchaseRequest.description}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Total Amount">
                        <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                            ${purchaseRequest.totalAmount.toLocaleString()}
                        </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Deposit Amount">
                        <Text style={{ color: '#52c41a' }}>
                            ${purchaseRequest.depositAmount.toLocaleString()}
                        </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Remaining Amount">
                        <Text strong style={{ color: '#fa8c16' }}>
                            ${(purchaseRequest.totalAmount - purchaseRequest.depositAmount).toLocaleString()}
                        </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Due Date">
                        <Text>{dayjs(purchaseRequest.dueDate).format('MMMM DD, YYYY')}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Invoice Date">
                        <Text>{dayjs(purchaseRequest.invoiceDate).format('MMMM DD, YYYY')}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={2}>
                        <Tag color={getStatusColor(purchaseRequest.status)}>
                            {getStatusText(purchaseRequest.status)}
                        </Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="Payment Status" span={2}>
                        <Tag color={purchaseRequest.isPaid ? 'green' : 'red'}>
                            {purchaseRequest.isPaid ? 'Paid' : 'Unpaid'}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>

                <Divider />

                <div className="text-center">
                    <Space direction="vertical" size="large">
                        <div>
                            <Text type="secondary">Created on {dayjs(purchaseRequest.invoiceDate).format('MMMM DD, YYYY')}</Text>
                        </div>

                        {purchaseRequest.status === 'CONVERTED_TO_INVOICE' && (
                            <div>
                                <Tag color="green">
                                    ✓ Converted to Invoice
                                </Tag>
                            </div>
                        )}
                    </Space>
                </div>
            </div>
        </Modal>
    )
}

export default PurchaseRequestDetailModal 