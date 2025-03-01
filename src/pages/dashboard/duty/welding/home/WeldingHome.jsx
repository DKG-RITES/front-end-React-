// // import React, { useCallback, useEffect, useState } from "react";
// // import SubHeader from "../../../../../components/DKG_SubHeader";
// // import FormContainer from "../../../../../components/DKG_FormContainer";
// // import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
// // import TabList from "../../../../../components/DKG_TabList";
// // import weldingHomeTabs from '../../../../../utils/frontSharedData/weldingInspection/WeldingHome';
// // import { message, Divider, Table, Form } from 'antd';
// // import FormInputItem from "../../../../../components/DKG_FormInputItem";
// // import Btn from "../../../../../components/DKG_Btn";
// // import { useNavigate } from 'react-router-dom'
// // import { useDispatch, useSelector } from "react-redux";
// // import { apiCall, handleChange } from "../../../../../utils/CommonFunctions";
// // import TextAreaComponent from "../../../../../components/DKG_TextAreaComponent";
// // import { endWeldingDuty } from "../../../../../store/slice/weldingDutySlice";


// // const machineWiseCountColumns = [
// //   {
// //     title: 'Machine No.',
// //     dataIndex: 'machineNo',
// //     key: 'machineNo',
// //     align: 'center',
// //   },
// //   {
// //     title: "TLT",
// //     dataIndex: 'tltCount',
// //     key: 'tltCount',
// //     align: 'center',
// //   },
// //   {
// //     title:"Hardness",
// //     dataIndex: 'hardnessCount',
// //     key: 'hardnessCount',
// //     align: 'center',
// //   },
// //   {
// //     title: 'Micro',
// //     dataIndex: 'microCount',
// //     key: 'microCount',
// //     align: 'center',
// //   },
// //   {
// //     title: 'Macro',
// //     dataIndex: 'macroCount',
// //     key: 'macroCount',
// //     align: 'center',
// //   }
// // ]

// // // const machineWiseCountColumns = [
// // //   {
// // //     title: 'Machine No.',
// // //     dataIndex: 'machineNo',
// // //     key: 'machineNo',
// // //     align: 'center',
// // //   },
// // //   {
// // //     title: "TLT",
// // //     dataIndex: 'tltCount',
// // //     key: 'tltCount',
// // //     align: 'center',
// // //   },
// // //   {
// // //     title:"Hardness",
// // //     dataIndex: 'hardnessCount',
// // //     key: 'hardnessCount',
// // //     align: 'center',
// // //   },
// // //   {
// // //     title: 'Micro',
// // //     dataIndex: 'microCount',
// // //     key: 'microCount',
// // //     align: 'center',
// // //   },
// // //   {
// // //     title: 'Macro',
// // //     dataIndex: 'macroCount',
// // //     key: 'macroCount',
// // //     align: 'center',
// // //   }
// // // ]

// // const WeldingHome = () => {
// //     const navigate = useNavigate();
// //   const [form] = Form.useForm();
// //     const [formData, setFormData] = useState({
// //       machineSNoHead: null,
// //       machineSNoFoot: null,
// //       probeDetailsHead: null,
// //       probeDetailsFoot: null,
// //       probeDbHead: null,
// //       probeDbFoot: null,
// //       remarksHead: null,
// //       remarksFoot: null,
// //       shiftRemarks: null
// //     });
// //     const {token} = useSelector(state => state.auth);
// //     const weldingGeneralInfo = useSelector(state => state.weldingDuty);
// //     const [info, setInfo] = useState([
// //       {
// //         key: '1',
// //         null: 'Head',
// //       },
// //       {
// //         key: '2',
// //         null: 'Foot',
// //       }
// //     ]);

// //     const [machineWiseCount, setMachineWiseCount] = useState([]);
// //     const dispatch = useDispatch();
// //     const handleFormSubmit = async () => {
// //       try{
// //         await dispatch(endWeldingDuty(formData)).unwrap();
// //         navigate('/');
// //       }
// //       catch(error){}

// //     }

// //     const  populateData = useCallback(async () => {
// //       try{
// //         const {data} = await apiCall("GET", '/welding/getMachineWiseTestCount', token);

// //         setMachineWiseCount(data?.responseData || []);
// //       }catch(error){
// //       }
// //     }, [token])

// //     useEffect(() => {
// //       populateData();
// //     }, [populateData])
    
// //     console.log("Form Data", formData);

