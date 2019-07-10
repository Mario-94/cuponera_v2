import React, { Component } from 'react';
import { formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

// Css
import '../App.css';

// Components
import { CouponForm } from '../componets/CouponForm';
import { CustomerList } from '../componets/CustomersList';

// Action
import { retriveCoupon, updateCoupon, AddCoupons } from '../actions/coupons';

class CouponFormComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      retriveCoupon,
    } = this.props;
    if (id) {
      retriveCoupon(id);
    }
  }

  componentDidUpdate(prevProps) {
    // initiallice form
    if (
      this.props.initialValues !== prevProps.initialValues &&
      Object.keys(this.props.initialValues).length
    ) {
      Object.keys(this.props.initialValues).forEach(element => {
        this.props.dispatch(
          change('cuponsForm', element, this.props.initialValues[element]),
        );
      });
    }
  }

  handleSubmit(values) {
    const {
      AddCoupons,
      updateCoupon,
      match: {
        params: { id },
      },
    } = this.props;
    if (id) {
      return updateCoupon(id, values);
    }
    console.log(values)
     if(!values.valid_since){
      console.log('validando el published_since');
      
      values.valid_since=values.published_since;
    } 
    return AddCoupons({ ...values, total_uses: 0 });

  }
  render() {
    const {
      discountPercentage,
      initialValues,
      readOnly,
      percentage_calculation_money,
      percentage_calculation_percentage,
      list_price,
      discount_price,
      discount_percentage,
    
    } = this.props;

    return (
      <Container>
        <CouponForm
          onSubmit={this.handleSubmit}
          discountPercentage={discountPercentage}
          initialValues={initialValues}
          percentage_calculation_money={percentage_calculation_money}
          percentage_calculation_percentage={percentage_calculation_percentage}
          readOnly={readOnly}
          list_price={list_price}
          discount_price={discount_price}
          discount_percentage={discount_percentage}
        
        />

        {readOnly && <CustomerList />}
      </Container>
    );
  }
}

const selector = formValueSelector('cuponsForm');
const mapStateToProps = (readOnly, asDetail) => state => {
  const obj = {
    discountPercentage: selector(state, 'porcentage_descuento'),
    // uno es de dinero y el otro de porcentaje
    list_price: selector(state, 'list_price'),
    discount_price: selector(state, 'discount_price'), //este me ayuda a obtener el valor de descuento de dinero o porcentaje y me ayudara a calcular ya se el porcentaje de descuento o el precio de descuento
    discount_percentage: selector(state, 'discount_percentage'),

    readOnly,
  };

  if (asDetail) {
    obj.initialValues = state.rootReducer.coupon;
  }

  return obj;
};

const CouponsFactory = (readOnly, asDetail) =>
  connect(
    mapStateToProps(readOnly, asDetail),
    dispatch => {
      return {
        AddCoupons: val => dispatch(AddCoupons(val)),
        retriveCoupon: id => dispatch(retriveCoupon(id)),
        updateCoupon: (id, json) => dispatch(updateCoupon(id, json)),
        dispatch,
      };
    },
  )(CouponFormComponent);

export const CouponFormContainer = CouponsFactory(false, false);
export const DetailCouponContainer = CouponsFactory(true, true);
export const UpdateCouponContainer = CouponsFactory(false, true);
