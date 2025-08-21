import React, { useState } from 'react'
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import _ from 'lodash';

const capitalizeCamelCase = (str) => {
  // Convert the camelCase string into an array of words
  const words = _.words(_.camelCase(str));

  // Capitalize each word
  const capitalizedWords = words.map(word => _.capitalize(word));

  // Join the words with a space
  return capitalizedWords.join(' ');
}



const GeneralInfo = ({data, children, minimizable = false, defaultMinimized = false}) => {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="border-[#d9d9d9] border rounded-sm relative">
      {minimizable && (
        <div className="flex justify-between items-center p-2 bg-gray-50 border-b border-[#d9d9d9]">
          <span className="font-medium text-gray-700">Shift & Engineers Details</span>
          <Button
            type="text"
            size="small"
            icon={isMinimized ? <DownOutlined /> : <UpOutlined />}
            onClick={toggleMinimize}
            className="flex items-center"
          >
            {isMinimized ? 'Show' : 'Hide'}
          </Button>
        </div>
      )}

      {!isMinimized && (
        <div className="grid grid-cols-2 gap-2 p-2">
          {
              data && Object.keys(data)
              .filter(key => key !== 'loading' && key !== 'error')
              .map((key, index) => {
                  return (
                    <h3 key={key}>{capitalizeCamelCase(key)}: {data[key]}</h3>
                  )
              })
          }

          {children}
        </div>
      )}
    </div>
  )
}

export default GeneralInfo