// //   return (
// //     <FormContainer>
// //         <SubHeader title="Welding - Home" link="/" />
// //         <GeneralInfo data={weldingGeneralInfo} />

// //         <section className='mt-4'>
// //           <Table
// //             dataSource={machineWiseCount}
// //             columns={machineWiseCountColumns}
// //             scroll={{ x: true }}
// //             bordered
// //           />
// //         </section>

// //         <Divider className="mt-0 mb-0" />

// //         <section className="mt-6">
// //             <TabList tabList={weldingHomeTabs} />
// //         </section>

// //         <Divider className="mb-0" />

// //         <section>
// //           {
// //             weldingGeneralInfo.mill === 'RSM' && (
// //               <h2 className="font-bold">No. of Joints  welded in previous Shift after Weld Test (BSP4): <span className="font-normal text-red-500">{totalCountForBSP4}</span></h2>
// //             )
// //           }

// //           {
// //             (weldingGeneralInfo.mill === 'URM' && weldingGeneralInfo.weldingLine === 'L3') && (
// //               <>
// //                 <h2 className="font-bold">No. of Joints  welded in previous shift after Weld Test (BSP1): <span className="font-normal text-red-500">{totalCountForBSP1}</span></h2>
// //                 <h2 className="font-bold">No. of Joints  welded in this previous shift after Weld Test (BSP2): <span className="font-normal text-red-500">{totalCountForBSP2}</span></h2>
// //               </>
              
// //             )
// //           }
// //         </section>

// //         <Divider className="mb-2 mt-0" />

// //         {/* <Table 
// //           columns={weldDataColumns}
// //           dataSource={info}
// //           bordered
// //           scroll={{x: true}}
// //           pagination={false}
// //         /> */}
// //       <Form form={form} layout='vertical' initialValues={formData} onFinish={handleFormSubmit}>
// //         <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300">
// //           <div></div>
// //           <h3 className="font-semibold p-2 text-center">Machine Sno.</h3>
// //           <h3 className="font-semibold p-2 text-center">Probe Details</h3>
// //           <h3 className="font-semibold p-2 text-center">Probe DB</h3>
// //           <h3 className="font-semibold p-2 text-center">Remarks</h3>

// //           <h3 className="font-semibold p-2 text-center">Head</h3>
// //           <TextAreaComponent className="no-border" placeholder='Machine S.No.' name='machineSNoHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
// //           <TextAreaComponent className="no-border" name='probeDetailsHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
// //           <TextAreaComponent className="no-border" name='probeDbHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
// //           <TextAreaComponent className="no-border" name='remarksHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>

// //           <h3 className="font-semibold p-2 text-center">Foot</h3>
// //           <TextAreaComponent className="no-border" name='machineSNoFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
// //           <TextAreaComponent className="no-border" name='probeDetailsFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
// //           <TextAreaComponent className="no-border" name='probeDbFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
// //           <TextAreaComponent className="no-border" name='remarksFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
// //         </div>
            
// //           <Divider className= "mt-0" />

// //           <FormInputItem placeholder='Enter Remarks' name='shiftRemarks' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>

// //           <div className='flex justify-center'>
// //               <Btn htmlType='submit' className='w-36'>End Duty</Btn>
// //           </div>
// //           </Form>
// //     </FormContainer>
// //   )
// // }

// // export default WeldingHome


// import React, { useCallback, useEffect, useState } from "react";
// import SubHeader from "../../../../../components/DKG_SubHeader";
// import FormContainer from "../../../../../components/DKG_FormContainer";
// import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
// import TabList from "../../../../../components/DKG_TabList";
// import weldingHomeTabs from '../../../../../utils/frontSharedData/weldingInspection/WeldingHome';
// import { message, Divider, Table, Form } from 'antd';
// import FormInputItem from "../../../../../components/DKG_FormInputItem";
// import Btn from "../../../../../components/DKG_Btn";
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux";
// import { apiCall, handleChange } from "../../../../../utils/CommonFunctions";
// import TextAreaComponent from "../../../../../components/DKG_TextAreaComponent";
// import { endWeldingDuty } from "../../../../../store/slice/weldingDutySlice";


