import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select } from 'antd'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  status: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = () => (
  <Card title="Basic Info">
    <Form.Item name="name" label="Name" rules={rules.name}>
      <Input placeholder="Name" />
    </Form.Item>

    <Form.Item name="status" label="Status" rules={rules.status}>
      <Select placeholder="Status">
        <Option value="Active">Active</Option>
        <Option value="Hold">Hold</Option>
      </Select>
    </Form.Item>
  </Card>
)

export default GeneralField
