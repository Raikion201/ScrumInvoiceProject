'use client'

import React, { useEffect } from 'react'
import { Table, Button, Tag, Space, Card, Typography } from 'antd'
import {
    DollarOutlined,
    EyeOutlined
} from '@ant-design/icons'
import { usePurchaseRequestStore } from '../store/purchaseRequestStore'
import { PurchaseRequest } from '../services/apiService'
import dayjs from 'dayjs'

const { Text, Title } = Typography

interface BillsListProps {
    onViewDetails?: (bill: PurchaseRequest) => void
}

const BillsList: React.FC<BillsListProps> = ({ onViewDetails }) => {
    const {
        bills,
        loading,
        fetchBills,
        markAsPaid
    } = usePurchaseRequestStore()

    useEffect(() => {
        fetchBills()
    }, [fetchBills])

    const columns = [
        {
            title: 'Bill #',
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
                <Tag color="blue">Shipped</Tag>
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
                    
                    <Button
                        type="primary"
                        size="small"
                        icon={<DollarOutlined />}
                        onClick={() => markAsPaid(record.id!)}
                        title="Mark as Paid"
                    >
                        Set to Paid
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <Card title="Bills (Shipped Requests)" className="mb-6">
            <Table
                columns={columns}
                dataSource={bills}
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

export default BillsList
