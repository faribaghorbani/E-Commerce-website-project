import React, { useState } from 'react'
import { changeNumberBasketProducts } from '../../../redux/slices/basketProductsSlice'
import { useDispatch } from 'react-redux'
import CounterComponent from './Counter.component'

const BasketTableCell = ({product, quantity, status}) => {
    const dispatch = useDispatch()
    const [basketNumber, setBasketNumber] = useState(() => {
        if (status == 'normal') {
            return quantity
        } else if (status == 'not-enough') {
            return product.quantity
        }
    })

    if (status == 'normal') {
        return (
            <div className='basket-table-cell'>
                <div className='info'>
                    <div>
                        <img className='thumbnail' src={`http://localhost:3002/files/${product.thumbnail}`} />
                    </div>
                    <div>
                        <h4>{product.name}</h4>
                        <h5>{product.price}</h5>
                        <CounterComponent product={product} basketNumber={basketNumber} />
                    </div>
                </div>
            </div>
        )
    }
    if (status == 'not-enough') {
        return (
            <div className='basket-table-cell'>
                <div className='info'>
                    <div>
                        <img className='thumbnail' src={`http://localhost:3002/files/${product.thumbnail}`} />
                    </div>
                    <div>
                        <h4>{product.name}</h4>
                        <h5>{product.price}</h5>
                        <CounterComponent product={product} basketNumber={basketNumber} />
                    </div>
                </div>
                <div className='warning-msg'>عدم موجودی کافی</div>
            </div>
        )
    }
    if (status == 'not-existed') {
        return (
            <div className='basket-table-cell'>
                <div className='warning-msg'>این کالا در انبار موجود نیست</div>
                <div className='info'>
                    <div>
                        <img className='thumbnail' src={`http://localhost:3002/files/${product.thumbnail}`} />
                    </div>
                    <div>
                        <h4>{product.name}</h4>
                        <h5>{product.price}</h5>
                    </div>
                </div>
            </div>
        )
    }
    if (status == 'deleted') {
        return (
            <div className='basket-table-cell'>
                <div className='warning-msg'>این کالا حذف شده است</div>
                <div className='info'>
                    <div>
                        <img className='thumbnail' src={`http://localhost:3002/files/${product.thumbnail}`} />
                    </div>
                    <div>
                        <h4>{product.name}</h4>
                        <h5>{product.price}</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default BasketTableCell;
