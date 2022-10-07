import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  TreeSelect,
} from 'antd'
import React, { useState,useEffect } from 'react'
import authVendorService from 'services/auth/vendor'
import localityService from 'services/locality'
import Utils from 'utils'

const { Option } = Select

const PickupLocationForm = ({ isFormOpen, setIsFormOpen, getProfile}) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [pincode ,setPincode]=useState([])
  const [city ,setCity]=useState([])
  const [state ,setState]=useState([])
  const [form] = Form.useForm()

  const showDrawer = () => {
    setIsFormOpen(true)
  }

  const onClose = () => {
    setIsFormOpen(false)
  }

  const getPincode= async () => {
    const data = await localityService.getPincode()
    const list = Utils.createCategoryList(data)
       setPincode(list)
  }
  const getCity= async () => {
    const data = await localityService.getCity()
    const list = Utils.createCategoryList(data)
       setCity(list)
  }
  const getState= async () => {
    const data = await localityService.getState()
    const list = Utils.createCategoryList(data)
       setState(list)
  }
  useEffect(()=>{
    getPincode()
    getState()
    getCity()
  },[])


  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        values.country = 'India'
        const data = await authVendorService.addPickupLocation(values)

        if (data) {
          message.success('Pickup Location Added Successfully')
          onClose()
          form.resetFields()
          getProfile()
        }
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
    setSubmitLoading(false)
  }

  return (
    <>
      <Drawer
        title="PickLocation Form"
        width={720}
        onClose={onClose}
        visible={isFormOpen}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onFinish}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input placeholder="Phone" type="tel" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name="stateId" label="state" >
      <TreeSelect placeholder="State" showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } treeData={state} treeDefaultExpandAll>
        {/* {deliveryLocations.map((cur) => (
          <Option value={cur.id} key={cur.id}>
            {cur.name}
          </Option>
        ))}  */}
      </TreeSelect>
    </Form.Item>
    </Col>
    </Row>
    
    <Row gutter={16}>
        <Col span={12}>
 <Form.Item name="cityId" label="city" >
      <TreeSelect placeholder="city" showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } treeData={city} treeDefaultExpandAll>
        {/* {deliveryLocations.map((cur) => (
          <Option value={cur.id} key={cur.id}>
            {cur.name}
          </Option>
        ))}  */}
      </TreeSelect>
    </Form.Item>
    </Col>
   
    
        <Col span={12}>
    <Form.Item name="pincodeId" label="pincode" >
      <TreeSelect placeholder="pincode" showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } treeData={pincode} treeDefaultExpandAll>
        {/* {deliveryLocations.map((cur) => (
          <Option value={cur.id} key={cur.id}>
            {cur.name}
          </Option>
        ))}  */}
      </TreeSelect>
    </Form.Item>

            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="address_2" label="Address 2">
                <Input.TextArea rows={4} placeholder="Address 2" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default PickupLocationForm
