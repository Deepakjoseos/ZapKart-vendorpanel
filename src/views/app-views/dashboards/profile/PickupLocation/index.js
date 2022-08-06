import React, { useEffect, useState } from 'react'
import {
  Form,
  Avatar,
  Button,
  Input,
  Row,
  Col,
  Upload,
  Card,
  Space,
  List,
} from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { ROW_GUTTER } from 'constants/ThemeConstant'
import Flex from 'components/shared-components/Flex'
import { useSelector } from 'react-redux'
import authVendorService from 'services/auth/vendor'
import PickupLocationForm from './PickupLocationForm'

const PickupLocation = () => {
  const { user } = useSelector((state) => state.auth)
  const [pickUpLocations, setPickUpLocations] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const getProfile = async () => {
    const data = await authVendorService.getProfile()

    if (data) {
      setPickUpLocations(data.pickupLocations)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">Pickup Location</h2>
          <Button
            type="primary"
            className="mr-4"
            onClick={() => setIsFormOpen(true)}
          >
            Add Pickup Location
          </Button>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 5,
          }}
          dataSource={pickUpLocations}
          //   footer={
          //     <div>
          //       <b>ant design</b> footer part
          //     </div>
          //   }
          renderItem={(item) => (
            <List.Item
              key={item.name}
              // actions={[
              //   <IconText
              //     icon={StarOutlined}
              //     text="156"
              //     key="list-vertical-star-o"
              //   />,
              //   <IconText
              //     icon={LikeOutlined}
              //     text="156"
              //     key="list-vertical-like-o"
              //   />,
              //   <IconText
              //     icon={MessageOutlined}
              //     text="2"
              //     key="list-vertical-message"
              //   />,
              // ]}
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<p>{`${item?.name} (${item?.email})`}</p>}
                description={item?.phone}
              />
              {item?.address}
            </List.Item>
          )}
        />
        <PickupLocationForm
          setIsFormOpen={setIsFormOpen}
          isFormOpen={isFormOpen}
        />
      </div>
    </>
  )
}

export default PickupLocation
