import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../../../../../utils/CommonFunctions';
import { Form, Select, message } from 'antd';
import FormInputItem from '../../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../../components/DKG_Btn';

const testTypeDropdown = [
    { value: 'chemical', label: 'Chemical .(P)' },
    { value: 'o2', label: 'O2' },
    { value: 'n2', label: 'N2' },
    { value: 'fwtSt', label: 'FWT (HS)' },
    { value: 'fwtHs', label: 'FWT (St.)' },
    { value: 'fwtStSr', label: 'FWT (St.) - Sr' },
    { value: 'mechanical', label: 'Mechanical' },
    { value: 'tensileFoot', label: 'Tensile Foot' },
    { value: 'sp', label: 'SP' },
    { value: 'micro', label: 'Micro' },
    { value: 'ir', label: 'IR' },
    { value: 'decarb', label: 'Decarb' },
    { value: 'rsh', label: 'RSH' },
    { value: 'tensile', label: 'Tensile' },
    { value: 'ph', label: 'PH' }
];

const strandDd = [
    {
      key: 1,
      value: 1,
    },
    {
      key: 2,
      value: 2,
    },
    {
      key: 3,
      value: 3,
    },
    {
      key: 4,
      value: 4,
    },
    {
      key: 5,
      value: 5,
    },
    {
      key: 6,
      value: 6,
    },
  ];

const sampleLotDd = [
    { label: "Lot 1", value: "Lot 1" },
    { label: "Lot 2", value: "Lot 2" },
    { label: "NA", value: "NA" },
];

const HH1080 = ({ railGrade, dutyId, editMode, editData }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(editMode && editData ? {
        testType: editData.dutyId || null, // Backend passes testType in dutyId field
        sampleNo: editData.sampleLot || null,
        heatNo: editData.heatNo || null,
        sampleId: editData.sampleId || null,
        strand: editData.strand || null
    } : null);

    // Initialize form data with edit data when in edit mode
    useEffect(() => {
        if (editMode && editData) {
            const newFormData = {
                testType: editData.dutyId || null, // Backend passes testType in dutyId field
                sampleNo: editData.sampleLot || null,
                heatNo: editData.heatNo || null,
                sampleId: editData.sampleId || null,
                strand: editData.strand || null
            };
            setFormData(newFormData);

            // Set form field values
            form.setFieldsValue(newFormData);
        }
    }, [editMode, editData, form]);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async () => {
        const payload = {
            railGrade: railGrade,
            heatNumber: formData?.heatNo,
            sampleId: formData?.sampleId,
            strand: formData?.strand,
            sampleLot: formData?.sampleNo,
            testType: formData?.testType,
            dutyId: dutyId
        };

        try {
            if (editMode) {
                // Update existing retest sample
                await apiCall(
                    'POST',
                    '/rolling/updateRetestSample',
                    token,
                    payload
                );
                message.success("Retest sample updated successfully.");
            } else {
                // Create new retest sample
                await apiCall(
                    'POST',
                    '/rolling/saveRetestSample',
                    token,
                    payload
                );
                message.success("Sample retest successful.");
            }

            // Navigate to Test Sample - Declaration page after successful save
            navigate("/stage/testSampleMarkingList", {
                state: {
                    module: "stage",
                    dutyId: dutyId,
                    generalInfo: null, // You may need to pass actual general info if available
                    redirectTo: "/stage/home"
                }
            });
        } catch (error) {
            message.error(editMode ? "Failed to update retest sample." : "Failed to save retest sample.");
        }
    };

    return (
        <Form 
            form={form} 
            layout='vertical'
            onFinish={handleSubmit}
        >
            <Form.Item label='Test Type' name='testType'>
                <Select
                    options={testTypeDropdown}
                    value={formData?.testType}
                    onChange={(e) => handleChange('testType', e)}
                />
            </Form.Item>
            <Form.Item label='Sample Lot' name='sampleNo'>
                <Select
                    options={sampleLotDd}
                    value={formData?.sampleNo}
                    onChange={(e) => handleChange('sampleNo', e)}
                />
            </Form.Item>

            <FormInputItem
                label="Sample ID"
                name="sampleId"
                value={formData?.sampleId}
                onChange={handleChange}
            />
            <FormInputItem
                label="Heat No."
                name="heatNo"
                value={formData?.heatNo}
                onChange={handleChange}
            />

            <Form.Item label='Strand' name='strand'>
                <Select
                    options={strandDd.map(item => ({
                        label: item.value,
                        value: item.value
                    }))}
                    value={formData?.strand}
                    onChange={(e) => handleChange('strand', e)}
                />
            </Form.Item>

            <Form.Item className='flex justify-center'>
                <Btn type="primary" htmlType="submit">
                    Submit
                </Btn>
            </Form.Item>
        </Form>
    )
}

export default HH1080
