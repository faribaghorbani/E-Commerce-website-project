import React from 'react'
import './style/PreviewColors.scss'
import {AiFillCloseCircle} from 'react-icons/ai'


const PreviewColors = ({colors, updateColors}) => {

    const removeColor = (color) => {
        updateColors(colors.filter(item => item !== color))
    }

    return (
        <div className='color-uploader-container'>
            {colors.map(item => {
                return (
                    <div className='added-color'>
                        <div className='color' style={{backgroundColor: `${item}`}}></div>
                        <AiFillCloseCircle className='remover' onClick={() => removeColor(item)}/>
                    </div>
                )
            })}
        
        </div>
    )
}

export default PreviewColors;
