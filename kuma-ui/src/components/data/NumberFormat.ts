import { parsePhoneNumber } from 'libphonenumber-js';

export function priceFormatter(price : number) {
    // const priceNum = parseFloat(price);

    const formatPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
    
    return formatPrice;
}

export function phoneFormatter(phone : string) {
    const phoneNumber = parsePhoneNumber(phone, 'US');

    return phoneNumber.formatNational();
}