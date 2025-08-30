import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/CommonFunctions';
import Btn from './DKG_Btn';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import FormBody from './DKG_FormBody';
import FormInputItem from './DKG_FormInputItem';
import FormContainer from './DKG_FormContainer';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleFormValueChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    });
  };

  const handleFormSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      message.error('New password and confirm password do not match!');
      return;
    }

    if (formData.newPassword.length < 6) {
      message.error('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);
    try {
      const response = await apiCall(
        'POST',
        '/change-password',
        null, // No token needed as it's a public endpoint
        {
          employeeId: formData.employeeId,
          currentPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        }
      );

      if (response?.data?.responseStatus?.statusCode === 1) {
        message.success('Password changed successfully!');
        navigate('/login');
      } else {
        message.error(response?.data?.responseStatus?.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Password change error:', error);
      // Don't show additional error message here as apiCall already shows the backend error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className='bg-darkBlue text-offWhite p-4 fixed top-0 w-full z-30'>
        <h1>Change Password</h1>
      </header>
      <FormContainer className='mt-20 main-content border-none !shadow-none'>
        <main className='w-full max-w-md mx-auto p-6 flex flex-col h-fit justify-center items-center gap-6 bg-white relative z-20 rounded-md'>
          <Logo width={150} height={100} />
          <FormBody onFinish={handleFormSubmit} initialValues={formData}>
            <FormInputItem
              label="Employee ID"
              placeholder="123456"
              name='employeeId'
              onChange={handleFormValueChange}
              required
            />
            <FormInputItem
              label="Current Password"
              placeholder="*****"
              name='oldPassword'
              onChange={handleFormValueChange}
              required
              type="password"
            />
            <FormInputItem
              label="New Password"
              placeholder="*****"
              name='newPassword'
              onChange={handleFormValueChange}
              required
              type="password"
            />
            <FormInputItem
              label="Confirm New Password"
              placeholder="*****"
              name='confirmPassword'
              onChange={handleFormValueChange}
              required
              type="password"
            />
            <Btn htmlType="submit" text="Change Password" loading={loading} />
          </FormBody>

          <div className='text-center'>
            <button
              onClick={() => navigate('/login')}
              className='text-blue-600 hover:text-blue-800 underline text-sm font-medium'
            >
              Back to Login
            </button>
          </div>
        </main>
      </FormContainer>
    </>
  );
};

export default ChangePassword;
