import React, { Component, useEffect, useState } from 'react'
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Card,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { ROW_GUTTER } from 'constants/ThemeConstant'
import Flex from 'components/shared-components/Flex'
import CustomIcon from 'components/util-components/CustomIcon'
import { ImageSvg } from 'assets/svg/icon'
import { useDispatch, useSelector } from 'react-redux'
import useUpload from 'hooks/useUpload'
import Utils from 'utils'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import authVendorService from 'services/auth/vendor'
import { authenticated } from 'redux/actions/Auth'

const EditProfile = () => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  const { user } = useSelector((state) => state.auth)
  console.log(user, 'mine')
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,

        // address:
        'address.line1': user?.address?.line1,
        'address.city': user?.address?.city,
        'address.state': user?.address?.state,
        'address.country': user?.address?.country,
        'address.phone': user?.address?.phone,
        'address.zipcode': user?.address?.zipcode,

        // Bussiness
        'business.name': user?.business?.name,
        'business.address.line1': user?.business?.address?.line1,
        'business.address.city': user?.business?.address?.city,
        'business.address.state': user?.business?.address?.state,
        'business.address.country': user?.business?.address?.country,
        'business.address.phone': user?.business?.address?.phone,
        'business.address.zipcode': user?.business?.address?.zipcode,
      })
      let himg = []

      if (user.displayImage) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(user.displayImage),
            url: user.displayImage,
            thumbUrl: user.displayImage,
          },
        ]
        console.log(user.displayImage, 'jeey', himg)
        setDisplayImage(himg)
        setFileListImages(himg)
      }
    }
  }, [])

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          firstName: values.firstName,
          lastName: values.lastName,
          address: {
            line1: values['address.line1'],
            city: values['address.city'],
            state: values['address.state'],
            country: values['address.country'],
            phone: values['address.phone'],
            zipcode: values['address.zipcode'],
          },
          business: {
            name: values['business.name'],
            address: {
              line1: values['business.address.line1'],
              city: values['business.address.city'],
              state: values['business.address.state'],
              country: values['business.address.country'],
              phone: values['business.address.phone'],
              zipcode: values['business.address.zipcode'],
            },
          },
        }

        if (JSON.stringify(sendingValues.address) === '{}') {
          delete sendingValues.address
        }

        if (JSON.stringify(sendingValues.business) === '{}') {
          delete sendingValues.business
        } else if (JSON.stringify(sendingValues.business.address) === '{}') {
          if (sendingValues.business.name) {
            delete sendingValues.business.address
          } else {
            delete sendingValues.business
          }
        }

        // Checking if image exists
        console.log(values, 'plss')
        if (displayImage?.length !== 0 && displayImage !== null) {
          const imgValue = await singleImageUploader(
            displayImage[0].originFileObj,
            displayImage,
            displayImage[0].url,
            'profile'
          )
          sendingValues.displayImage = imgValue
        } else {
          sendingValues.displayImage = null
        }

        const edited = await authVendorService.editProfile(sendingValues)
        if (edited) {
          message.success(`Edited Profile Successfully`)

          const data = await authVendorService.getProfile()

          console.log(data, 'heteet')
          if (data) {
            const userData = {
              ...user,
              firstName: data.firstName,
              lastName: data.lastName,
              displayImage: data.displayImage,
              address: data.address,
              business: data.business,
            }
            dispatch(
              authenticated({
                user: userData,
                token: window.localStorage.getItem('auth_token'),
              })
            )
          }
        }
      })
      .catch((info) => {
        // setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  // const onFinishFailed = errorInfo => {
  // 	console.log('Failed:', errorInfo);
  // };

  // const onUploadAavater = info => {
  // 	const key = 'updatable';
  // 	if (info.file.status === 'uploading') {
  // 		message.loading({ content: 'Uploading...', key, duration: 1000 });
  // 		return;
  // 	}
  // 	if (info.file.status === 'done') {
  // 		this.getBase64(info.file.originFileObj, imageUrl =>
  // 			this.setState({
  // 				avatarUrl: imageUrl,
  // 			}),
  // 		);
  // 		message.success({ content: 'Uploaded!', key,  duration: 1.5 });
  // 	}
  // };

  const onRemoveAvater = () => {
    // this.setState({
    // 	avatarUrl: ''
    // })
    setDisplayImage(null)
    setPreviewUrl(null)
  }

  // const { name, email, userName, dateOfBirth, phoneNumber, website, address, city, postcode, avatarUrl } = this.state;

  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    if (fileListImages?.length) {
      // Setting Preview
      if (fileListImages?.length > 0 && fileListImages[0]?.originFileObj) {
        setPreviewUrl(URL.createObjectURL(fileListImages[0].originFileObj))
      } else {
        setPreviewUrl(fileListImages[0].url)
      }
      setDisplayImage(fileListImages)
    }
  }, [fileListImages])

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Avatar size={90} src={previewUrl} icon={<UserOutlined />} />
        <div className="ml-3 mt-md-0 mt-3">
          <Upload
            // onChange={onUploadAavater}
            showUploadList={false}
            name="image"
            {...propsImages}
            // action={this.avatarEndpoint}
          >
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button className="ml-2" onClick={onRemoveAvater}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          form={form}
          // initialValues={
          // 	{
          // 		'name': name,
          // 		'email': email,
          // 		'username': userName,
          // 		'dateOfBirth': dateOfBirth,
          // 		'phoneNumber': phoneNumber,
          // 		'website': website,
          // 		'address': address,
          // 		'city': city,
          // 		'postcode': postcode
          // 	}
          // }
          //   onFinish={}
          // onFinishFailed={onFinishFailed}
        >
          {/* <Row gutter={16}>
            <Col xs={24} sm={24} lg={17}> */}
          <Row gutter={ROW_GUTTER}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Card title="Address" style={{ width: '100%' }}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item name="address.line1" label="Line1">
                    <Input placeholder="Line 1" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.city" label="City">
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.state" label="State">
                    <Input placeholder="State" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.country" label="Country">
                    <Input placeholder="Country" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.phone" label="Phone">
                    <Input placeholder="Phone" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.zipcode" label="Zipcode">
                    <Input placeholder="Zipcode" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Bussiness */}

            <Card title="Business">
              <Form.Item name="business.name" label="Bussiness Name">
                <Input placeholder="Bussiness Name" />
              </Form.Item>
              <br />
              <h4>Bussiness Addresss</h4>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item name="business.address.line1" label="Line1">
                    <Input placeholder="Line1" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.city" label="City">
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.state" label="State">
                    <Input placeholder="State" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.country" label="Country">
                    <Input placeholder="Country" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.phone" label="Phone">
                    <Input placeholder="Phone" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.zipcode" label="Zipcode">
                    <Input placeholder="Zipcode" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Row>

          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Save Change
          </Button>
          {/* </Col>
            <Col xs={24} sm={24} md={7}>
              <Card title="Profile Image">
                <Upload listType="picture-card" name="image" {...propsImages}>
                  <CustomIcon className="display-3" svg={ImageSvg} />
                </Upload>
              </Card>
            </Col>
          </Row> */}
        </Form>
      </div>
    </>
  )
}

export default EditProfile
