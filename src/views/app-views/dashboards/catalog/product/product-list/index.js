import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Modal,
  notification,
} from 'antd'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileAddOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import productService from 'services/product'
import DeliveryZoneService from 'services/deliveryZone'
import { DownloadOutlined } from '@ant-design/icons'

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
        <Tag color="red">Hold</Tag>
      </>
    )
  }
  return null
}
const ProductList = () => {
  let history = useHistory()
  const fileInputRef = useRef()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [deliveryZones, setDeliveryZones] = useState([])
  const [deliveryZoneId, setDeliveryZoneId] = useState(null)
  const [excelFile, setExcelFile] = useState(null)

  // const getDeliveryZoneName = (id) => {
  //   const deliveryZoneName = await DeliveryZoneService.getDeliveryZoneById(id)
  //   return
  // }

  const getDeliveryZones = async () => {
    const deliveryZonesData = await DeliveryZoneService.getDeliveryZones()
    if (deliveryZonesData) {
      setDeliveryZones(deliveryZonesData)
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      const data = await productService.getProducts()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    getProducts()
  }, [])

  useEffect(() => {
    if (isExcelModalOpen) {
      getDeliveryZones()
    }
  }, [isExcelModalOpen])

  const onExcelSubmit = async () => {
    const sendingData = {
      file: excelFile,
      deliveryZoneId,
    }

    const sendExcelFile = await productService.createProductFromExcel(
      sendingData
    )

    if (sendExcelFile) {
      setIsExcelModalOpen(false)
      setDeliveryZoneId(null)
      setDeliveryZones([])
      setExcelFile(null)
      notification.success({
        message: 'Product Excel File Uploaded',
      })
    }
  }

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  )

  const addProduct = () => {
    history.push(`/app/dashboards/catalog/product/add-product`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/catalog/product/edit-product/${row.id}`)
  }

  const deleteRow = async (row) => {
    const resp = await productService.deleteProduct(row.id)

    if (resp) {
      const objKey = 'id'
      let data = list
      if (selectedRows.length > 1) {
        selectedRows.forEach((elm) => {
          data = utils.deleteArrayRow(data, objKey, elm.id)
          setList(data)
          setSelectedRows([])
        })
      } else {
        data = utils.deleteArrayRow(data, objKey, row.id)
        setList(data)
      }
    }
  }

  const tableColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },

    // {
    //   title: 'MRP Price',
    //   dataIndex: 'mrpPrice',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'mrpPrice'),
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price, row) => {
        return (
          <Flex flexDirection="column">
            <div style={{ color: 'gray', textDecoration: 'line-through' }}>
              {row.mrpPrice}
            </div>{' '}
            <div>{price}</div>
          </Flex>
        )
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      render: (brand) => {
        return <Flex flexDirection="column">{brand?.name}</Flex>
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category) => {
        return <Flex flexDirection="column">{category?.name}</Flex>
      },
    },
    // {
    //   title: 'DeliveryZone',
    //   dataIndex: 'deliveryZone',
    //   render: (deliveryZone) => {
    //     return <Flex>{deliveryZone.name}</Flex>
    //   },
    // },
    {
      title: 'Variant',
      dataIndex: 'variant',
      render: (variant) => {
        return <Flex>{variant?.name}</Flex>
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'deliveryZoneId'),
    },
    {
      title: 'QTY',
      dataIndex: 'qty',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'qty'),
    },
    {
      title: 'approval',
      dataIndex: 'approval',
      // render: (isUnlimited) => <Flex>{isUnlimited ? 'Yes' : 'No'}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  if (process.env.REACT_APP_SITE_NAME === 'zapkart') {
    tableColumns.splice(tableColumns?.length - 4, 0, {
      title: 'Pres Required',
      dataIndex: 'prescriptionRequired',
      render: (prescriptionRequired) => (
        <Flex alignItems="center">{prescriptionRequired ? 'Yes' : 'No'}</Flex>
      ),
    })
  } else if (process.env.REACT_APP_SITE_NAME === 'awen') {
    tableColumns.splice(tableColumns?.length - 4, 0, {
      title: 'Product Buy Type',
      dataIndex: 'acquirementMethod',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'acquirementMethod'),
    })
  }

  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status'
      const data = utils.filterArray(searchBackupList, key, value)
      setList(data)
    } else {
      setList(searchBackupList)
    }
  }

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

  const handleExcelUpload = (e) => {
    let file = e.target.files[0]

    setExcelFile(file)
  }

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
          <Flex>
            <div className="mr-2">
              <Button
                type="primary"
                icon={<FileAddOutlined />}
                onClick={() => setIsExcelModalOpen(true)}
                block
              >
                Excel Upload
              </Button>
            </div>

            <div>
              <Button
                onClick={addProduct}
                type="primary"
                icon={<PlusCircleOutlined />}
                block
              >
                Add Product
              </Button>
            </div>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>

      <Modal
        title="Product Excel Upload"
        visible={isExcelModalOpen}
        onCancel={() => {
          setIsExcelModalOpen(false)
          setExcelFile(null)
          setDeliveryZoneId(null)
        }}
        footer={false}
      >
        <Flex flexDirection="column" alignItems="center">
          <Select
            placeholder="Select Delivery Zone"
            style={{ width: '80%' }}
            className="mb-2"
            onChange={(e) => setDeliveryZoneId(e)}
            value={deliveryZoneId}
          >
            {deliveryZones?.map((zone) => (
              <Option value={zone.id}>{zone.name}</Option>
            ))}
          </Select>
          {deliveryZoneId && (
            <div className="mb-4 mt-4">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => fileInputRef.current.click()}
              >
                Upload Excel File
              </Button>
              <input
                accept=".xls,.xlsx"
                multiple={false}
                ref={fileInputRef}
                type="file"
                onChange={handleExcelUpload}
                hidden
              />
              <p> {excelFile && excelFile?.name}</p>
            </div>
          )}

          <Button type="primary" disabled={!excelFile} onClick={onExcelSubmit}>
            Submit
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default ProductList
