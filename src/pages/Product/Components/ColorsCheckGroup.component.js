import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import './style/ColorsCheckGroup.scss'
import { BsCheck } from 'react-icons/bs'


const ColorsCheckGroup = ({colors, selectColor, selectedColor}) => {

    const handleChangeSelectedColor = (index) => {
        selectColor(index)
    }

    return (
        <div className='product-page colors-check-group'>

            {colors?.map((col, index) => {
                return (
                    <React.Fragment key={uuidv4()}>
                        <div 
                        className='color'
                        style={{
                        background: `${col} content-box`,
                        border: `${index === selectedColor? `4px solid blue`: `2px solid black`}`
                        }}
                        onClick={() => handleChangeSelectedColor(index)}
                        >
                            <BsCheck className='icon'
                            style={{display: `${index === selectedColor? `block`:'none'}`}}
                            />
                        </div>
                    </React.Fragment>
                )
            })}
        
        </div>
    )
}

export default ColorsCheckGroup;
