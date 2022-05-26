import React from 'react'

const PreviewColors = ({colors, updateColors}) => {

    const removeColor = (color) => {
        updateColors(colors.filter(item => item !== color))
    }

    return (
        <div>
            {colors.map(item => {
                return (
                    <div>
                        <div style={{backgroundColor: `${item}`, width: '50px', height:'50px', borderRadius: '50%'}}></div>
                        <div 
                        style={{backgroundColor: `black`,
                        width: '20px',
                        height:'20px',
                        borderRadius: '50%'}}
                        onClick={() => removeColor(item)}
                        >
                        </div>
                    </div>
                )
            })}
        
        </div>
    )
}

export default PreviewColors;
