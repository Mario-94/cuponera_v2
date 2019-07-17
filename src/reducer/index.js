// import { MOSTRAR, ADDCUPON } from '../actions-type/';
import {
  DELETE_COUPON,
  ADDCUPON,
  LIST_COUPONS,
  RETRIVE_COUPON,
  UPDATE_COUPON,
  UPDATE_TOTAL_USES
} from '../actions/coupons';

const initialState = {
  coupons: [],
  coupon: {},
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_COUPONS:
      return Object.assign({}, state, {
        ...state,
        coupons: action.payload,
      });

    case ADDCUPON:
      return Object.assign({}, state, {
        ...state,
        coupons: state.coupons.concat(action.payload),
      });

    case DELETE_COUPON:
      return Object.assign({}, state, {
        ...state,
        coupons: state.coupons.filter(
          x => x._id.$oid !== action.payload.couponID,
        ),
      });

    case RETRIVE_COUPON:
      return Object.assign({}, state, { ...state, coupon: action.payload });

    case UPDATE_COUPON:
      const { couponID, json } = action.payload;
      
      
      return Object.assign({}, state, {
        ...state,
        coupons: state.coupons.map(x => {
          if (x._id.$oid === couponID) {
            return json;
          }
          return x;
        }),
      });
      case UPDATE_TOTAL_USES:
          const { id, json2 } = action.payload;
          
       
          
          return Object.assign({}, state, {
             ...state,
            coupons: state.coupons.map(x => {
              if (x._id.$oid === id) {
                return json2;
              }
              return x;
            }),
          });

    default:
      return state;
  }
}

export default rootReducer;
