import React, { useState } from 'react'
import { useSelector } from 'react-redux';
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

const HH1080 = ({ railGrade, dutyId }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);
    const { token } = useSelector((state) => state.auth);

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
            const response = await apiCall(
                'POST',
                '/rolling/saveRetestSample',
                token,
                payload
            );
            message.success("Sample retest successful.");
        } catch (error) {
            message.error("Failed to save retest sample.");
        }
    };

    return (
        <Form 
            form={form} 
            layout='vertical'
            onFinish={handleSubmit}
        >
            <Form.Item label='Test Type' name='testType'>
                <Select options={testTypeDropdown} onChange={(e) => handleChange('testType', e)} />
            </Form.Item>
            <Form.Item label='Sample Lot' name='sampleNo'>
                <Select options={sampleLotDd} onChange={(e) => handleChange('sampleNo', e)} />
            </Form.Item>

            <FormInputItem label="Sample ID" name="sampleId" onChange={handleChange}/>
            <FormInputItem label="Heat No." name="heatNo" onChange={handleChange}/>
            
            <Form.Item label='Strand' name='strand'>
                <Select 
                    options={strandDd.map(item => ({ 
                        label: item.value, 
                        value: item.value 
                    }))} 
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
