import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTotalUses } from "../actions/coupons";
class CouponValidation extends Component {
  render() {
    const { coupon } = this.props;
    return (
      <div center>
        Felicidades has utilizado un cupon
        {console.log(coupon)
        }
        {/* {setTimeout(() => {
          this.props.history.push(`/detallePublico/${this.props.match.params.id}`);
        }, 4000)} */}
        {/* {this.props.updateTotalUses(coupon)} */}
        
      </div>
    );
  }
}
const mapStateProps = state => ({  coupon: state.rootReducer.coupon });

export const CouponValidationComponent = connect(mapStateProps)(CouponValidation);
