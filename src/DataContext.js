import React, { createContext, useState } from 'react'

export const data = createContext()
const DataContext = (props) => {
    const [cart , setCart] = useState([])
  return (
    <data.Provider value={{cart:[cart , setCart]}}>
        {props.children}
    </data.Provider>
  )
}

export default DataContext