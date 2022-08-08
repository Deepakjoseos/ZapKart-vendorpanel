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
} from 'antd'
// import ShipmentListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import shipmentService from 'services/shipment'

const { Option } = Select

const getStockStatus = (status) => {
  if (status === 'Active') {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    )
  }
  if (status === 'Hold') {
    return (
      <>
        <Tag color="orange">Hold</Tag>
      </>
    )
  }

  if (status === 'Deleted') {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    )
  }
  return null
}
const ShipmentList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    // Getting Brands List to display in the table
    const getShipments = async () => {
      const data = await shipmentService.getShipments()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    getShipments()
  }, [])

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      {/* <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item> */}
    </Menu>
  )

  const addProduct = () => {
    history.push(`/app/dashboards/shipment/add-shipment`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/shipment/edit-shipment/${row.id}`)
  }

  // For deleting a row
  // const deleteRow = async (row) => {
  //   const resp = await shipmentService.dele(row.id)

  //   if (resp) {
  //     const objKey = 'id'
  //     let data = list
  //     if (selectedRows.length > 1) {
  //       selectedRows.forEach((elm) => {
  //         data = utils.deleteArrayRow(data, objKey, elm.id)
  //         setList(data)
  //         setSelectedRows([])
  //       })
  //     } else {
  //       data = utils.deleteArrayRow(data, objKey, row.id)
  //       setList(data)
  //     }
  //   }
  // }

  const requestPickupOrder = async (shipmentId) => {
    const resp = await shipmentService.requestPickupOrder({ shipmentId })
    if (resp) {
      notification.success({
        message: 'Success',
        description: 'Request pickup order successfully',
      })
    }
  }

  const cancelShipment = async (shipmentId) => {
    const resp = await shipmentService.shipmentCancel({ shipmentId })
    if (resp) {
      notification.success({
        message: 'Success',
        description: 'Cancel shipment successfully',
      })
    }
  }

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Shipment',
      dataIndex: 'items',
      render: (_, record) => (
        <div>
          {record.items.map((item, index) => (
            <>
              <div>{`OrderId: ${item?.orderId}`}</div>
              <div>Products: {item?.items?.map((cur) => `${cur.name}, `)}</div>
            </>
          ))}
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'shippedByVendor',
      dataIndex: 'shippedByVendor',
      render: (text) => <div>{text ? 'Yes' : 'No'}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <Flex>
          <Button
            type="primary"
            className="ml-auto"
            onClick={() => requestPickupOrder(elm.id)}
          >
            Request Shipment
          </Button>
          <Button
            className="mr-auto ml-2"
            onClick={() => cancelShipment(elm.id)}
          >
            Cancel Shipment
          </Button>

          <div className="text-right">
            <EllipsisDropdown menu={dropdownMenu(elm)} />
          </div>
        </Flex>
      ),
    },
  ]

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status'
      const data = utils.filterArray(searchBackupList, key, value)
      setList(data)
    } else {
      setList(searchBackupList)
    }
  }

  // Table Filters JSX Elements
  const filters = () => (
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mb-3">
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
      </div>
    </Flex>
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Shipment
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default ShipmentList