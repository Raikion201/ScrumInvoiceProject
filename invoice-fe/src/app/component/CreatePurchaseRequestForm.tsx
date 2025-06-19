'use client'

import React, { useState } from 'react'
import { Form, Input, InputNumber, DatePicker, Button, Card, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { usePurchaseRequestStore } from '../store/purchaseRequestStore'
import { PurchaseRequest } from '../services/apiService'
import dayjs from 'dayjs'

const { TextArea } = Input

interface CreatePurchaseRequestFormProps {
    onSuccess?: () => void
}

const CreatePurchaseRequestForm: React.FC<CreatePurchaseRequestFormProps> = ({ onSuccess }) => {
    const [form] = Form.useForm()
    const { createPurchaseRequest, loading } = usePurchaseRequestStore()
    const [visible, setVisible] = useState(false)

    const handleSubmit = async (values: any) => {
        const purchaseRequestData: PurchaseRequest = {
            customerName: values.customerName,
            customerEmail: values.customerEmail,
            description: values.description,
            totalAmount: values.totalAmount,
            depositAmount: values.depositAmount || 0,
            dueDate: values.dueDate.format('YYYY-MM-DD'),
            status: 'PENDING',
            isPaid: false,
            invoiceDate: dayjs().format('YYYY-MM-DD'),
            invoiceNumber: `PR-${Date.now()}`
        }

        await createPurchaseRequest(purchaseRequestData)
        form.resetFields()
        setVisible(false)
        onSuccess?.()
    }

    const showForm = () => setVisible(true)
    const hideForm = () => setVisible(false)

    return (
        <div style={{ padding: '20px' }}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showForm}
                size="large"
                className="mb-4"
            >
                Create Purchase Request
            </Button>

            {visible && (
                <Card title="Create New Purchase Request" style={{marginTop: '20px'}}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            depositAmount: 0
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                name="customerName"
                                label="Customer Name"
                                rules={[{ required: true, message: 'Please enter customer name' }]}
                            >
                                <Input placeholder="Enter customer name" />
                            </Form.Item>

                            <Form.Item
                                name="customerEmail"
                                label="Customer Email"
                                rules={[
                                    { required: true, message: 'Please enter customer email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Enter customer email" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please enter description' }]}
                                className="md:col-span-2"
                            >
                                <TextArea rows={3} placeholder="Enter description" />
                            </Form.Item>

                            <Form.Item
                                name="totalAmount"
                                label="Total Amount"
                                rules={[
                                    { required: true, message: 'Please enter total amount' },
                                    { type: 'number', min: 0, message: 'Amount must be positive' }
                                ]}
                            >
                                <InputNumber
                                    placeholder="Enter total amount"
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="depositAmount"
                                label="Deposit Amount"
                                rules={[
                                    { type: 'number', min: 0, message: 'Deposit must be non-negative' }
                                ]}
                            >
                                <InputNumber
                                    placeholder="Enter deposit amount"
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="dueDate"
                                label="Due Date"
                                rules={[{ required: true, message: 'Please select due date' }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    placeholder="Select due date"
                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item className="mb-0">
                            <Space>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Create Purchase Request
                                </Button>
                                <Button onClick={hideForm}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            )}
        </div>
    )
}

export default CreatePurchaseRequestForm 