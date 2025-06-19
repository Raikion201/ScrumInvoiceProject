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
import BillsList from './BillsList'
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
        bills = [],
        invoices = [], 
        fetchPurchaseRequests,
        fetchBills,
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
        fetchBills();
        fetchInvoices();
        fetchDashboardStatistics();
    }, [fetchPurchaseRequests, fetchBills, fetchInvoices, fetchDashboardStatistics])

    // Set active tab based on URL parameter
    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab === 'invoices') {
            setActiveTab('invoices')
        }
    }, [searchParams])

    // Safely filter requests and invoices
    const pendingRequests = purchaseRequests.length;
    const shippedRequests = bills.length;
    const paidRequests = invoices.length;

    // Use dashboard stats if available
    const pendingCount = dashboardStats?.countByStatus?.PENDING || pendingRequests;
    const shippedCount = dashboardStats?.countByStatus?.SHIPPED || shippedRequests;
    const paidCount = dashboardStats?.countByStatus?.PAID || paidRequests;
    const overdueCount = dashboardStats?.overdueCount || 0;

    // Define unpaid and paid invoices
    const unpaidInvoices = invoices.filter(invoice => !invoice.paid);
    const paidInvoices = invoices.filter(invoice => invoice.paid).length; // Add this line to define paidInvoices

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
            case 'SHIPPED': return 'blue';
            case 'PAID': return 'green';
            default: return 'default';
        }
    }

    return (
        <div style={{padding:"6px"}} className="p-6">
        

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
                            title="Shipped (Bills)"
                            value={shippedCount}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                            loading={loading}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Paid (Invoices)"
                            value={paidCount}
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
                            value={unpaidInvoices.length} // Use unpaidInvoices here
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
                            value={paidInvoices} // Now this variable is properly defined
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
            <CreatePurchaseRequestForm  onSuccess={handleRefresh} />

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
                                Purchase Requests ({purchaseRequests.length})
                            </span>
                        ),
                        children: <PurchaseRequestList onViewDetails={handleViewPurchaseRequest} />,
                    },
                    {
                        key: 'bills',
                        label: (
                            <span>
                                <FileTextOutlined />
                                Bills ({bills.length})
                            </span>
                        ),
                        children: <BillsList onViewDetails={handleViewPurchaseRequest} />,
                    },
                    {
                        key: 'invoices',
                        label: (
                            <span>
                                <DollarOutlined />
                                Invoices ({invoices.length})
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