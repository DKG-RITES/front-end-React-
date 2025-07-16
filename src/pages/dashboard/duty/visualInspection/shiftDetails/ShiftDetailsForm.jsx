import React, { useEffect, useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import data from "../../../../../utils/frontSharedData/VisualInspection/VI.json";
import FormBody from "../../../../../components/DKG_FormBody";
import { Form, message } from "antd";
import CustomDatePicker from "../../../../../components/DKG_CustomDatePicker";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import Btn from "../../../../../components/DKG_Btn";
import FormContainer from "../../../../../components/DKG_FormContainer";
import { Navigate, useNavigate } from 'react-router-dom'
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux";
import { startViDuty } from "../../../../../store/slice/viDutySlice";

const { millMaping: sampleData, millsMaping: secSampleData, shiftList, railGradeList, railSectionList } = data;

const currentDate = dayjs();
const dateFormat = "DD/MM/YYYY";

const ShiftDetailsForm = () => {
  const [form] = Form.useForm();
    const [millDropdownList, setMillDropdownList] = useState([]);
    const [lineNumberDropdownList, setLineNumberDropdownList] = useState([]);
    const [stdRailLengthList, setStdRailLengthList] = useState([])
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { dutyId } = useSelector((state) => state.viDuty);

    const [formData, setFormData] = useState({
        startDate: currentDate.format(dateFormat), shift: '', mill: '', lineNo: '', railGrade: '', railSection: '', stdOffLength: '', ieName1: '', ieName2: '', ieName3: '', rclIeName1: '', rclIeName2: '', rclIeName3: ''
    });

    const populateData = () => {
        const millDropdownList = Object.keys(sampleData).map( mill => {
          return {
            key: mill,
            value: mill
          }
        })
        setMillDropdownList([...millDropdownList])
      }
    
    useEffect(()=> {
      populateData()
    }, [])
    
    useEffect(()=>{
    if(sampleData[formData.mill]){
        const lineNumberDropdownList = sampleData[formData.mill].map(mill => {
        return {
            key: mill,
            value: mill
        }
        })
        setLineNumberDropdownList([...lineNumberDropdownList])
    }
    }, [formData.mill, millDropdownList])

    const handleFormSubmit = async () => {
        try{
          await dispatch(startViDuty(formData)).unwrap();
          navigate('/visual/home');
        }catch(error){}
    };

    useEffect(()=>{
        if(secSampleData[formData.mill]){
          const stdRailLengthList = secSampleData[formData.mill].map(mill => {
            return {
              key: mill,
              value: mill
            }
          })
          setStdRailLengthList([...stdRailLengthList])
        }
    }, [formData.mill, millDropdownList])

    const handleChange = (fieldName, value) => {

      if(fieldName === "mill"){
        setFormData((prev) => {
          return {
            ...prev,
            [fieldName]: value,
            lineNo: null,
            stdOffLength: null
          };
        });
        return;
      }

        setFormData((prev) => {
          return {
            ...prev,
            [fieldName]: value,
          };
        });
    };

    useEffect(() => {
      form.setFieldsValue(formData)
    }, [formData])

    if (dutyId) {
      // message.error("Duty already in progress. Cannot start new duty.");
      return <Navigate to="/visual/home" />;
    }

  return (
    <FormContainer>
        <SubHeader title="Visual Inspection - Shift Details" link="/" />

        <Form layout="vertical" form={form} initialValues={formData} onFinish={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-x-2">
                <CustomDatePicker label="Date" name="date" defaultValue={formData.startDate} onChange={handleChange} required />
                <FormDropdownItem label="Shift" name="shift" formField="shift" dropdownArray={shiftList} visibleField="value" valueField="key" onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label='Mill' name='mill' formField="mill" dropdownArray={millDropdownList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
                <FormDropdownItem label ='Line Number' name='lineNo' formField="lineNo" dropdownArray={lineNumberDropdownList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label="Rail Grade" name='railGrade' formField="railGrade" dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required/>
                <FormDropdownItem label="Rail Section" name='railSection' formField="railSection" dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label="Std. offered Rail Length" name='stdOffLength' formField="stdOffLength" dropdownArray={stdRailLengthList} visibleField={'value'} valueField={'key'} onChange={handleChange} required />
                <FormInputItem label='Add Other RITES IE' name='ieName1' onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormInputItem label='Add Other RITES IE (2)' name='ieName2' onChange={handleChange} />
                <FormInputItem label='Add Other RITES IE (3)' name='ieName3' onChange={handleChange} />
            </div>
            
            <div className="grid grid-cols-2 gap-x-2">
              <FormInputItem label='Add Name of RCL IE' name='rclIeName1' onChange={handleChange} required/>
              <FormInputItem label='Add Name of RCL IE (2)' name='rclIeName2' onChange={handleChange} required/>
            </div>

            <FormInputItem label='Add Name of RCL IE (3)' name='rclIeName3' onChange={handleChange}/>
            <Btn htmlType="submit" className="flex justify-center mx-auto">
                Start Duty
            </Btn>
        </Form>
    </FormContainer>
  )
}

export default ShiftDetailsForm