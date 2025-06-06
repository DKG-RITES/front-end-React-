import React from 'react'

import _ from 'lodash';

const capitalizeCamelCase = (str) => {
  // Convert the camelCase string into an array of words
  const words = _.words(_.camelCase(str));
  
  // Capitalize each word
  const capitalizedWords = words.map(word => _.capitalize(word));
  
  // Join the words with a space
  return capitalizedWords.join(' ');
}



const GeneralInfo = ({data, children}) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 border-[#d9d9d9] border rounded-sm relative">
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
  )
}

export default GeneralInfo
