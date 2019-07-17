export const LIST_COUPONS = "LIST_COUPONS";
export const DELETE_COUPON = "DELETE_COUPON";
export const UPDATE_COUPON = "UPDATE_COUPON";
export const RETRIVE_COUPON = "RETRIVE_COUPON";
export const ADDCUPON = "ADDCUPON";
export const UPDATE_TOTAL_USES = "UPDATE_TOTAL_USES";
//export const

export const getCouponsList = () => dispatch => {
  return fetch(
    "https://api.mlab.com/api/1/databases/cupones_descuentos_v1_prueba/collections/cupon_v1?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i",
  )
    .then(response => response.json())
    .then(json => {
      dispatch({ type: LIST_COUPONS, payload: json });
    });
};

export const AddCoupons = cupones => (dispatch, getState) => {
  console.log(dispatch);
  const url =
    "https://api.mlab.com/api/1/databases/cupones_descuentos_v1_prueba/collections/cupon_v1?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i";
  const request = {
    method: "POST",
    body: JSON.stringify(cupones),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  return fetch(url, request)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: ADDCUPON, payload: json });
    });
};

export const deleteCoupon = couponID => (dispatch, getState) => {
  const url = `https://api.mlab.com/api/1/databases/cupones_descuentos_v1_prueba/collections/cupon_v1/${couponID}?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i`;

  const request = {
    method: "DELETE",
  };
  return fetch(url, request)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: DELETE_COUPON, payload: { couponID } });
    });
};

export const retriveCoupon = couponID => (dispatch, getState) => {
  const url = `https://api.mlab.com/api/1/databases/cupones_descuentos_v1_prueba/collections/cupon_v1/${couponID}?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i`;
  const request = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  return fetch(url, request)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: RETRIVE_COUPON, payload: json });
    });
};

export const updateCoupon = (couponID, json) => (dispatch, getState) => {
  const url = `https://api.mlab.com/api/1/databases/cupones_descuentos_v1_prueba/collections/cupon_v1/${couponID}?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i`;
  const request = {
    method: "PUT",
    body: JSON.stringify(json),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  return fetch(url, request)
    .then(response => response.json())
    .then(json => dispatch({ type: UPDATE_COUPON, payload: couponID, json }));
};
export const updateTotalUses = (couponID, json) => (dispatch, getState) => {
  const url = `https://api.mlab.com/api/1/databases/cupones_descuentos_v1_prueba/collections/cupon_v1/${couponID}?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i`;
  const request = {
    
    method: "PUT",
    body: JSON.stringify(json),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  return fetch(url, request)
    .then(response => response.json())
    .then(json => dispatch({ type: UPDATE_TOTAL_USES, payload: couponID, json }));
};
