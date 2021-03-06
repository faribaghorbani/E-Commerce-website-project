import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { changeNumberBasketProducts, changeStatusBasketProducts } from '../../../redux/slices/basketProductsSlice'
import { useDispatch, useSelector } from 'react-redux'

const CounterComponent = ({product, handleAddButton}) => {
    const dispatch = useDispatch()
    const basketProducts = useSelector(state => state.basketProducts)
    const [value, setValue] = useState(basketProducts[product.id]?.quantity)

    const handleIncreaseBasketNumber = (e) => {
        setValue(prev => prev + 1)
        dispatch(changeNumberBasketProducts({product: product, quantity: value + 1}))
		
	}
    const handleDecreaseBasketNumber = (e) => {
        setValue(prev => prev - 1)
        handleAddButton(value - 1)
		dispatch(changeNumberBasketProducts({product: product, quantity: value - 1}))
        if (basketProducts[product.id].status === 'not-enough') {
            dispatch(changeStatusBasketProducts({id: product.id, status: 'normal'}))
        }
	}

    return (
        <>
        <div className='counter-box'>
            <div className='increase'>{value < product.quantity?<AiOutlinePlus onClick={handleIncreaseBasketNumber} />: <label className='most'>حداکثر</label>}</div>
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
            <div className='decrease'>{value == 1? <RiDeleteBin6Line onClick={() => {
                handleDecreaseBasketNumber()
                handleAddButton(0)
            }} /> : <AiOutlineMinus  onClick={handleDecreaseBasketNumber} />}</div>
        </div>
        <div>
            {basketProducts[product.id]?.status == 'not-enough'? 
            (<>
                <label>موجودی تغییر کرده است</label>
                <label>تعداد انتخابی شما:{basketProducts[product.id].formerQuantity}</label>
            </>) : null
            }
        </div>
        </>
    )
}

export default CounterComponent
