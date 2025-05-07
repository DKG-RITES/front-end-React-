import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { apiCall } from '../../../../../utils/CommonFunctions';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import { Form, Select, Checkbox, message } from 'antd';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';

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

const sampleLotDd = [
    { label: "Lot 1", value: "Lot 1" },
    { label: "Lot 2", value: "Lot 2" },
    { label: "NA", value: "NA" },
];

const R260And880 = ({ railGrade, dutyId }) => {
    const [strandList, setStrandList] = useState([]);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);
    const { token } = useSelector((state) => state.auth);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    useEffect(() => {
        const fetchStrandData = async () => {
            if (formData?.heatNo && formData?.sampleNo) {
                try {
                    const response = await apiCall(
                        'GET',
                        `/rolling/getStrandNoList?sampleNo=${formData.sampleNo}&heatNo=${formData.heatNo}`,
                        token
                    );
                    setStrandList(response?.data?.responseData?.strandNoList || []);
                } catch (error) {
                    console.error('Error fetching strand data:', error);
                }
            }
        };

        fetchStrandData();
    }, [formData?.heatNo, formData?.sampleNo, token]);

    const handleSubmit = async () => {
        const payload = {
            railGrade: railGrade,
            heatNumber: formData?.heatNo,
            strandNumber: formData?.selectedStrands || [],
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

            <FormInputItem label="Heat No." name="heatNo" onChange={handleChange}/>

            {strandList.length > 0 && (
                <Form.Item label="Strand List" name="selectedStrands">
                    <Checkbox.Group
                        options={strandList.map(strand => ({
                            label: strand,
                            value: strand
                        }))}
                        onChange={(values) => handleChange('selectedStrands', values)}
                    />
                </Form.Item>
            )}
            <Form.Item className='flex justify-center'>
                <Btn type="primary" htmlType="submit">
                    Submit
                </Btn>
            </Form.Item>
        </Form>
    )
}

export default R260And880
