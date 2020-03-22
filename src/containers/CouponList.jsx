import React, { Component } from "react";
import { connect } from "react-redux";
import { getCouponsList, deleteCoupon } from "../actions/coupons";
import { Spinner, Table, Container } from "reactstrap";

class CouponList extends Component {
  componentDidMount() {
    this.props.getCouponsList();
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    const { deleteCoupon } = this.props;
    deleteCoupon(id);
  }

  render() {
    const { coupons, history } = this.props;

    if (!coupons) {
      return (
        <div>
          <Spinner color="success" />
        </div>
      );
    }
    return (
      <Container>
        <Table hover>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Publicado</th>
              <th>Habilitado</th>
              <th>Vigente/Caduco</th>
              <th>Total de cupones</th>
              <th>Editar</th>
            </tr>
          </thead>
          {coupons.map((item, index) => (
            <tbody key={index}>
              <tr
                onClick={() => {
                  history.push(`/detail/${item._id.$oid}`);
                }}
              >
                <th>{item.image && <img style={{ width: 50, heigth: 50 }} src={item.image} />}</th>
                <th scope="row">{item.name}</th>
                <td>{item.description}</td>
                <td>{item.is_published ? "Publicado" : "no publiado"}</td>
                <td>{item.is_enable ? "Habilitado" : "Desabilitado"}</td>
                <td>{new Date() <= new Date(item.valid_until) ? "Vigente" : "Caduco"}</td>
                <th>{item.total_coupons}</th>
                <td>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      history.push(`/update/${item._id.$oid}`);
                    }}
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.onDelete(item._id["$oid"]);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    coupons: state.rootReducer.coupons,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCoupon: id => dispatch(deleteCoupon(id)),
    getCouponsList: () => dispatch(getCouponsList()),
    dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CouponList);
