import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Image } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import Flex from "components/shared-components/Flex";
import {CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';

import vendorService from "services/document";
import DocumentForm from "./DocumentForm";


const DocumentUpload = () => {

useEffect(() => {
    getVendorsDocs();
}, [])


const [documentList, setDocumentList] = useState([])
const [openDocumentForm, setOpenDocumentForm] = useState(false)
const [selectedDoc, setSelectedDoc] = useState(null)
const [docLoading, setDocLoading] = useState(false)


const [form] = Form.useForm()

const getVendorsDocs = async() => {
    setDocLoading(true)
    const data = await vendorService.getVendors()
    if(data){
        setDocumentList(data.data.documents)
    }
    setDocLoading(false)
}
 
const onEditDocument = ((doc) => {
    setSelectedDoc(doc)
    setOpenDocumentForm(true)
})

const onDeleteDocument = async(docId) =>{
    setDocLoading(true)
  const deleted = await vendorService.deleteVendorDocument(docId)   
  if(deleted) getVendorsDocs()
}

return(
    <div>
        
        <Flex justifyContent="end">
            <Button
                type="primary"
                className="mr-1"
                icon={<PlusCircleOutlined />}
                onClick={() => {setOpenDocumentForm(true)}}
            />
        </Flex>
        <Row gutter={16}>
            {documentList?.map((doc, index) => (
                <Col xs={24} sm={24} md={12} key={index}>
                   {/* {console.log(documentList, "documentList")} */}
                    <Card
                    title={doc.type}
                    style={{ marginBottom: 30 }}
                    loading={docLoading}
                    // actions={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    extra={
                        <Flex alignItems="center" >
                            <Flex alignItems="left" >
                            </Flex>
                            <Button
                                type="primary"
                                className="mr-1"
                                icon={<EditOutlined />}
                                onClick={() => onEditDocument(doc)}
                            />
                            <Button 
                            type="text"
                            icon ={<DeleteOutlined />}
                            onClick={() => onDeleteDocument(doc.id)}
                            />
                        </Flex>
                    }
                    >
                        {doc.isVerified ?(
                            <Flex 
                            // alignItems="center" 
                            justifyContent="center"
                            >
                                <CheckCircleTwoTone twoToneColor="#52c41a"/>
                                <h4> Verifed</h4>
                            </Flex>
                        ):(
                            <Flex 
                            // alignItems="center"
                            justifyContent="center" 
                            >
                                <CloseCircleOutlined />
                                <h4>Not Verifed</h4>
                            </Flex>
                        )}
                        <Image.PreviewGroup>
                            {doc?.files.map((file, index) => (
                            <Image
                                key={index}
                                height={120}
                                width={120}
                                style={{ objectFit: 'cover' }}
                                src={file}
                            />
                            ))}
                        </Image.PreviewGroup>
                    </Card>
                </Col>)
            )}
                    <DocumentForm 
                    openDocumentForm={openDocumentForm}
                    setOpenDocumentForm={setOpenDocumentForm}
                    form={form}
                    refreshData={getVendorsDocs}
                    selectedDoc={selectedDoc}
                    setSelectedDoc={setSelectedDoc}
                    setDocLoading={setDocLoading}
                />
        </Row>
    </div>
)
}

export default DocumentUpload