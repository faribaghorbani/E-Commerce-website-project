export const filterOrders = (data, search) => {
    data = data.filter((item) => {
        if ((item.customerDetail.firstName +" "+ item.customerDetail.lastName).startsWith(search) ||
        item.customerDetail.lastName.startsWith(search) ||
        item.purchaseTotal.startsWith(search)
        ) {
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
            return item
        }
    })
    return data
}

export const filterQuantity = (data, search) => {
    data = data.filter((item) => {
        if (item.name.startsWith(search) ||
        String(item.price).startsWith(search) ||
        String(item.quantity).startsWith(search)
        ) {
            return item
        }
    })
    return data
}