import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTotalUses } from "../actions/coupons";
class CouponValidation extends Component {
  render() {
    const { couponsList } = this.props.match.params.id;
    return (
      <div center>
        Felicidades has utilizado un cupon
        {console.log(couponsList)
        }
        {/* {setTimeout(() => {
          this.props.history.push(`/detallePublico/${this.props.match.params.id}`);
        }, 4000)} */}
        {/* {this.props.updateTotalUses(couponsList)} */}
        
      </div>
    );
  }
}
const mapStateProps = state => ({ couponsList: state.rootReducer.coupons });

export const CouponValidationComponent = connect(mapStateProps)(CouponValidation);