// const machineWiseCountColumns = [
//   {
//     title: 'Machine No.',
//     dataIndex: 'machineNo',
//     key: 'machineNo',
//     align: 'center',
//   },
//   {
//     title: "TLT",
//     dataIndex: 'tltCount',
//     key: 'tltCount',
//     align: 'center',
//   },
//   {
//     title:"Hardness",
//     dataIndex: 'hardnessCount',
//     key: 'hardnessCount',
//     align: 'center',
//   },
//   {
//     title: 'Micro',
//     dataIndex: 'microCount',
//     key: 'microCount',
//     align: 'center',
//   },
//   {
//     title: 'Macro',
//     dataIndex: 'macroCount',
//     key: 'macroCount',
//     align: 'center',
//   }
// ]

// // const machineWiseCountColumns = [
// //   {
// //     title: 'Machine No.',
// //     dataIndex: 'machineNo',
// //     key: 'machineNo',
// //     align: 'center',
// //   },
// //   {
// //     title: "TLT",
// //     dataIndex: 'tltCount',
// //     key: 'tltCount',
// //     align: 'center',
// //   },
// //   {
// //     title:"Hardness",
// //     dataIndex: 'hardnessCount',
// //     key: 'hardnessCount',
// //     align: 'center',
// //   },
// //   {
// //     title: 'Micro',
// //     dataIndex: 'microCount',
// //     key: 'microCount',
// //     align: 'center',
// //   },
// //   {
// //     title: 'Macro',
// //     dataIndex: 'macroCount',
// //     key: 'macroCount',
// //     align: 'center',
// //   }
// // ]

// const WeldingHome = () => {
//     const navigate = useNavigate();
//   const [form] = Form.useForm();
//     const [formData, setFormData] = useState({
//       machineSNoHead: null,
//       machineSNoFoot: null,
//       probeDetailsHead: null,
//       probeDetailsFoot: null,
//       probeDbHead: null,
//       probeDbFoot: null,
//       remarksHead: null,
//       remarksFoot: null,
//       shiftRemarks: null
//     });
//     const {token} = useSelector(state => state.auth);
//     const weldingGeneralInfo = useSelector(state => state.weldingDuty);
//     const [info, setInfo] = useState([
//       {
//         key: '1',
//         null: 'Head',
//       },
//       {
//         key: '2',
//         null: 'Foot',
//       }
//     ]);

//     const [machineWiseCount, setMachineWiseCount] = useState([]);
//     const dispatch = useDispatch();
//     const handleFormSubmit = async () => {
//       try{
//         await dispatch(endWeldingDuty(formData)).unwrap();
//         navigate('/');
//       }
//       catch(error){}

//     }

//     const  populateData = useCallback(async () => {
//       try{
//         const {data} = await apiCall("GET", '/welding/getMachineWiseTestCount', token);

//         setMachineWiseCount(data?.responseData || []);
//       }catch(error){
//       }
//     }, [token])

//     useEffect(() => {
//       populateData();
//     }, [populateData])
    
//     console.log("Form Data", formData);

//   return (
//     <FormContainer>
//         <SubHeader title="Welding - Home" link="/" />
//         <GeneralInfo data={weldingGeneralInfo} />

//         <section className='mt-4'>
//           <Table
//             dataSource={machineWiseCount}
//             columns={machineWiseCountColumns}
//             scroll={{ x: true }}
//             bordered
//           />
//         </section>

//         <Divider className="mt-0 mb-0" />

//         <section className="mt-6">
//             <TabList tabList={weldingHomeTabs} />
//         </section>

//         <Divider className="mb-0" />

//         <section>
//           <h2 className="font-bold">No. of Joints  welded in previous Shift after Weld Test (BSP4): <span className="font-normal text-red-500">come from database</span></h2>
//           <h2 className="font-bold">No. of Joints  welded in previous shift after Weld Test (BSP1): <span className="font-normal text-red-500">come from database</span></h2>
//           <h2 className="font-bold">No. of Joints  welded in this previous shift after Weld Test (BSP2): <span className="font-normal text-red-500">come from database</span></h2>
//         </section>

//         <Divider className="mb-2 mt-0" />

//         {/* <Table 
//           columns={weldDataColumns}
//           dataSource={info}
//           bordered
//           scroll={{x: true}}
//           pagination={false}
//         /> */}
//       <Form form={form} layout='vertical' initialValues={formData} onFinish={handleFormSubmit}>
//         <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300">
//           <div></div>
//           <h3 className="font-semibold p-2 text-center">Machine Sno.</h3>
//           <h3 className="font-semibold p-2 text-center">Probe Details</h3>
//           <h3 className="font-semibold p-2 text-center">Probe DB</h3>
//           <h3 className="font-semibold p-2 text-center">Remarks</h3>

