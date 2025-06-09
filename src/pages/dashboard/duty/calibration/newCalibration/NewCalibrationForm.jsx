import React, { useState, useEffect, useCallback } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import data from "../../../../../utils/frontSharedData/calibration/calibration.json";
import { useLocation, useNavigate } from 'react-router-dom';
import { message, Form } from 'antd'
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import CustomDatePicker from '../../../../../components/DKG_CustomDatePicker';
import Btn from '../../../../../components/DKG_Btn';
import { apiCall, handleChange } from '../../../../../utils/CommonFunctions';
import { useSelector } from 'react-redux';
import dayjs from "dayjs";
import FormSearchItem from '../../../../../components/DKG_FormSearchItem';

const { instrumentMapping: sampleData, railSectionList, calResultList } = data;
const currentDate = dayjs();
const dateFormat = "DD/MM/YYYY";

const NewCalibrationForm = () => {
  const location = useLocation();
  const serialNumber = location.state?.serialNumber || null;
  console.log("SERIAL NUMBER: ", serialNumber)
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([]);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    instrumentCategory: null, instrument: null, detail: null, railSection: null, serialNumber: null, calibrationDate: currentDate.format(dateFormat), calibrationResult: null, calibrationValidUpto: null, calibrationExpiryNumberOfDays: null
  })

  const calibrationGeneralInfo = useSelector((state) => state.calibrationDuty);
  const { token } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  useEffect(()=>{
    if(sampleData[formData.instrumentCategory]){
        const instrumentList = sampleData[formData.instrumentCategory].map(inst => {
        return {
            key: inst,
            value: inst
        }
        })
        setInstrumentList([...instrumentList])
    }else {
      setInstrumentList([]);
      setFormData(prevData => ({ ...prevData, instrument: null }));
    }
  }, [formData.instrumentCategory, instrumentCategoryList])

  const handleFormSubmit = async () => {
    try {
      await apiCall("POST", "/calibration/saveCalibration", token, {
        ...formData,
        dutyId: calibrationGeneralInfo.dutyId
      });
      message.success("New / Modify Calibration Data saved succesfully.");
      navigate("/calibration/list");
    } catch (error) {}
  }

  const populateData = () => {
    const instrumentCategoryList = Object.keys(sampleData).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })
    setInstrumentCategoryList([...instrumentCategoryList])
  }

  useEffect(()=> {
    populateData()
  }, [])

  const populateInfo = useCallback( async(serialNumber = null ) => {
    try {
      const { data } = await apiCall(
        "GET",
        `/calibration/getCalibrationDtls?serialNumber=${ serialNumber ? serialNumber : formData?.serialNumber}`,
        token
      );

      const { responseData } = data;

      if (responseData) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }

      setFormData({
        instrumentCategory: responseData?.instrumentCategory || null,
        instrument: responseData?.instrument || null,
        detail: responseData?.detail || null,
        serialNumber: responseData?.serialNumber || null,
        railSection: responseData?.railSection || null,
        calibrationDate: responseData?.calibrationDate || null,
        calibrationResult: responseData?.calibrationResult || null,
        calibrationValidUpto: responseData?.calibrationValidUpto || null,
        calibrationExpiryNumberOfDays: responseData?.notificationAfterDays || null
      });
    }catch (error) {}
  }, [token, formData.serialNumber])

  useEffect(()=> {
    if(serialNumber){
      populateInfo(serialNumber)
    }
  }, [populateInfo, serialNumber])

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  return (
    <FormContainer>
      <SubHeader title='New / Modify Calibration Detail' link='/calibration/list' />
      <GeneralInfo data={calibrationGeneralInfo} />

      <Form initialValues={formData} form={form} layout="vertical" onFinish={handleFormSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          {/* <FormDropdownItem label='Instrument Category' name="instrumentCategory" formField="instrumentCategory" dropdownArray={instrumentCategoryList} valueField='key' visibleField='value' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} disabled={isDisabled} />
          <FormDropdownItem label ='Instrument' name='instrument' formField="instrument" dropdownArray={instrumentList} valueField='key' visibleField='value' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} disabled={isDisabled} /> */}
          <FormDropdownItem label='Instrument Category' name="instrumentCategory" formField="instrumentCategory" dropdownArray={instrumentCategoryList} valueField='key' visibleField='value' onChange={(fieldName, value) => {
            handleChange(fieldName, value, setFormData);
            setFormData(prevData => ({ ...prevData, instrument: null }));
          }} disabled={isDisabled} />
          <FormDropdownItem label ='Instrument' name='instrument' formField="instrument" dropdownArray={instrumentList} valueField='key' visibleField='value' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} disabled={isDisabled} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <FormInputItem label='Instrument Detail' name='detail' placeholder='Enter Instrument Detail' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required disabled={isDisabled} />
          {
            (formData?.instrumentCategory === 'Gauge (Working)' || formData?.instrumentCategory === 'Gauge (Master)') && 
            <FormDropdownItem label='Rail Section' name='railSection' formField="railSection" dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required disabled={isDisabled} />
          }
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>

          <FormSearchItem
            label="Serial Number"
            name="serialNumber"
            onSearch={populateInfo}
            onChange={(fieldName, value) =>
              handleChange(fieldName, value, setFormData)
            }
            required
            rules={[
              { required: true, message: "Serial Number is required" }
            ]}
          />
          {
            (formData?.calibrationResult === 'OK') && 
            <FormInputItem label='Calibration expiry notification no. of days' name='calibrationExpiryNumberOfDays' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} disabled = {isDisabled} />
          }

          {
            (formData?.calibrationResult === 'Not OK') && 
            <FormInputItem label='Cal Expiry No. of Days' name='calibrationExpiryNumberOfDays' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)}/>
          }
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <CustomDatePicker
            label={<span><span style={{ color: "red" }}>*</span> Calibration Date</span>}
            name="calibrationDate"
            defaultValue={formData?.calibrationDate}
            onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)}
            required
            rules={[
              { required: true, message: "Calibration Date is required" }
            ]}
          />
          <FormDropdownItem
            label="Calibration Result"
            name="calibrationResult"
            formField="calibrationResult"
            dropdownArray={calResultList}
            valueField="key"
            visibleField="value"
            onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)}
            required
          />
        </div>

        <div className='grid grid-cols-1'>
          {
            (formData?.calibrationResult === 'OK') && 
            <CustomDatePicker label='Cal. Valid upto Date' name='calibrationValidUpto' defaultValue={formData?.calibrationValidUpto} onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
          } 
        </div>

        <div className='flex justify-center mt-4'>
          <Btn htmlType='submit'>Save</Btn>
        </div>
      </Form>
    </FormContainer>
  )
}

export default NewCalibrationForm