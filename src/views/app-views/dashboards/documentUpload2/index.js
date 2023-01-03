import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Image } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons'
import Flex from "components/shared-components/Flex";

import vendorService from "services/document";
import DocumentForm from "./DocumentForm";


const DocumentUpload = () => {

useEffect(() => {
    getVendorsDocs();
}, [])


const [documentList, setDocumentList] = useState([])
const [openDocumentForm, setOpenDocumentForm] = useState(false)
const [selectedDoc, setSelectedDoc] = useState(null)


const [form] = Form.useForm()

const getVendorsDocs = async() => {
    const data = await vendorService.getVendors()
    if(data){
        setDocumentList(data.data.documents)
    }
}
 
const onEditDocument = ((doc) => {
    setSelectedDoc(doc)
    setOpenDocumentForm(true)
})

const onDeleteDocument = async(docId) =>{
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
                    extra={
                        <Flex alignItems="center">
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
                />
        </Row>
    </div>
)
}

export default DocumentUpload