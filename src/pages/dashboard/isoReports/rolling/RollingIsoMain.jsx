import React, { useState } from 'react'
import {LineChartOutlined, EyeOutlined, ExperimentOutlined, ToolOutlined, DatabaseOutlined, CompassOutlined, DeploymentUnitOutlined, RadarChartOutlined, AuditOutlined, MessageOutlined } from '@ant-design/icons';
import FormContainer from '../../../../components/DKG_FormContainer';
import FinishingVerification from './FinishingVerificationUrm';
import SubHeader from '../../../../components/DKG_SubHeader';
import RollingControlIso from './RollingControlIso';
import RollingControlIso60E1A1 from './RollingControlIso60E1A1';
import FinishingVerificationRsm from './FinishingVerificationRsm';
import RollingVerificationIso from './RollingVerificationIso';
import RollingVerificationIsoUrm from './RollingVerificationIsoUrm';

const RollingIsoMain = () => {
    const rollingIsoTabs = [
        {
            title: "Finishing Verification ISO Report URM",
            icon: <LineChartOutlined />,
            activeTab: 0
        },
        {
            title: "Finishing Verification ISO Report RSM",
            icon: <ToolOutlined />,
            activeTab: 3
        },
        {
            title: "Rolling Control ISO Report 60E1 IRS52",
            icon: <ExperimentOutlined />,
            activeTab: 1
        },
        {
            title: "Rolling Control ISO Report 60E1A1",
            icon: <EyeOutlined />,
            activeTab: 2
        },
        {
            title: "Rolling Verification ISO Report RSM",
            icon: <DatabaseOutlined />,
            activeTab: 4
        },
        {
            title: "Rolling Verification ISO Report URM",
            icon: <CompassOutlined />,
            activeTab: 5
        },
    ]

    const [activeTab, setActiveTab] = useState(0);
    
  return (
    <FormContainer>
        <SubHeader link="/" />
        <div className="grid grid-cols-2 gap-2">

        {
            rollingIsoTabs.map(item => (
                <div onClick={() => setActiveTab(item.activeTab)} className={`flex justify-between items-center  border border-darkBlueHover w-full p-2 px-4 gap-4 rounded-lg shadow-lg bg-gray-200 cursor-pointer hover:bg-gray-300 ${activeTab === item.activeTab ? 'border-b-2' : ''}`}>
                <span className="records-tab-icon">{item.icon}</span>
                <span className="font-medium">
                  {item.title}
                </span>
              </div>
            ))
        }
        </div>
        {
            activeTab === 0 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Finishing Verification ISO URM</h1>
                <FinishingVerification />
                </div>
            )
        }
        {
            activeTab === 1 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Rolling Control ISO 60E1 IRS52</h1>
                <RollingControlIso />
                </div>
            )
        }
        {
            activeTab === 2 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Rolling Control ISO 60E1A1</h1>
                <RollingControlIso60E1A1 />
                </div>
            )
        }
        {
            activeTab === 3 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Finishing Verification ISO RSM</h1>
                <FinishingVerificationRsm />
                </div>
            )
        }
        {
            activeTab === 4 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Finishing Verification ISO RSM</h1>
                <RollingVerificationIso />
                </div>
            )
        }
        {
            activeTab === 5 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Rolling Verification ISO URM</h1>
                <RollingVerificationIsoUrm />
                </div>
            )
        }
      
    </FormContainer>
  )
}

export default RollingIsoMain
