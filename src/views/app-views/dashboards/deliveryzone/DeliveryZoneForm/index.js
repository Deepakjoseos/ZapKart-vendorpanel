import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import deliveryZoneService from 'services/deliveryZone'
import { useHistory } from 'react-router-dom'
import Utils from 'utils'
import localityService from 'services/locality'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [allTreesData, setAllTreesData] = useState([])
  // const [defaultDeliveryLocations, setDefaultDeliveryLocations] = useState([])
  const [
    checkedDeliveryZoneSendingValues,
    setCheckedDeliveryZoneSendingValues,
  ] = useState([])

  useEffect(() => {
    if (mode === EDIT) {
      const fetchDeliveryZoneById = async () => {
        const { id } = param
        const data = await deliveryZoneService.getDeliveryZoneById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
          })
          setCheckedDeliveryZoneSendingValues(
            data.deliveryLocations?.map((cur) => ({
              id: cur?.deliveryLocationId,
              key: cur?.deliveryLocationId,
              deliveryZoneName: cur?.deliveryLocationType,
              fromInitial: true,
            }))
          )
        } else {
          history.replace('/app/dashboards/deliveryzone/deliveryzone-list')
        }
      }

      fetchDeliveryZoneById()
    }
  }, [form, mode, param, props])

  const getCountry = async () => {
    const data = await localityService.getCountry()

    if (data) {
      const list = Utils.createDeliveryLocationList(data?.data)

      console.log(list, 'hukjbujk')
      setAllTreesData(list)
    }
  }

  useEffect(() => {
    getCountry()
  }, [])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          name: values?.name,
          status: values?.status,
          deliveryLocations: checkedDeliveryZoneSendingValues?.map((cur) => ({
            deliveryLocationId: cur?.id,
            deliveryLocationType: cur?.deliveryZoneName,
          })),
        }
        if (mode === ADD) {
          const created = await deliveryZoneService.createDeliveryZone(
            sendingValues
          )
          if (created) {
            message.success(
              `Created ${sendingValues.name} to Delivery Zone List`
            )
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await deliveryZoneService.editDeliveryZone(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.name} to Delivery Zone list`)
            history.goBack()
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
          isFinal: false,
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD'
                  ? 'Add New Delivery Zone'
                  : `Edit Delivery Zone`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/deliveryzone/deliveryzone-list'
                    )
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                allTreesData={allTreesData}
                setAllTreesData={setAllTreesData}
                setCheckedDeliveryZoneSendingValues={
                  setCheckedDeliveryZoneSendingValues
                }
                checkedDeliveryZoneSendingValues={
                  checkedDeliveryZoneSendingValues
                }
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
