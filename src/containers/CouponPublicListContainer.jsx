import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { CouponItemComponent } from '../componets/CouponItemComponent';
import { getCouponsList } from '../actions/coupons';

class CouponPublicListComponent extends React.Component {
  componentDidMount() {
    this.props.getCouponsList();
  }
  render() {
    const { couponsList, history } = this.props;

    return (
      <Container>
        <h2>Listado de cupones</h2>
        <Row>
          {couponsList.map(item => (
            <Col
              key={item._id.$oid}
              onClick={() => {
                history.push(`/detallePublico/${item._id.$oid}`);
              }}
            >
              <CouponItemComponent item={item} />
              
              
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapState2Props = state => ({ couponsList: state.rootReducer.coupons });
const mapDispatch2Props = dispatch => ({
  getCouponsList: () => dispatch(getCouponsList()),
});
export const CouponPublicListContainer = connect(
  mapState2Props,
  mapDispatch2Props,
)(CouponPublicListComponent);
