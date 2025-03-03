import React, { useState } from 'react'
import {LineChartOutlined, EyeOutlined, ExperimentOutlined, ToolOutlined, DatabaseOutlined, CompassOutlined, DeploymentUnitOutlined, RadarChartOutlined, AuditOutlined, MessageOutlined } from '@ant-design/icons';
import FormContainer from '../../../../components/DKG_FormContainer';
import SubHeader from '../../../../components/DKG_SubHeader';
import WeldDimensionCheckIso from './WeldDimensionCheckIso';
import WeldTestingIso from './WeldTestingIso';
import WeldTltIso from './WeldTltIso';
import WeldingHardnessIso from './WeldingHardnessIso';
import WeldMacroIso from './WeldMacroIso';
import WeldMicroIso from './WeldMicroIso';

const WeldingIsoMain = () => {
    const weldIsoTabs = [
        {
            title: "Welding Dimensional Check",
            icon: <LineChartOutlined />,
            activeTab: 0
        },
        {
            title: "Welding Testing Of Joints",
            icon: <ExperimentOutlined />,
            activeTab: 1
        },
        {
            title: "Welding TLT",
            icon: <ToolOutlined />,
            activeTab: 2
        },
        {
            title: "Welding Hardness",
            icon: <ToolOutlined />,
            activeTab: 3
        },
        {
            title: "Welding Macro",
            icon: <ToolOutlined />,
            activeTab: 4
        },
        {
            title: "Welding Micro",
            icon: <ToolOutlined />,
            activeTab: 5
        },
    ]

    const [activeTab, setActiveTab] = useState(0);
    
  return (
    <FormContainer>
        <SubHeader link="/" />
        <div className="grid grid-cols-2 gap-2">

        {
            weldIsoTabs.map(item => (
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
                    <h1 className="text-2xl font-semibold text-center">Welding Dimensional Check</h1>
                    <WeldDimensionCheckIso />
                </div>
            )
        }
        {
            activeTab === 1 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Weld Testing Of Joints</h1>
                <WeldTestingIso />
                </div>
            )
        }
        {
            activeTab === 2 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Weld TLT</h1>
                <WeldTltIso />
                </div>
            )
        }
        {
            activeTab === 3 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Weld Hardness</h1>
                <WeldingHardnessIso />
                </div>
            )
        }
        {
            activeTab === 4 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Weld Macro</h1>
                <WeldMacroIso />
                </div>
            )
        }
        {
            activeTab === 5 && (
                <div>
                    <h1 className="text-2xl font-semibold text-center">Weld Micro</h1>
                <WeldMicroIso />
                </div>
            )
        }
        {/* {
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

export default WeldingIsoMain
