import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeNumberBasketProducts } from '../../../redux/slices/basketProductsSlice'
import CounterComponent from './Counter.component'

const BasketTableCell = ({product, status}) => {
    const basketProducts = useSelector(state => state.basketProducts)

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
                        <CounterComponent product={product} status={status} />
                    </div>
                </div>
                <div className='price'>
                    <h3>قیمت کل: {basketProducts[product.id].quantity*product.price}</h3>
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
                        <CounterComponent product={product} status={status} />
                    </div>

                </div>
                <div className='price'>
                    <h3>قیمت کل: {product.quantity*product.price}</h3>
                </div>
                <div className='warning-msg'>
                    <label>عدم موجودی کافی</label>
                    <label>تعداد انتخابی شما: {basketProducts[product.id].formerQuantity}</label>
                </div>
            </div>
        )
    }
    if (status == 'not-existed') {
        return (
            <div className='basket-table-cell'>
                <div className='info'>
                    <div>
                        <img className='thumbnail' src={`http://localhost:3002/files/${product.thumbnail}`} />
                    </div>
                    <div>
                        <h4>{product.name}</h4>
                        <h5>{product.price}</h5>
                    </div>
                </div>
                <div className='warning-msg'>
                    <label>این کالا در انبار موجود نیست</label>
                </div>
            </div>
        )
    }
    if (status == 'deleted') {
        return (
            <div className='basket-table-cell'>
                <div className='info'>
                    <div>
                        <img className='thumbnail' src={`http://localhost:3002/files/${product.thumbnail}`} />
                    </div>
                    <div>
                        <h4>{product.name}</h4>
                        <h5>{product.price}</h5>
                    </div>
                </div>
                <div className='warning-msg'>
                    <label>این کالا از سایت حذف شده است</label>
                </div>
            </div>
        )
    }
}

export default BasketTableCell;
