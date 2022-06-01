import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { changeNumberBasketProducts } from '../../../redux/slices/basketProductsSlice'
import { useDispatch } from 'react-redux'
import './style/Counter.scss'
import ModalComponent from '../../../components/Modal.component'
import { Button } from '@mui/material'

const CounterComponent = ({product, basketNumber}) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(basketNumber)
    const [open, setOpen] = useState(false)

    const handleOpenModal = () => {
        setOpen(true)
    }
    const handleCloseModal = () => {
        setOpen(false)
    }


    const handleIncreaseBasketNumber = () => {
        setValue(prev => prev + 1)
        dispatch(changeNumberBasketProducts({product: product, quantity: value + 1}))
		
	}
    const handleDecreaseBasketNumber = () => {
        setValue(prev => prev - 1)
		dispatch(changeNumberBasketProducts({product: product, quantity: value - 1}))
	}

    const handleRemovingProduct = () => {
        handleDecreaseBasketNumber()
        handleCloseModal()
    }

    return (
        <div className='counter-box'>
            <div className='increase'>{value < product.quantity?<AiOutlinePlus onClick={handleIncreaseBasketNumber} />: <label>حداکثر</label>}</div>
            <input 
            className='counter'
            value={value}
            type={"number"}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault()
                }
            }}
            readOnly
            />
            <div className='decrease'>{value == 1? <RiDeleteBin6Line onClick={handleOpenModal} /> : <AiOutlineMinus  onClick={handleDecreaseBasketNumber} />}</div>
            
            <ModalComponent
                className='warning-modal'
                title={"هشدار"}
                handleClose={handleCloseModal}
                handleOpen={handleOpenModal}
                open={open}
            >
                <h5>آیا از حذف کالا از سبد خرید اطمینان دارید؟</h5>
                <div className='actions'>                    
                    <Button variant="outlined" onClick={() => handleRemovingProduct()}>حذف</Button>
                    <Button variant="outlined" onClick={() => handleCloseModal()}>برگشت</Button>
                </div>
            </ModalComponent>
        </div>
    )
}

export default CounterComponent
