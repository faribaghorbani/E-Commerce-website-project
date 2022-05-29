import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './style/ColorsCheckGroup.scss'


const ColorsCheckGroup = ({colors, selectColor, selectedColor}) => {

    const handleChangeSelectedColor = (index) => {
        selectColor(index)
    }

    return (
        <div className='product-page colors-check-group'>

            {colors?.map((col, index) => {
                return (
                    <div 
                    className='color'
                    key={uuidv4()}
                    style={{
                    backgroundColor: `${col}`,
                    border: `${index === selectedColor? `4px solid blue`: `2px solid black`}`
                    }}
                    onClick={() => handleChangeSelectedColor(index)}
                    ></div>
                )
            })}
        
        </div>
    )
}

export default ColorsCheckGroup;
