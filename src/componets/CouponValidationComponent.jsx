import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTotalUses, retriveCoupon } from "../actions/coupons";
import { Spinner } from "reactstrap";

class CouponValidation extends Component {
  componentDidMount() {
    this.props.retriveCoupon(this.props.match.params.id);
  }
  totalUses(value) {
    console.log(value);
    
    if (value !== "mal") {
      if (value.total_uses >= 0) {
        if (value.total_uses < value.uses_per_user) {
          value.total_uses = value.total_uses + 1;
          // console.log(value.total_uses);
          value.total_coupons = value.total_coupons - 1;
          // console.log(`cupones restantes  ${value.total_coupons}`);
          let nuevoJson = Object.assign(value, value.total_uses, value.total_coupons);
          // console.log(nuevoJson);
          this.props.updateTotalUses(this.props.match.params.id, nuevoJson);
          return (
            <h3>
              Felicidades has utilizado un cupon
              {setTimeout(() => {
                this.props.history.push(`/detallePublico/${this.props.match.params.id}`);
              }, 10000)}
            </h3>
          );
        }
      } else {
        return (
          <h1>
            El cupon Caduco
            {setTimeout(() => {
              this.props.history.push(`/detallePublico/${this.props.match.params.id}`);
            }, 10000)}
          </h1>
        );
      }
    }
  }
  render() {
    const { coupon } = this.props;
    if (!this.props.match.params.id) {
      return <Spinner color="primary" />;
    } else {
      return (
        <div>
          {this.totalUses(new Date() <= new Date(coupon.valid_until) ? coupon : '"mal"')}
          {/* {setTimeout(() => {
            {
              this.totalUses(new Date() <= new Date(coupon.valid_until) ? coupon : "Cupo  Caduco");
            }
            this.props.history.push(`/detallePublico/${this.props.match.params.id}`);
          }, 10000)}  */}
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    coupon: state.rootReducer.coupon,
  };
};
const mapDispatchToProps = dispatch => ({
  retriveCoupon: id => dispatch(retriveCoupon(id)),
  updateTotalUses: (id, json) => {
    console.log("dispatch", { id, json });
    return dispatch(updateTotalUses(id, json));
  },
  dispatch,
});
export const CouponValidationComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CouponValidation);
