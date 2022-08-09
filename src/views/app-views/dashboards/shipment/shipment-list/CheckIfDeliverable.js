import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  notification,
  Drawer,
  Form,
  Row,
  Col,
  InputNumber,
  message,
} from 'antd'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import shipmentService from 'services/shipment'

const { Option } = Select

const CheckIfDeliverable = ({
  setCheckIfDeliverableOpen,
  checkIfDeliverableOpen,
}) => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)

  const [form] = Form.useForm()

  const rules = {
    pickup_postcode: [
      {
        required: true,
        message: 'Required',
      },
    ],

    delivery_postcode: [
      {
        required: true,
        message: 'Required',
      },
    ],
    cod: [
      {
        required: true,
        message: 'Required',
      },
    ],
    weight: [
      {
        required: true,
        message: 'Required',
      },
    ],
  }

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Courier name',
      dataIndex: 'courier_name',

      sorter: (a, b) => utils.antdTableSorter(a, b, 'courier_name'),
    },
    {
      title: 'Cash On Delivery Available',
      dataIndex: 'cod',
      render: (text) => <div>{text === 1 ? 'Yes' : 'No'}</div>,
    },
    {
      title: 'Estimate Time Delivery',
      dataIndex: 'etd',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      title: 'Volumetric Max weight (Kg)',
      dataIndex: 'volumetric_max_weight',
    },
    {
      title: 'Min Weight (Kg)',
      dataIndex: 'min_weight',
    },
  ]

  // When Search is used
  //   const onSearch = (e) => {
  //     const value = e.currentTarget.value
  //     const searchArray = e.currentTarget.value ? list : searchBackupList
  //     const data = utils.wildCardSearch(searchArray, value)
  //     setList(data)
  //     setSelectedRowKeys([])
  //   }

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const resp = await shipmentService.checkIfDeliverable(values)
        if (resp) {
          setList(resp)
          setSearchBackupList(resp)

          setSubmitLoading(false)
        } else {
          setSubmitLoading(false)
          setList([])
          setSearchBackupList([])
        }
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
    setSubmitLoading(false)
  }

  // Table Filters JSX Elements
  const filters = () => (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      initialValues={{
        status: 'Hold',
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={6}>
          {/* <Card title="Basic Info"> */}
          <Form.Item
            name="pickup_postcode"
            label="Pickup Postcode"
            rules={rules.pickup_postcode}
          >
            <Input placeholder="Pickup Postcode" />
          </Form.Item>

          {/* </Card> */}
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item
            name="delivery_postcode"
            label="Delivery Postcode"
            rules={rules.delivery_postcode}
          >
            <Input placeholder="Delivery Postcode" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item name="cod" label="Is Cash on Delivery" rules={rules.cod}>
            <Select placeholder="Is Cash on Delivery">
              <Option value={1}>Yes</Option>
              <Option value={0}>No</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item name="weight" label="Weight" rules={rules.weight}>
            <InputNumber
              placeholder="Weight"
              style={{ width: '100%' }}
              // size="large"
              min={0}
              max={100000}
              addonAfter="kg"
            />
          </Form.Item>
        </Col>
        <Button
          className="ml-auto"
          type="primary"
          onClick={onFinish}
          loading={submitLoading}
        >
          Check Deliverable
        </Button>
      </Row>
    </Form>
  )

  return (
    <Drawer
      title="Check If Deliverable"
      width="100%"
      onClose={() => setCheckIfDeliverableOpen(false)}
      visible={checkIfDeliverableOpen}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
    >
      <Card>
        {filters()}
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
    </Drawer>
  )
}

export default CheckIfDeliverable
