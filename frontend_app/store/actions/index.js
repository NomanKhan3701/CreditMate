import * as actionTypes from '../constants/actionTypes';

const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        user,
    };
}

const setOfferList = (offerList) => {
    return {
        type: actionTypes.SET_OFFER_LIST,
        offerList,
    };
}

const setCouponsList = (couponsList) => {
    return {
        type: actionTypes.SET_COUPONS_LIST,
        couponsList,
    };
}

export {
    setUser,
    setOfferList,
    setCouponsList,
};