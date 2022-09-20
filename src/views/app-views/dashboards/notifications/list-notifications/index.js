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
} from 'antd'
// import CustomerListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'


import notificationService from 'services/Notification'

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
const NotificationList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  

  const getNotifications = async () => {
    const data = await notificationService.getNotifications()
    if (data) {
      setList(data)
      setSearchBackupList(data)
      console.log(data, 'show-data')


    }
  }
 

  useEffect(() => {
    getNotifications()
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
  
 

    </Menu>
  )




  // const deleteRow = async (row) => {
  //   const resp = await customerService.deleteUserGroup(row.id)

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
//   const addTaxCategory = () => {
//     history.push(`/app/dashboards/notifications/add-notification`)
//   }



  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    // {
    //   title: 'Listing Type',
    //   dataIndex: 'listingType',
    // },
    // {
    //   title: 'Users',
    //   dataIndex: 'users',
    //   render: (users) => {
    //     return (
    //       <>
    //         {users?.map((item) => (
    //           <>
    //             <p>name:{item.name}</p>

    //           </>
    //         ))}
    //       </>
    //     )
    //   },
    //   // sorter: (a, b) => utils.antdTableSorter(a, b, 'lastname'),
    // },
    // {
    //   title: 'Non Same State',
    //   dataIndex: 'nonSameState',
    //   render: (nonSameState) => {
    //     return (
    //       <>
    //         {nonSameState?.map((item) => (
    //           <>
    //             <p>Type:{item.type}</p>
    //             <p>Percent:{item.percent}</p>

    //           </>
    //         ))}
    //       </>
    //     )
    //   },
    //   // sorter: (a, b) => utils.antdTableSorter(a, b, 'lastname'),
    // },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    // {
    //   title: '',
    //   dataIndex: 'actions',
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       <EllipsisDropdown menu={dropdownMenu(elm)} />
    //     </div>
    //   ),
    // },
  ]

  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }


//   const filters = () => (
//     <Flex className="mb-1" mobileFlex={false}>
//       <div className="mr-md-3 mb-3">
//         <Input
//           placeholder="Search"
//           prefix={<SearchOutlined />}
//           onChange={(e) => onSearch(e)}
//         />
//       </div>
//       <div className="mb-3">
//         <Select
//           className="w-100"
//           style={{ minWidth: 180 }}
//           placeholder="Status"
//         >
//           <Option value="">All</Option>
//           {statuses.map((item) => (
//             <Option key={item.id} value={item}>
//               {item}
//             </Option>
//           ))}
//         </Select>
//       </div>
//     </Flex>
//   )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {/* {filters()} */}
        <div>
          {/* <Button
            onClick={addNotification}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Notification
          </Button> */}
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />


      </div>
    </Card>
  )
}

export default NotificationList
