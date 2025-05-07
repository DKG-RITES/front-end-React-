import React, { useState } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import data from '../../../../../utils/frontSharedData/Testing/Testing.json'
import TabList from "../../../../../components/DKG_TabList";
import testingHomeTabs from '../../../../../utils/frontSharedData/Testing/Testing';
import { Divider, message } from 'antd';
import FormInputItem from '../../../../../components/DKG_FormInputItem'
import Btn from '../../../../../components/DKG_Btn'
import FormBody from '../../../../../components/DKG_FormBody'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { endTestingDuty } from '../../../../../store/slice/testingDutySlice'

// const { testingGeneralInfo } = data;

const TestingHome = () => {
    const navigate = useNavigate();
    const [remarks, setRemarks] = useState('')

    const testingGeneralInfo = useSelector(state => state.testingDuty)

    const dispatch = useDispatch();

    const handleFormSubmit = async () => {
        await dispatch(endTestingDuty({ shiftRemarks: remarks })).unwrap()
        navigate('/')
    }

  return (
    <FormContainer>
        <SubHeader title="Testing - Home" link="/" />
        <GeneralInfo data={testingGeneralInfo} />

        <section className="mt-6">
            <TabList tabList={testingHomeTabs} />
        </section>

        <FormBody initialValues={remarks} onFinish={handleFormSubmit}>
            <Divider className="mt-0" />

            <FormInputItem placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks' required/>
            <div className='flex justify-center'>
                <Btn htmlType='submit' className='w-36'>End Duty</Btn>
            </div>
        </FormBody>
    </FormContainer>
  )
}

export default TestingHome