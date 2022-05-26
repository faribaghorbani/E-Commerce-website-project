import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './style/PreviewImages.scss'
import { AiFillCloseCircle } from 'react-icons/ai'


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
        <div className='image-uploader-container'>
            {previews?.map((item, index) => {
                return (
                    <div className='uploaded-image' key={uuidv4()}>
                        <div className='image'>
                            <img src={item} style={{width: '100px', objectFit: 'cover'}} />
                        </div>
                        <AiFillCloseCircle className='remover' onClick={() => removePicture(index)}/>
                    </div>
                )
            })}
        </div>
    )
}

export default PreviewImages
