import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


const PreviewImages = ({images, updateImages}) => {
    const [previews, setPreviews] = useState([])

    const removePicture = (removedIndex) => {
        let temp = images.filter((item, index) => {
            return index !== removedIndex
        })
        updateImages(temp)
    }
 
    useEffect(() => {
        let temp = []
        images.forEach(item => {
            if (typeof item === 'object') {
                const preview = URL.createObjectURL(item)
                temp = [...temp, preview]
            } else {
                temp = [...temp, 'http://localhost:3002/files/'+ item]
            }
        })
        setPreviews(temp)
    }, [images])

    return (
        <div>
            {previews?.map((item, index) => {
                return (
                    <React.Fragment key={uuidv4()}>
                        {
                        <img src={item} style={{width: '100px', objectFit: 'cover'}} />
                        }
                        <div
                        style={{width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'black'}}
                        onClick={() => removePicture(index)}
                        >
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default PreviewImages
