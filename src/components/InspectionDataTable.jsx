import { useState } from 'react';
import { Table, Card } from 'antd';

const InspectionDataTable = ({
  dimensionalData = [],
  surfaceData = [],
  loading = false
}) => {
  const [dimensionalPageSize, setDimensionalPageSize] = useState(5);
  const [surfacePageSize, setSurfacePageSize] = useState(5);



  // Columns for Dimensional Inspection Table (3 columns)
  const dimensionalColumns = [
    {
      title: 'Camera Name',
      dataIndex: 'cameraName',
      key: 'cameraName',
      align: 'center',
      width: 120,
      render: (cameraName) => cameraName || 'Unknown',
    },
    {
      title: 'Distance From Head (m)',
      dataIndex: 'distanceFromHead',
      key: 'distanceFromHead',
      align: 'center',
      width: 150,
      render: (distanceFromHead) => {
        if (distanceFromHead === null || distanceFromHead === undefined) {
          return '-';
        }
        // Convert from cm to meters and format to 2 decimal places
        const distanceInMeters = (parseFloat(distanceFromHead) / 100).toFixed(2);
        return `${distanceInMeters} m`;
      },
    },
    {
      title: 'Defect Type',
      dataIndex: 'defectType',
      key: 'defectType',
      align: 'center',
      width: 150,
      render: (defectType) => {
        // Display exact database values
        if (defectType === null || defectType === undefined) {
          return 'null'; // Show "null" for null values
        }

        // Handle empty string
        if (defectType === '') {
          return ''; // Show empty for empty strings
        }

        // If it's a JSON string, parse it
        if (typeof defectType === 'string') {
          // Check if it's JSON format
          if (defectType.startsWith('[') || defectType.startsWith('{')) {
            try {
              const parsed = JSON.parse(defectType);
              if (Array.isArray(parsed)) {
                return parsed.join(', ');
              } else if (typeof parsed === 'object') {
                return Object.values(parsed).filter(v => v !== null && v !== undefined).join(', ');
              }
              return parsed.toString();
            } catch (e) {
              return defectType; // Return original string if JSON parsing fails
            }
          }
          // If it's a regular string, return as is
          return defectType;
        }

        // If it's already an object/array
        if (Array.isArray(defectType)) {
          return defectType.join(', ');
        }

        // For any other type, convert to string
        return String(defectType);
      },
    },
  ];

  // Columns for Surface Inspection Table (3 columns)
  const surfaceColumns = [
    {
      title: 'Camera Name',
      dataIndex: 'cameraName',
      key: 'cameraName',
      align: 'center',
      width: 120,
      render: (cameraName) => cameraName || 'Unknown',
    },
    {
      title: 'Defect Type',
      dataIndex: 'labelName',
      key: 'labelName',
      align: 'center',
      width: 150,
    },
    {
      title: 'Distance (m)',
      dataIndex: 'distance',
      key: 'distance',
      align: 'center',
      width: 120,
      render: (distance) => {
        // Convert cm to meters and format to 2 decimal places
        const distanceInMeters = (distance / 100).toFixed(2);
        return distanceInMeters;
      },
      sorter: (a, b) => a.distance - b.distance,
    },
  ];

  return (
    <div className="inspection-data-tables">
      {/* Dimensional Inspection Table */}
      <Card
        title="Dimensional Inspection Data"
        className="mb-3"
        size="small"
        styles={{ body: { padding: '12px' } }}
      >
        <Table
          columns={dimensionalColumns}
          dataSource={dimensionalData}
          loading={loading}
          rowKey={(record, index) => `dimensional-${record.inspectionId || index}`}
          bordered
          size="small"
          scroll={{ x: true }}
          pagination={{
            pageSize: dimensionalPageSize,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            size: 'small',
            showQuickJumper: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total}`,
            onShowSizeChange: (_, size) => setDimensionalPageSize(size),
          }}
          locale={{
            emptyText: 'No dimensional inspection data available'
          }}
        />
      </Card>

      {/* Surface Inspection Table */}
      <Card
        title="Surface Inspection Data"
        className="mb-3"
        size="small"
        styles={{ body: { padding: '12px' } }}
      >
        <Table
          columns={surfaceColumns}
          dataSource={surfaceData}
          loading={loading}
          rowKey={(record, index) => `surface-${record.id || index}`}
          bordered
          size="small"
          scroll={{ x: true }}
          pagination={{
            pageSize: surfacePageSize,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            size: 'small',
            showQuickJumper: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total}`,
            onShowSizeChange: (_, size) => setSurfacePageSize(size),
          }}
          locale={{
            emptyText: 'No surface inspection data available'
          }}
        />
      </Card>
    </div>
  );
};

export default InspectionDataTable;
