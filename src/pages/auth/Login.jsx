import React, { useCallback, useEffect, useState } from 'react'
import Btn from '../../components/DKG_Btn'
import {ReactComponent as Logo} from '../../assets/images/logo.svg'
import FormBody from '../../components/DKG_FormBody'
import FormInputItem from '../../components/DKG_FormInputItem'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../../components/DKG_FormContainer'
import { getOngoingSmsDutyDtls } from '../../store/slice/smsDutySlice'
import { getOngoingRollingDutyDtls } from '../../store/slice/rollingDutySlice'
import { getOngoingViDutyDtls } from '../../store/slice/viDutySlice'
import { getOngoingCalibrationDutyDtls } from '../../store/slice/calibrationDutySlice'
import { getOngoingNdtDutyDtls } from '../../store/slice/ndtDutySlice'
import { getOngoingWeldingDutyDtls } from '../../store/slice/weldingDutySlice'
import { getOngoingQctDutyDtls } from '../../store/slice/qctDutySlice'
import { getOngoingSriDutyDtls } from '../../store/slice/sriDutySlice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = useSelector(state => state.auth);
  const handleFormSubmit = async () => {
    try{

      await dispatch(login(formData)).unwrap()
      // await dispatch(getOngoingSmsDutyDtls()).unwrap()
      // await dispatch(getOngoingRollingDutyDtls()).unwrap()
      // await dispatch(getOngoingViDutyDtls()).unwrap()
      // await dispatch(getOngoingCalibrationDutyDtls()).unwrap()
      // await dispatch(getOngoingNdtDutyDtls()).unwrap()
      // await dispatch(getOngoingWeldingDutyDtls()).unwrap()
      // await dispatch(getOngoingQctDutyDtls()).unwrap()
      // await dispatch(getOngoingSriDutyDtls()).unwrap()
      navigate('/')
    }
    catch(error){

    }
  }

  const [formData, setFormData] = useState(
    {
      userId: '',
      password: ''
    }
  )

  const handleFormValueChange = (fieldName, value) => {
    setFormData(prev=> {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const populateAllOngoingDutyDtls = useCallback(async () => {
    try{
      await dispatch(getOngoingSmsDutyDtls()).unwrap()
      await dispatch(getOngoingRollingDutyDtls()).unwrap()
      await dispatch(getOngoingCalibrationDutyDtls()).unwrap()
      await dispatch(getOngoingNdtDutyDtls()).unwrap()
      await dispatch(getOngoingViDutyDtls()).unwrap()
      await dispatch(getOngoingSriDutyDtls()).unwrap()
      navigate("/");
    }
    catch(error){
      
    }

  }, [dispatch, navigate])

  useEffect(() => {
    if(token){
      populateAllOngoingDutyDtls()
    }
  }, [token, populateAllOngoingDutyDtls])
  return (
    <>
      <header className='bg-darkBlue text-offWhite p-4 fixed top-0 w-full z-30'>
        <h1>Log In</h1>
      </header>
    <FormContainer className='mt-20 main-content border-none !shadow-none'>
      <main className='w-full p-4 flex flex-col h-fit justify-center items-center gap-8 bg-white relative z-20 rounded-md'>
        <Logo width={300} height={200} />
        <FormBody onFinish={handleFormSubmit} initialValues={formData}>
          <FormInputItem label="Employee ID" placeholder="123456" name='userId' onChange={handleFormValueChange} required />
          <FormInputItem label="Password" placeholder="*****" name='password' onChange={handleFormValueChange} required />
          <Btn htmlType="submit" text="submit"/>
        </FormBody>

        <h2 className='text-gray-500'>Account credentials unavailable ? <br /> Request Admin for your credentials.</h2>
      </main>
    </FormContainer>
    </>
  )
}

export default Login
