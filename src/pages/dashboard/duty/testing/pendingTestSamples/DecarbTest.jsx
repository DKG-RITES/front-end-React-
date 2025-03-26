import React, { useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import FormInputItem from '../../../../../components/DKG_FormInputItem'
import { Select, Form } from 'antd';
import { testStatusDropdown } from '../../../../../utils/Constants';
import Btn from '../../../../../components/DKG_Btn';
import { useLocation } from 'react-router-dom';

const DecarbTest = () => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {

    }

    const state = useLocation().state;
    const {heatNo, strand, sampleId, sampleLot, sampleType} = state;

    const [formData, setFormData] = useState({
        heatNumber: heatNo,
        strandNumber: strand,
        sampleId: sampleId,
        sampleLot: sampleLot,
        sampleType: sampleType,
        testType: "DECARB",
        decarbStatus: "",
        decarb1: "",
        decarb2: "",
        decarb3: ""
    })

    const handleChange = (fieldName, value) => {
      setFormData(prev => {
        return {
         ...prev,
          [fieldName]: value
        }
      })
    }

    return (
        <div>
            <SubHeader
                title="Decarb Test"
                link={"/testing/pendingTestSamples"}
            />
            <FormContainer>
                <Form form={form} layout="vertical" className='grid grid-cols-2 gap-x-2' initialValues={formData} onFinish={handleSubmit}>
                    <FormInputItem label="Heat No." name="heatNumber" disabled className='col-span-2' />
                    <FormInputItem label="Strand" name="strandNumber" disabled />
                    <FormInputItem label="SampleLot" name="sampleLot" disabled />
                    <FormInputItem label="Sample Type" name="sampleType" disabled />
                    <FormInputItem label="Sample ID" name="sampleId" disabled />

                    <FormInputItem label="Decarb 1" name="decarb1" onChange={handleChange}/>
                    <FormInputItem label="Decarb 2" name="decarb2" onChange={handleChange}/>
                    <FormInputItem label="Decarb 3" name="decarb3" onChange={handleChange}/>
                    
                    <Form.Item
                        label="Decarb Test Status"
                        name="decarbStatus"
                    >
                        <Select options={testStatusDropdown} onChange={(val) => handleChange("decarbStatus", val)}/>
                    </Form.Item>

                    <Btn htmlType='submit' text="SAVE" />
                </Form>
            </FormContainer>
        </div>
    )
}

export default DecarbTest