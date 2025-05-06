import { message } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const TestingPrivateRoute = () => {

    const {dutyId} = useSelector(state => state.testingDuty);

    if(!dutyId){
        // message.error("No ongoing Testing duty. Please start a duty.")
    }

  return (
    <>
        {(dutyId) ? <Outlet /> : <Navigate to='/testing/startDuty' />}
    </>
    // <Navigate to='/qct/startDuty' />
  )
}

export default TestingPrivateRoute