//           <h3 className="font-semibold p-2 text-center">Head</h3>
//           <TextAreaComponent className="no-border" placeholder='Machine S.No.' name='machineSNoHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
//           <TextAreaComponent className="no-border" name='probeDetailsHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
//           <TextAreaComponent className="no-border" name='probeDbHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
//           <TextAreaComponent className="no-border" name='remarksHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>

//           <h3 className="font-semibold p-2 text-center">Foot</h3>
//           <TextAreaComponent className="no-border" name='machineSNoFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
//           <TextAreaComponent className="no-border" name='probeDetailsFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
//           <TextAreaComponent className="no-border" name='probeDbFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
//           <TextAreaComponent className="no-border" name='remarksFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
//         </div>
            
//           <Divider className= "mt-0" />

//           <FormInputItem placeholder='Enter Remarks' name='shiftRemarks' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>

//           <div className='flex justify-center'>
//               <Btn htmlType='submit' className='w-36'>End Duty</Btn>
//           </div>
//           </Form>
//     </FormContainer>
//   )
// }

// export default WeldingHome


import React, { useCallback, useEffect, useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import TabList from "../../../../../components/DKG_TabList";
import weldingHomeTabs from '../../../../../utils/frontSharedData/weldingInspection/WeldingHome';
import { message, Divider, Table, Form } from 'antd';
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { apiCall, handleChange } from "../../../../../utils/CommonFunctions";
import TextAreaComponent from "../../../../../components/DKG_TextAreaComponent";
import { endWeldingDuty } from "../../../../../store/slice/weldingDutySlice";


const machineWiseCountColumns = [
  {
    title: 'Machine No.',
    dataIndex: 'machineNo',
    key: 'machineNo',
    align: 'center',
  },
  {
    title: "TLT",
    dataIndex: 'tltCount',
    key: 'tltCount',
    align: 'center',
  },
  {
    title:"Hardness",
    dataIndex: 'hardnessCount',
    key: 'hardnessCount',
    align: 'center',
  },
  {
    title: 'Micro',
    dataIndex: 'microCount',
    key: 'microCount',
    align: 'center',
  },
  {
    title: 'Macro',
    dataIndex: 'macroCount',
    key: 'macroCount',
    align: 'center',
  }
]

// const machineWiseCountColumns = [
//   {
//     title: 'Machine No.',
//     dataIndex: 'machineNo',
//     key: 'machineNo',
//     align: 'center',
//   },
//   {
//     title: "TLT",
//     dataIndex: 'tltCount',
//     key: 'tltCount',
//     align: 'center',
//   },
//   {
//     title:"Hardness",
//     dataIndex: 'hardnessCount',
//     key: 'hardnessCount',
//     align: 'center',
//   },
//   {
//     title: 'Micro',
//     dataIndex: 'microCount',
//     key: 'microCount',
//     align: 'center',
//   },
//   {
//     title: 'Macro',
//     dataIndex: 'macroCount',
//     key: 'macroCount',
//     align: 'center',
//   }
// ]

const WeldingHome = () => {
    const navigate = useNavigate();
  const [form] = Form.useForm();
    const [formData, setFormData] = useState({
      machineSNoHead: null,
      machineSNoFoot: null,
      probeDetailsHead: null,
      probeDetailsFoot: null,
      probeDbHead: null,
      probeDbFoot: null,
      remarksHead: null,
      remarksFoot: null,
      shiftRemarks: null
    });
    const {token} = useSelector(state => state.auth);
    const weldingGeneralInfo = useSelector(state => state.weldingDuty);
    const totalCountForBSP1 = 0;
    const totalCountForBSP2 = 0;
    const totalCountForBSP4 = 0;

    const [info, setInfo] = useState([
      {
        key: '1',
        null: 'Head',
      },
      {
        key: '2',
        null: 'Foot',
      }
    ]);

    const [machineWiseCount, setMachineWiseCount] = useState([]);
    const dispatch = useDispatch();
    const handleFormSubmit = async () => {
      try{
        await dispatch(endWeldingDuty(formData)).unwrap();
        navigate('/');
      }
      catch(error){}

    }

    const  populateData = useCallback(async () => {
      try{
        const {data} = await apiCall("GET", '/welding/getMachineWiseTestCount', token);
        if (data?.responseData.machineNo === 'BSP1') {
           totalCountForBSP1 = data?.responseData.tltCount + data?.responseData.hardnessCount + data?.responseData.macroCount + data?.responseData.microCount;
        }else if (data?.responseData.machineNo === 'BSP2') {
          totalCountForBSP2 = data?.responseData.tltCount + data?.responseData.hardnessCount + data?.responseData.macroCount + data?.responseData.microCount;
        }
        else{
          totalCountForBSP4 = data?.responseData.tltCount + data?.responseData.hardnessCount + data?.responseData.macroCount + data?.responseData.microCount;
        }

        setMachineWiseCount(data?.responseData || []);
      }catch(error){
      }
    }, [token])

    useEffect(() => {
      populateData();
    }, [populateData])
    
    console.log("Form Data", formData);

  return (
    <FormContainer>
        <SubHeader title="Welding - Home" link="/" />
        <GeneralInfo data={weldingGeneralInfo} />

        <section className='mt-4'>
          <Table
            dataSource={machineWiseCount}
            columns={machineWiseCountColumns}
            scroll={{ x: true }}
            bordered
          />
        </section>

        <Divider className="mt-0 mb-0" />

        <section className="mt-6">
            <TabList tabList={weldingHomeTabs} />
        </section>

        <Divider className="mb-0" />

        <section>
          {
            weldingGeneralInfo.mill === 'RSM' && (
              <div className="flex gap-2">
              <h2 className="font-bold">No. of Joints  welded in previous Shift after Weld Test (BSP4):</h2>
              <FormInputItem name="jointsWeldedPrevShiftBsp4" />
              </div>
            )
          }

          {
            (weldingGeneralInfo.mill === 'URM' && weldingGeneralInfo.weldingLine === 'L3') && (
              <>
               <div className="flex gap-2">
              <h2 className="font-bold">No. of Joints  welded in previous shift after Weld Test (BSP1):</h2>
              <FormInputItem name="jointsWeldedPrevShiftBsp1" />
              </div>
               <div className="flex gap-2">
              <h2 className="font-bold">No. of Joints  welded in previous shift after Weld Test (BSP2):</h2>
              <FormInputItem name="jointsWeldedPrevShiftBsp2" />
              </div>
                {/* <h2 className="font-bold">No. of Joints  welded in previous shift after Weld Test (BSP1): <span className="font-normal text-red-500">{totalCountForBSP1}</span></h2>
                <h2 className="font-bold">No. of Joints  welded in this previous shift after Weld Test (BSP2): <span className="font-normal text-red-500">{totalCountForBSP2}</span></h2> */}
              </>
              
            )
          }
        </section>

        <Divider className="mb-2 mt-0" />

        {/* <Table 
          columns={weldDataColumns}
          dataSource={info}
          bordered
          scroll={{x: true}}
          pagination={false}
        /> */}
      <Form form={form} layout='vertical' initialValues={formData} onFinish={handleFormSubmit}>
        <div className="border grid grid-cols-5 divide-x divide-y divide-gray-300">
          <div></div>
          <h3 className="font-semibold p-2 text-center">Machine Sno.</h3>
          <h3 className="font-semibold p-2 text-center">Probe Details</h3>
          <h3 className="font-semibold p-2 text-center">Probe DB</h3>
          <h3 className="font-semibold p-2 text-center">Remarks</h3>

          <h3 className="font-semibold p-2 text-center">Head</h3>
          <TextAreaComponent className="no-border" placeholder='Machine S.No.' name='machineSNoHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
          <TextAreaComponent className="no-border" name='probeDetailsHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
          <TextAreaComponent className="no-border" name='probeDbHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>
          <TextAreaComponent className="no-border" name='remarksHead' onChange={(name, value) => handleChange(name, value, setFormData)} required/>

          <h3 className="font-semibold p-2 text-center">Foot</h3>
          <TextAreaComponent className="no-border" name='machineSNoFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
          <TextAreaComponent className="no-border" name='probeDetailsFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
          <TextAreaComponent className="no-border" name='probeDbFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
          <TextAreaComponent className="no-border" name='remarksFoot' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>
        </div>
            
          <Divider className= "mt-0" />

          <FormInputItem placeholder='Enter Remarks' name='shiftRemarks' onChange={(name, value) => handleChange(name, value, setFormData)}  required/>

          <div className='flex justify-center'>
              <Btn htmlType='submit' className='w-36'>End Duty</Btn>
          </div>
          </Form>
    </FormContainer>
  )
}

export default WeldingHome