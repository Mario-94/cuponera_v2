import React, { Component } from "react";
import { getCouponsList, updateTotalUses } from "../actions/coupons";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
class prueba extends Component {
  componentDidMount() {
    this.props.getCouponsList();
  }
  totalUses(ID, value) {
    if (value.total_uses >= 0) {
      if (value.total_uses < value.uses_per_user) {
        value.total_uses = value.total_uses + 1;
        console.log(value.total_uses);
        value.total_coupons = value.total_coupons - 1;
        console.log(`cupones restantes  ${value.total_coupons}`);
        let nuevoJson = Object.assign(value, value.total_uses, value.total_coupons);
        console.log(nuevoJson);
        return this.props.updateTotalUses(ID, nuevoJson);
      }
    }
  }

  render() {
    const { couponsList } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <ul>
              {couponsList.map((item, index) => (
                <li>
                  {item._id.$oid}
                  <button onClick={() => this.totalUses(item._id.$oid, item)}>
                    hacer valido cupon
                  </button>
                </li>
              ))}
            </ul>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateProps = state => ({ couponsList: state.rootReducer.coupons });
const mapDispatchProps = dispatch => ({
  getCouponsList: () => dispatch(getCouponsList()),
  updateTotalUses: (id, json) => {
    console.log("dispatch", { id, json });
    return dispatch(updateTotalUses(id, json));
  },
  dispatch,
});
export const Prueba1 = connect(
  mapStateProps,
  mapDispatchProps,
)(prueba);
