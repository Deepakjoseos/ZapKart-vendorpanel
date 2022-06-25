import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message } from 'antd'
import firebase from 'firebase/app'

export class ChangePassword extends Component {
  changePasswordFormRef = React.createRef()

  onFinish = (values) => {
    console.log('val', values)

    firebase
      .auth()
      .currentUser.updatePassword(values.newPassword)
      .then(() => {
        // Update successful.
        message.success({ content: 'Password Changed!', duration: 2 })
      })
      .catch((err) => {
        // An error ocurred
        message.error({ content: err.code, duration: 2 })
        // ...
      })

    this.onReset()
  }

  onReset = () => {
    this.changePasswordFormRef.current.resetFields()
  }

  render() {
    return (
      <>
        <h2 className="mb-4">Change Password</h2>
        <Row>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Form
              name="changePasswordForm"
              layout="vertical"
              ref={this.changePasswordFormRef}
              onFinish={this.onFinish}
            >
              {/* <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your currrent password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item> */}
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your new password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject('Password not matched!')
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Change password
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default ChangePassword
