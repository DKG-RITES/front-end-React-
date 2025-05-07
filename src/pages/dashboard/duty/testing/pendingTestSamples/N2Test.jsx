import React, { useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import FormInputItem from '../../../../../components/DKG_FormInputItem'
import { Select, Form, message } from 'antd';
import { testStatusDropdown } from '../../../../../utils/Constants';
import Btn from '../../../../../components/DKG_Btn';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiCall } from '../../../../../utils/CommonFunctions';

const N2Test = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const {dutyId} = useSelector(state => state.testingDuty)
    const {token} = useSelector(state => state.auth)
    const handleSubmit = async () => {
        try{
            await apiCall("POST", "/testing/completeTest", token, {...formData, dutyId})
            message.success("Test Saved Successfully")
            navigate("/testing/home")
        }
        catch(error){}
    }
    const state = useLocation().state;
    const {heatNo, strand, sampleId, sampleLot, sampleType} = state;

    const [formData, setFormData] = useState({
        heatNumber: heatNo,
        strandNumber: strand,
        sampleId: sampleId,
        sampleLot: sampleLot,
        sampleType: sampleType,
        testType: "N2",
        n2Status: "",
        n2: ""
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
                title="N2 Test"
                link={"/testing/pendingTestSamples"}
            />
            <FormContainer>
                <Form form={form} layout="vertical" className='grid grid-cols-2 gap-x-2' initialValues={formData} onFinish={handleSubmit}>
                    <FormInputItem label="Heat No." name="heatNumber" disabled className='col-span-2' />
                    <FormInputItem label="Strand" name="strandNumber" disabled />
                    <FormInputItem label="SampleLot" name="sampleLot" disabled />
                    <FormInputItem label="Sample Type" name="sampleType" disabled />
                    <FormInputItem label="Sample ID" name="sampleId" disabled />

                    <FormInputItem label="N2" name="n2" onChange={handleChange}/>
                    
                    <Form.Item
                        label="N2 Test Status"
                        name="n2Status"
                    >
                        <Select options={testStatusDropdown} onChange={(val) => handleChange("n2Status", val)}/>
                    </Form.Item>

                    <Btn htmlType='submit' text="SAVE" />
                </Form>
            </FormContainer>
        </div>
    )
}

export default N2Test