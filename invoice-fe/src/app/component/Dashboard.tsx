'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, Card, Typography, Space, Statistic, Row, Col } from 'antd'
import {
    FileTextOutlined,
    CheckCircleOutlined,
    DollarOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'
import { usePurchaseRequestStore } from '../store/purchaseRequestStore'
import CreatePurchaseRequestForm from './CreatePurchaseRequestForm'
import PurchaseRequestList from './PurchaseRequestList'
import InvoiceList from './InvoiceList'
import PurchaseRequestDetailModal from './PurchaseRequestDetailModal'
import InvoiceDetailModal from './InvoiceDetailModal'
import { PurchaseRequest, Invoice } from '../services/apiService'

const { Title } = Typography
const { TabPane } = Tabs

const Dashboard: React.FC = () => {
    const searchParams = useSearchParams()
    const { purchaseRequests, invoices } = usePurchaseRequestStore()
    const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState<PurchaseRequest | null>(null)
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
    const [purchaseRequestModalVisible, setPurchaseRequestModalVisible] = useState(false)
    const [invoiceModalVisible, setInvoiceModalVisible] = useState(false)
    const [activeTab, setActiveTab] = useState('purchase-requests')

    // Set active tab based on URL parameter
    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab === 'invoices') {
            setActiveTab('invoices')
        }
    }, [searchParams])

    const pendingRequests = purchaseRequests.filter(req => req.status === 'PENDING')
    const deliveredRequests = purchaseRequests.filter(req => req.status === 'DELIVERED')
    const convertedRequests = purchaseRequests.filter(req => req.status === 'CONVERTED_TO_INVOICE')
    const unpaidInvoices = invoices.filter(inv => !inv.paid)
    const paidInvoices = invoices.filter(inv => inv.paid)

    const handleViewPurchaseRequest = (request: PurchaseRequest) => {
        setSelectedPurchaseRequest(request)
        setPurchaseRequestModalVisible(true)
    }

    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice)
        setInvoiceModalVisible(true)
    }

    const handleRefresh = () => {
        // The store will automatically refresh when components mount
    }

    const handleTabChange = (key: string) => {
        setActiveTab(key)
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <Title level={2}>Invoice Management Dashboard</Title>
                <p className="text-gray-600">Manage purchase requests, deliveries, and invoices</p>
            </div>

            {/* Statistics Cards */}
            <Row gutter={16} className="mb-6">
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Pending Requests"
                            value={pendingRequests.length}
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Delivered"
                            value={deliveredRequests.length}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Unpaid Invoices"
                            value={unpaidInvoices.length}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#ff4d4f' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Paid Invoices"
                            value={paidInvoices.length}
                            prefix={<FileTextOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>

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
                                Purchase Requests ({purchaseRequests.length})
                            </span>
                        ),
                        children: <PurchaseRequestList onViewDetails={handleViewPurchaseRequest} />,
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