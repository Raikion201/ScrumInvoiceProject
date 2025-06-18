'use client'

import React, { useEffect } from 'react'
import { Table, Button, Tag, Space, Popconfirm, Card, Typography } from 'antd'
import {
    CheckCircleOutlined,
    FileTextOutlined,
    DeleteOutlined,
    EyeOutlined
} from '@ant-design/icons'
import { usePurchaseRequestStore } from '../store/purchaseRequestStore'
import { PurchaseRequest } from '../services/apiService'
import dayjs from 'dayjs'

const { Text, Title } = Typography

interface PurchaseRequestListProps {
    onViewDetails?: (request: PurchaseRequest) => void
}

const PurchaseRequestList: React.FC<PurchaseRequestListProps> = ({ onViewDetails }) => {
    const {
        purchaseRequests,
        loading,
        fetchPurchaseRequests,
        markAsDelivered,
        convertToInvoice,
        deletePurchaseRequest
    } = usePurchaseRequestStore()

    useEffect(() => {
        fetchPurchaseRequests()
    }, [fetchPurchaseRequests])

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

    const columns = [
        {
            title: 'Invoice #',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
            render: (text: string) => <Text strong>{text}</Text>
        },
        {
            title: 'Customer',
            key: 'customer',
            render: (record: PurchaseRequest) => (
                <div>
                    <div><Text strong>{record.customerName}</Text></div>
                    <div><Text type="secondary">{record.customerEmail}</Text></div>
                </div>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (
                <Text ellipsis={{ tooltip: text }}>
                    {text}
                </Text>
            )
        },
        {
            title: 'Amount',
            key: 'amount',
            render: (record: PurchaseRequest) => (
                <div>
                    <div><Text strong>${record.totalAmount.toLocaleString()}</Text></div>
                    {record.depositAmount > 0 && (
                        <div><Text type="secondary">Deposit: ${record.depositAmount.toLocaleString()}</Text></div>
                    )}
                </div>
            )
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date: string) => (
                <Text>{dayjs(date).format('MMM DD, YYYY')}</Text>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>
                    {getStatusText(status)}
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: PurchaseRequest) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => onViewDetails?.(record)}
                        title="View Details"
                    />

                    {record.status === 'PENDING' && (
                        <Button
                            type="primary"
                            size="small"
                            icon={<CheckCircleOutlined />}
                            onClick={() => markAsDelivered(record.id!)}
                            title="Mark as Delivered"
                        >
                            Mark as Delivered
                        </Button>
                    )}

                    {record.status === 'DELIVERED' && (
                        <Button
                            type="primary"
                            size="small"
                            icon={<FileTextOutlined />}
                            onClick={() => convertToInvoice(record.id!)}
                            title="Convert to Invoice"
                        >
                            Convert to Invoice
                        </Button>
                    )}

                    {record.status === 'PENDING' && (
                        <Popconfirm
                            title="Delete Purchase Request"
                            description="Are you sure you want to delete this purchase request?"
                            onConfirm={() => deletePurchaseRequest(record.id!)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                title="Delete"
                            />
                        </Popconfirm>
                    )}
                </Space>
            )
        }
    ]

    return (
        <Card title="Purchase Requests" className="mb-6">
            <Table
                columns={columns}
                dataSource={purchaseRequests}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`
                }}
                scroll={{ x: 1200 }}
            />
        </Card>
    )
}

export default PurchaseRequestList 