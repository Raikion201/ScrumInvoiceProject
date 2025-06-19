'use client'

import React, { useEffect } from 'react'
import { Table, Button, Tag, Space, Card, Typography } from 'antd'
import {
    EyeOutlined,
    CheckCircleOutlined
} from '@ant-design/icons'
import { usePurchaseRequestStore } from '../store/purchaseRequestStore'
import { Invoice } from '../services/apiService'
import dayjs from 'dayjs'

const { Text, Title } = Typography

interface InvoiceListProps {
    onViewDetails?: (invoice: Invoice) => void
}

const InvoiceList: React.FC<InvoiceListProps> = ({ onViewDetails }) => {
    const {
        invoices,
        loading,
        fetchInvoices
    } = usePurchaseRequestStore()

    useEffect(() => {
        fetchInvoices()
    }, [fetchInvoices])

    const isOverdue = (dueDate: string) => {
        return dayjs(dueDate).isBefore(dayjs(), 'day')
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
            render: (record: Invoice) => (
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
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => (
                <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                    ${amount.toLocaleString()}
                </Text>
            )
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            key: 'invoiceDate',
            render: (date: string) => (
                <Text>{dayjs(date).format('MMM DD, YYYY')}</Text>
            )
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date: string, record: Invoice) => (
                <div>
                    <Text style={{
                        color: isOverdue(date) && !record.paid ? '#ff4d4f' : 'inherit'
                    }}>
                        {dayjs(date).format('MMM DD, YYYY')}
                    </Text>
                    {isOverdue(date) && !record.paid && (
                        <div><Text type="danger" style={{ fontSize: '12px' }}>OVERDUE</Text></div>
                    )}
                </div>
            )
        },
        {
            title: 'Payment Status',
            dataIndex: 'paid',
            key: 'paid',
            render: (paid: boolean) => (
                <Tag color="green" icon={<CheckCircleOutlined />}>
                    Paid
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: Invoice) => (
                <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => onViewDetails?.(record)}
                    title="View Details"
                />
            )
        }
    ]

    return (
        <Card title="Invoices" className="mb-6">
            <Table
                columns={columns}
                dataSource={invoices}
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

export default InvoiceList