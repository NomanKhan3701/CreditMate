import * as actionTypes from "../constants/actionTypes";

const initialState = {
    user: {
        email: "",
        name: "",
        age: 19,
        id: null,
        // id: "null",
        coins: 0,
        token: null,
        // token: "null",
        tags: []
    },
    offerList: [],
    couponsList: [],
};

export const updateObject = (oldObject, updatedProperties) => {
    const updated = {
        ...oldObject,
        ...updatedProperties,
    };
    return updated;
};

export const setUser = (state, action) => {
    return updateObject(state, { user: action.user });
}

export const setOfferList = (state, action) => {
    return updateObject(state, { offerList: action.offerList });
}

export const setCouponsList = (state, action) => {
    return updateObject(state, { couponsList: action.couponsList });
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return setUser(state, action);
        case actionTypes.SET_OFFER_LIST:
            return setOfferList(state, action);
        case actionTypes.SET_COUPONS_LIST:
            return setCouponsList(state, action);
        default:
            return state;
    }
}
export default authReducer;