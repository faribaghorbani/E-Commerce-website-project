export const filterOrders = (data, search) => {
    data = data.filter((item) => {
        if ((item.customerDetail.firstName +" "+ item.customerDetail.lastName).startsWith(search) ||
        item.customerDetail.lastName.startsWith(search) ||
        item.purchaseTotal.startsWith(search)
        ) {
            console.log(item)
            return item
        }
    })
    return data
}


export const filterProducts = (data, search) => {
    data = data.filter((item) => {
        if (item.name.startsWith(search) ||
        item.brand.toLowerCase().startsWith(search) 
        ) {
            console.log(item)
            return item
        }
    })
    return data
}

export const filterQuantity = (data, search) => {
    data = data.filter((item) => {
        if (item.name.startsWith(search) ||
        item.price.startsWith(search) ||
        item.quantity.startsWith(search)
        ) {
            console.log(item)
            return item
        }
    })
    return data
}