import React, { useState, useEffect } from "react";
import FormContainer from '../../../../../components/DKG_FormContainer'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import SubHeader from '../../../../../components/DKG_SubHeader'
import { message, Form } from "antd";
import { useNavigate } from 'react-router-dom'
import FormInputNumberItem from '../../../../../components/DKG_FormInputNumberItem'
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../components/DKG_Btn";
import { useSelector } from "react-redux";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import { apiCall, handleChange } from "../../../../../utils/CommonFunctions";
import TextAreaComponent from '../../../../../components/DKG_TextAreaComponent';

const lengthOfRailList = [
    {
      key: "26",
      value: "26",
    },
    {
      key: "13",
      value: "13",
    },
];

function ShiftSummary() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        rollingTableSpeed: null, totalRailsInspected: null, totalUtMarkedRails: null, totalEctMarkedRails: null, bodyStraightnessResultA: null, bodyStraightnessResultA1: null, bodyStraightnessResultMarked: null, totalProfileMarked: null, railLength: null, totalUtOkRails: null, totalUtSuspectedRails: null, totalUtRejectedRails: null, totalRecycledRails: null, ectSuspectedRails: null, remarks: null
    });

    const { token } = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    const ndtGeneralInfo = useSelector(state => state.ndtDuty);

    const handleFormSubmit = async () => {
        try {
            await apiCall("POST", "/ndt/saveShiftSummary", token, {
                ...formData,
                dutyId: ndtGeneralInfo.dutyId
            });
            message.success("NDT Shift Summary Data saved successfully.");
            navigate("/ndt/home");
        } catch (error) {}
    };

    useEffect(() => {
        form.setFieldsValue(formData);
    }, [formData, form]);

    return (
        <FormContainer>
            <SubHeader title="NDT - Shift Summary" link="/ndt/home"/>
            <GeneralInfo data={ndtGeneralInfo} />

            {
                ((ndtGeneralInfo.mill === 'URM') || (ndtGeneralInfo.mill === 'RSM' && ndtGeneralInfo.ndt === 'LR')) && (
                    <Form
                        form={form}
                        initialValues={formData}
                        onFinish={handleFormSubmit}
                        layout="vertical"
                    >
                        <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Table Speed during Testing' name='rollingTableSpeed' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='Total Rails Inspected' name='totalRailsInspected' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Total UT Marked Rails' name='totalUtMarkedRails' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='Total ECT Marked Rails' name='totalEctMarkedRails' placeholder='0'  onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Body Straightness Results(A)' name='bodyStraightnessResultA' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='Body Straightness Results(A+0.1)' name='bodyStraightnessResultA1' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Body Straightness Results(Mark)' name='bodyStraightnessResultMarked' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='Total Profile Marked' name='totalProfileMarked' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>
                        </div>

                        <TextAreaComponent label="Remarks" name="remarks" onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} className="col-span-2" required />
                        <div className='flex justify-center mt-8'>
                            <Btn htmlType='submit'>Save</Btn>
                        </div>
                    </Form>
                )
            }

            {
                (ndtGeneralInfo.mill === 'RSM' && ndtGeneralInfo.ndt === 'SR') && (
                    <Form
                        form={form}
                        initialValues={formData}
                        onFinish={handleFormSubmit}
                        layout="vertical"
                    >
                        <div className="!bg-offWhite opacity-80 flex flex-col border p-2 border-gray-100 rounded-md mb-4 shadow-[4px_4px_4px_4px_rgba(0,0,0,0.1)]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Table Speed during Testing' name='rollingTableSpeed' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormDropdownItem label="Length Of Rail (m)" name="railLength" placeholder='0' formField="railLength" dropdownArray={lengthOfRailList} visibleField={"value"} valueField={"key"} onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Total Rails Inspected' name='totalRailsInspected' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='Total UT OK Rails' name='totalUtOkRails' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Total UT Suspected Rails' name='totalUtSuspectedRails' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='Total UT Rejected Rails' name='totalUtRejectedRails' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Total Recycled Rails' name='totalRecycledRails' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='ECT Suspected Rails' name='ectSuspectedRails' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 mt-3">
                                <FormInputItem label='Body Straightness Results(A)' name='bodyStraightnessResultA' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                                <FormInputItem label='Body Straightness Results(A+0.1)' name='bodyStraightnessResultA1' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>

                            <div className="grid grid-cols-1 mt-3">
                                <FormInputItem label='Body Straightness Results(Mark)' name='bodyStraightnessResultMarked' placeholder='0' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
                            </div>
                        </div>

                        <TextAreaComponent label="Remarks" name="remarks" onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} className="col-span-2" required />
                        <div className='flex justify-center mt-8'>
                            <Btn htmlType='submit'>Save</Btn>
                        </div>
                    </Form>
                )
            }
        </FormContainer>
    );
}

export default ShiftSummary;