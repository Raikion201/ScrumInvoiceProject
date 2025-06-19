'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, Card, Typography, Space, Statistic, Row, Col, Spin, Alert, List, Tag } from 'antd'
import {
    FileTextOutlined,
    CheckCircleOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    WarningOutlined
} from '@ant-design/icons'
import { usePurchaseRequestStore } from '../store/purchaseRequestStore'
import CreatePurchaseRequestForm from './CreatePurchaseRequestForm'
import PurchaseRequestList from './PurchaseRequestList'
import InvoiceList from './InvoiceList'
import PurchaseRequestDetailModal from './PurchaseRequestDetailModal'
import InvoiceDetailModal from './InvoiceDetailModal'
import { PurchaseRequest, Invoice } from '../services/apiService'
import dayjs from 'dayjs'

const { Title, Text } = Typography
const { TabPane } = Tabs

const Dashboard: React.FC = () => {
    const searchParams = useSearchParams()
    const { 
        purchaseRequests = [], 
        invoices = [], 
        fetchPurchaseRequests,
        fetchInvoices,
        fetchDashboardStatistics,
        dashboardStats,
        loading,
        error
    } = usePurchaseRequestStore()
    const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState<PurchaseRequest | null>(null)
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
    const [purchaseRequestModalVisible, setPurchaseRequestModalVisible] = useState(false)
    const [invoiceModalVisible, setInvoiceModalVisible] = useState(false)
    const [activeTab, setActiveTab] = useState('purchase-requests')

    // Fetch data when component mounts
    useEffect(() => {
        console.log("Dashboard: Fetching data...");
        fetchPurchaseRequests();
        fetchInvoices();
        fetchDashboardStatistics();
    }, [fetchPurchaseRequests, fetchInvoices, fetchDashboardStatistics])

    // Set active tab based on URL parameter
    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab === 'invoices') {
            setActiveTab('invoices')
        }
    }, [searchParams])

    // Safely filter requests and invoices - guaranteed to be arrays now
    const pendingRequests = purchaseRequests.filter(req => req?.status === 'PENDING').length;
    const deliveredRequests = purchaseRequests.filter(req => req?.status === 'DELIVERED').length;
    const convertedRequests = purchaseRequests.filter(req => req?.status === 'CONVERTED_TO_INVOICE').length;
    const unpaidInvoices = invoices.filter(inv => inv && !inv.paid).length;
    const paidInvoices = invoices.filter(inv => inv && inv.paid).length;

    // Use dashboard stats if available
    const pendingCount = dashboardStats?.countByStatus?.PENDING || pendingRequests;
    const deliveredCount = dashboardStats?.countByStatus?.DELIVERED || deliveredRequests;
    const convertedCount = dashboardStats?.countByStatus?.CONVERTED_TO_INVOICE || convertedRequests;
    const overdueCount = dashboardStats?.overdueCount || 0;

    const handleViewPurchaseRequest = (request: PurchaseRequest) => {
        setSelectedPurchaseRequest(request)
        setPurchaseRequestModalVisible(true)
    }

    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice)
        setInvoiceModalVisible(true)
    }

    const handleRefresh = () => {
        fetchPurchaseRequests();
        fetchInvoices();
        fetchDashboardStatistics();
        console.log("Dashboard: Manually refreshing data...");
    }

    const handleTabChange = (key: string) => {
        setActiveTab(key)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'orange';
            case 'DELIVERED': return 'blue';
            case 'CONVERTED_TO_INVOICE': return 'green';
            default: return 'default';
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Title level={2}>Invoice Management Dashboard</Title>
                    <p className="text-gray-600">Manage purchase requests, deliveries, and invoices</p>
                </div>
                <button 
                    onClick={handleRefresh} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Refresh Data
                </button>
            </div>

            {error && (
                <Alert
                    message="Error Loading Data"
                    description={error}
                    type="error"
                    className="mb-6"
                    showIcon
                    closable
                />
            )}

            {/* Statistics Cards */}
            <Row gutter={16} className="mb-6">
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Pending Requests"
                            value={pendingCount}
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: '#fa8c16' }}
                            loading={loading}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Delivered"
                            value={deliveredCount}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                            loading={loading}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Converted"
                            value={convertedCount}
                            prefix={<FileTextOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                            loading={loading}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Unpaid Invoices"
                            value={unpaidInvoices}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#ff4d4f' }}
                            loading={loading}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Paid Invoices"
                            value={paidInvoices}
                            prefix={<FileTextOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                            loading={loading}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Overdue"
                            value={overdueCount}
                            prefix={<WarningOutlined />}
                            valueStyle={{ color: '#ff4d4f' }}
                            loading={loading}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Recent Activity Section */}
            {dashboardStats?.latestRequests && (
                <Card title="Recent Purchase Requests" className="mb-6">
                    <List
                        itemLayout="horizontal"
                        dataSource={dashboardStats.latestRequests}
                        loading={loading}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <a key="view" onClick={() => handleViewPurchaseRequest(item)}>
                                        View
                                    </a>
                                ]}
                            >
                                <List.Item.Meta
                                    title={<span>{item.customerName} - ${item.totalAmount?.toFixed(2)}</span>}
                                    description={
                                        <div>
                                            <div>{item.description}</div>
                                            <div>
                                                <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                                                <span className="ml-2">
                                                    Due: {dayjs(item.dueDate).format('MMM DD, YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            )}

            {/* Create Purchase Request Form */}
            <CreatePurchaseRequestForm onSuccess={handleRefresh} />

            {/* Main Content Tabs */}
            <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                defaultActiveKey="purchase-requests"
                size="large"
                items={[
                    {
                        key: 'purchase-requests',
                        label: (
                            <span>
                                <FileTextOutlined />
                                Purchase Requests ({Array.isArray(purchaseRequests) ? purchaseRequests.length : 0})
                            </span>
                        ),
                        children: <PurchaseRequestList onViewDetails={handleViewPurchaseRequest} />,
                    },
                    {
                        key: 'invoices',
                        label: (
                            <span>
                                <DollarOutlined />
                                Invoices ({Array.isArray(invoices) ? invoices.length : 0})
                            </span>
                        ),
                        children: <InvoiceList onViewDetails={handleViewInvoice} />,
                    },
                ]}
            />

            {/* Detail Modals */}
            <PurchaseRequestDetailModal
                visible={purchaseRequestModalVisible}
                onClose={() => {
                    setPurchaseRequestModalVisible(false)
                    setSelectedPurchaseRequest(null)
                }}
                purchaseRequest={selectedPurchaseRequest}
            />

            <InvoiceDetailModal
                visible={invoiceModalVisible}
                onClose={() => {
                    setInvoiceModalVisible(false)
                    setSelectedInvoice(null)
                }}
                invoice={selectedInvoice}
            />
        </div>
    )
}

export default Dashboard