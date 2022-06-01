import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { changeNumberBasketProducts } from '../../../redux/slices/basketProductsSlice'
import { useDispatch } from 'react-redux'
import './style/Counter.scss'

const CounterComponent = ({product, basketNumber}) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(basketNumber)

    const handleIncreaseBasketNumber = (e) => {
        setValue(prev => prev + 1)
        dispatch(changeNumberBasketProducts({product: product, quantity: value + 1}))
		
	}
    const handleDecreaseBasketNumber = (e) => {
        setValue(prev => prev - 1)
		dispatch(changeNumberBasketProducts({product: product, quantity: value - 1}))
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
            <div className='decrease'>{value == 1? <RiDeleteBin6Line onClick={handleDecreaseBasketNumber} /> : <AiOutlineMinus  onClick={handleDecreaseBasketNumber} />}</div>
        </div>
    )
}

export default CounterComponent
