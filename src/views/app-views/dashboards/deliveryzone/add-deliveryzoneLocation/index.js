import { Button, Card, Divider, List, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import deliveryZoneService from 'services/deliveryZone'
import deliveryLocationService from 'services/deliveryLocation'
import Flex from 'components/shared-components/Flex'
import { useParams } from 'react-router-dom'

const DeliveryZoneLocation = ({ history }) => {
  const { Option } = Select
  const [deliveryZoneLocation, setDeliveryZoneLocation] = useState([])
  const [deliveryLocations, setDeliveryLocations] = useState([])
  const [selectedDeliveryLocationId, setSelectedDeliveryLocationId] =
    useState(null)

  const { id } = useParams()

  const getDeliveryLocations = async () => {
    const data = await deliveryLocationService.getDeliveryLocations()

    if (data) {
      const onlyActiveDeliveryLocations = data.filter(
        (cur) => cur.status !== 'Hold'
      )
      setDeliveryLocations(onlyActiveDeliveryLocations)
    }
  }

  const fetchDeliveryZoneById = async () => {
    const data = await deliveryZoneService.getDeliveryZoneById(id)
    if (data) {
      setDeliveryZoneLocation(data.deliveryLocations)
    } else {
      history.replace('/app/dashboards/deliveryzone/deliveryzone-list')
    }
  }

  useEffect(() => {
    fetchDeliveryZoneById()
    getDeliveryLocations()
  }, [])

  const onAddHandler = async (deliveryZoneId, deliveryLocationId) => {
    const data = await deliveryZoneService.addDeliveryLocationZone(
      deliveryZoneId,
      deliveryLocationId
    )
    if (data) {
      fetchDeliveryZoneById()
    }
  }

  const onDeleteHandler = async (deliveryZoneId, deliveryLocationId) => {
    const data = await deliveryZoneService.removeDeliveryLocationZone(
      deliveryZoneId,
      deliveryLocationId
    )
    if (data) {
      fetchDeliveryZoneById()
    }
  }

  return (
    <Card title="Delivery Locations">
      <Flex>
        <Select
          placeholder="Delivery Locations"
          className="w-50 mr-2"
          onChange={(val) => setSelectedDeliveryLocationId(val)}
        >
          {deliveryLocations?.map((cur) => (
            <Option value={cur.id}>{cur.name}</Option>
          ))}
        </Select>
        <Button
          icon={<CheckCircleOutlined />}
          onClick={() => onAddHandler(id, selectedDeliveryLocationId)}
        />
      </Flex>
      <div className="w-50 mt-3">
        {/* <Divider orientation="left">Delivery Locations</Divider> */}
        <List
          //   header={<div>Header</div>}
          //   footer={<div>Footer</div>}
          bordered
          dataSource={deliveryZoneLocation}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <List.Item.Meta
                title={<Typography.Text>{item.name}</Typography.Text>}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => onDeleteHandler(id, item.id)}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  )
}

export default DeliveryZoneLocation
