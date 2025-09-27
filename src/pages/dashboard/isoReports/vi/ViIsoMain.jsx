import React, { useState } from 'react'
import {LineChartOutlined, EyeOutlined, ExperimentOutlined, ToolOutlined, DatabaseOutlined, CompassOutlined, DeploymentUnitOutlined, RadarChartOutlined, AuditOutlined, MessageOutlined } from '@ant-design/icons';
import FormContainer from '../../../../components/DKG_FormContainer';
import SubHeader from '../../../../components/DKG_SubHeader';
import ViOnlineInspection from './ViOnlineInspection';

const ViIsoMain = () => {
    const viIsoTabs = [
        {
            title: "Online Inspection of Long Rails",
            icon: <LineChartOutlined />,
            activeTab: 0
        },
        // {
        //     title: "Chemical Analysis ISO Report - 1",
        //     icon: <ExperimentOutlined />,
        //     activeTab: 1
        // },
        // {
        //     title: "Chemical Analysis ISO Report - 2",
        //     icon: <ToolOutlined />,
        //     activeTab: 2
        // },
    ]

    const [activeTab, setActiveTab] = useState(0);
    
  return (
    <FormContainer>
        <SubHeader link="/" />
        <div className="grid grid-cols-2 gap-2">

        {
            viIsoTabs.map(item => (
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
                    <h1 className="text-2xl font-semibold text-center">Online Inspection of Long Rails</h1>
                <ViOnlineInspection />
                </div>
            )
        }
        {/* {
            activeTab === 1 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Chemical Analysis ISO - 1</h1>
                <ChemicalAnalysis />
                </div>
            )
        }
        {
            activeTab === 2 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Chemical Analysis ISO - 2</h1>
                <ChemicalAnalysis2 />
                </div>
            )
        } */}
      
    </FormContainer>
  )
}

export default ViIsoMain
