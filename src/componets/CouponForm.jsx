import React from 'react';
import { renderField } from './RenderField';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import {
  Badge,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { validate, warn, normalizePhone} from './Validations';
import { ImageComponent } from './ImageComponent';

class CouponFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.calculateFinalPrice = this.calculateFinalPrice.bind(this);
    this.truncateDecimals = num => Number.parseFloat(Number.parseFloat(num).toFixed(1))
    
  }
  calculateFinalPrice(event, newValue, previousValue, name) {
    const { dispatch } = this.props;
    const values = { ...this.props, [name]: newValue };
    const { list_price, discount_price, discount_percentage } = values;

    console.log('onchange values', {
      list_price,
      discount_price,
      discount_percentage,
    });
    if (list_price & discount_price || discount_percentage) {
      let finalPrice = 0;
      let finalDiscount_Percentage = 0;
      let finalDiscount_Price = 0;

      if (name === 'discount_price') {
        // Descuento en porcentaje aqui lo calculamos
        finalPrice = discount_price;
        finalDiscount_Percentage =
          ((list_price - discount_price) / list_price) * 100;
        dispatch(
          change(
            'cuponsForm',
            'discount_percentage',
            this.truncateDecimals(finalDiscount_Percentage),
          ),
        );
        return dispatch(
          change(
            'cuponsForm',
            'final_price',
            this.truncateDecimals(finalPrice),
          ),
        );
      }
      if (name === 'discount_percentage') {
        // Descuento en precio aqui lo calculamos
        finalPrice = list_price - (list_price * discount_percentage) / 100;
        dispatch(
          change(
            'cuponsForm',
            'discount_price',
            this.truncateDecimals(finalPrice),
          ),
        );
        return dispatch(
          change(
            'cuponsForm',
            'final_price',
            this.truncateDecimals(finalPrice),
          ),
        );
      }
      if ((name = 'list_price')) {
        if (discount_price) {
          finalPrice = discount_price;
          finalDiscount_Percentage =
            ((list_price - discount_price) / list_price) * 100;
          dispatch(
            change(
              'cuponsForm',
              'final_price',
              this.truncateDecimals(finalPrice),
            ),
          );
          return dispatch(
            change(
              'cuponsForm',
              'discount_percentage',
              this.truncateDecimals(finalDiscount_Percentage)
            ),
          );
        }
        if (discount_percentage) {
          finalPrice = list_price - (list_price * discount_percentage) / 100;
          dispatch(
            change(
              'cuponsForm',
              'discount_price',
              this.truncateDecimals(finalPrice),
            ),
          );
          return dispatch(
            change(
              'cuponsForm',
              'final_price',
              this.truncateDecimals(finalPrice),
            ),
          );
        }
      }
    }
  }
  
  render() {

    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      discountPercentage,
      list_price,
      discount_price,
      discount_percentage,
      dispatch,
      
    } = this.props;


    // console.log({ list_price, discount_price, discount_percentage, dispatch });

    return (
      <div>
        <Form onSubmit={handleSubmit} id="form1">
          {/*imagenes */}
          <FormGroup>
            <Field name="image" component={renderField} label="imagen" />
          </FormGroup>
          {/* nombre del cupon */}
          <FormGroup>
            <Field
              name="name"
              component={renderField}
              type="text"
              label="Nombre"
            />
          </FormGroup>
          {/* descripcion del cupon */}
          <FormGroup>
            <Field
              name="description"
              component={renderField}
              type="textarea"
              label="Descripcion"
            />
          </FormGroup>
          <FormGroup>
            <Field
              name="list_price"
              component={renderField}
              type="number"
              label="Precio de Producto"
              onChange={this.calculateFinalPrice}
              parse={value => (!value ? null : Number.parseFloat(value))}
            />
          </FormGroup>
          {/* tipo de cupon */}
          <div>
            <label>
              <h4>
                <Badge color="info"> Tipo de cupon</Badge>
              </h4>

              {/* cupon de porcentaje es decir "se descuenta sierto porsentaje al producto" */}
              <div>
                <FormGroup>
                  <Field
                    name="porcentage_descuento"
                    component={renderField}
                    type="radio"
                    value="porcentaje"
                    label="Porcentaje Descuento"
                  />
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                    <Field
                      component={renderField}
                      type="text"
                      name="discount_percentage"
                      disabled={discountPercentage !== 'porcentaje'}
                      onChange={this.calculateFinalPrice}
                       parse={value => (!value ? null : Number.parseFloat(value))} 
                      
                    />
                  </InputGroup>
                </FormGroup>
                {/* <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                    <Field
                      component={renderField}
                      type="text"
                      name="aaa"
                      normalize={normalizePhone}
                    />
                  </InputGroup>
                </FormGroup> */}
                {/* cupon de precio es decir monetario "se descuentan 100 pesos a cierto producto" */}
                <FormGroup>
                  <Field
                    name="porcentage_descuento"
                    component={renderField}
                    type="radio"
                    value="dinero"
                    label="Precio Descuento"
                  />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Field
                      component={renderField}
                      type="number"
                      name="discount_price"
                      disabled={discountPercentage !== 'dinero'}
                      onChange={this.calculateFinalPrice}
                      parse={value => (!value ? null : Number.parseFloat(value))}

                    />
                  </InputGroup>
                </FormGroup>
                {/* Este es en base al tipo de cupon que utilizo el usuario */}
                <FormGroup>
                  <Field
                    component={renderField}
                    type="input"
                    name="final_price"
                    disabled
                    label="precio final"
                    parse={value => (!value ? null : Number.parseFloat(value))}
                  />
                </FormGroup>
              </div>
            </label>
          </div>

          {/* termnos de uso  */}
          <FormGroup>
            <Field
              name="terms_of_use"
              component={renderField}
              type="textarea"
              label="Terminos de uso"
            />
          </FormGroup>

          <hr />
          {/* separador */}
          <h4>
            <Badge color="info">Restricciones</Badge>
          </h4>

          {/* fechas de inicio y fin del cupon */}
          {/* formato de fechas "2019-05-24" */}
          <FormGroup>
            <Label>Valido desde</Label>

            <Field name="valid_since" component={renderField} type="date" onChange={this.Dates_PublishedSice} />
          </FormGroup>

          <FormGroup>
            <Label>Valido hasta</Label>
            <Field name="valid_until" component={renderField} type="date" />
          </FormGroup>

          {/* publicar cupon en una fecha determinada*/}
          <FormGroup>
            <Label> Publicar cupon en esta fecha</Label>
            <Field name="published_since" component={renderField} type="date" onChange={this.Dates_PublishedSice} />
          </FormGroup>

          {/* total de cupones  */}

          <FormGroup>
            <Field
              name="total_coupons"
              component={renderField}
              type="number"
              label="Total de cupones"
              parse={value => (!value ? null : Number(value))}
            />
          </FormGroup>

          {/* uso del cupon por usuario */}

          <FormGroup>
            <Field
              name="uses_per_user"
              component={renderField}
              type="number"
              label="Usos por usuario"
              parse={value => (!value ? null : Number(value))}
            />
          </FormGroup>

          {/* publicar cupon */}

          <FormGroup>
            <Field
              name="is_published"
              component={renderField}
              type="checkbox"
              label="Publicar cupon"
            />
          </FormGroup>

          {/* habilitar cupon */}

          <FormGroup>
            <Field
              name="is_enable"
              component={renderField}
              type="checkbox"
              label="Habilitar cupon"
            />
          </FormGroup>

          {/*total de usos del cupoen el cual sera por default*/}
          {/* <FormGroup>
            <Label>Cupones echos validos</Label>
            <Field
              name="total_uses"
              component="input"
              normalize={greaterThan('total_uses')}
              disabled
            />
          </FormGroup>
        */}
          {/* Localizacion del local puede o no llenar este campo sino se manda vacio */}
          <FormGroup>
            <Field
              name="location"
              component={renderField}
              type="input"
              label="Localizacion del Local"
            />
          </FormGroup>

          <button type="submit">Guardar</button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Limpiar valores
          </button>
        </Form>
      </div>
    );
  }
}

export const CouponForm = reduxForm({
  form: 'cuponsForm',
  validate,
  warn,
})(CouponFormComponent);
