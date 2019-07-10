export const validate = values => {
  const errors = {};
  
 
  // nombre del cupon
  if (!values.name) {
    errors.name = 'Requerido';
  }

  // descripcion del cupon
  if (!values.description) {
    errors.description = 'Requerido';
  }
  //precio de lista del producto
  if (!(Number(values.list_price))) {
    errors.list_price = 'Requerido';
  } else if (isNaN(Number(values.list_price)) < 0) {
    errors.list_price = 'El precio debe ser mayor a Cero';
  }



  // precio descuentos ya sea porcentaje o precio
  if (!values.discount_price) {
    errors.discount_price = 'Requerido';
  } else if (isNaN(Number(values.discount_price))) {
    errors.discount_price = 'Tiene que ser un numero';
  } else if (Number(values.discount_price) < 0) {
    errors.discount_price = 'Lo siento debe ser un descuento mayor a 0';
  }
  // terminos de uso del cupon
  if (!values.terms_of_user) {
    errors.terms_of_user = 'Requerido';
  } else if (values.terms_of_user.length > 256) {
    errors.terms_of_user = 'Descripcion muy grande ';
  }
  // fechas del cupon icnio y fin solo se requiren
 /*  if (!values.valid_sice) {
    errors.valid_sice = 'Requerido';
  } */
  if (!values.valid_until) {
    errors.valid_until = 'Requerido';
  }
  if (values.valid_sice > values.valid_until) {
    errors.valid_until =
      'tienes que ser mayor la fecha de publicacion que la fecha terminacion del cupon';
  }

  if (values.published_since<values.valid_sice) {
    errors.published_since='Revise la fecha de inicio del cupon'
    
  }
  if (values.published_since > values.valid_until) {
    errors.published_since='Revise la fecha fin del cupon'
  }

  // usos por usuario del cupon
  if (!values.uses_per_user) {
    errors.uses_per_user = 'Requerido';
  } else if (Number(values.uses_per_user) <= 0) {
    errors.uses_per_user = 'Tiene que ser un numero mayor a Cero';
  }
  if (values.uses_per_user >= values.total_coupons) {
    errors.uses_per_user =
      'Revise el numero de cupones que creo y los que esta asignando a cada usuario ';
  }

  // total de cupones
  if (!values.total_coupons) {
    errors.total_coupons = 'Requerido';
  } else if (Number(values.total_coupons) < 0) {
    errors.total_coupons = 'Tiene que ser Mayor a Cero';
  }
  if (values.uses_per_user >= values.total_coupons) {
    errors.uses_per_user =
      'Revise el numero de cupones que creo y los que esta asignando a cada usuario ';
  }

  //validacion de descuento de cupon precio con el valor del producto
  if (values.discount_price >= values.list_price) {
    errors.discount_price =
      'Revise el precio del producto y el valor del descuento o no tendras ganancias';
  }  if (values.discount_percentage === 100) {
    errors.discount_percentage =
      'Es un descuento en el que no ganaras nada si se utiliza el cupon ';
  }
  if(values.discount_percentage>100){
    errors.discount_percentage='Revise el porcentaje de descuento'
  }

  return errors;
};
// setTimeout(validate=> validate, 1000)

//warnings me permite registrar aunque estas esten mal
export const warn = values => {
  const warnings = {};
  //Cupon de descuento por porcentaje %
  if (values.discount_percentage >= 50 && values.discount_percentage <= 99) {
    warnings.discount_percentage = 'Seguro de dejar un descuento tan grande ';
  }

  return warnings;
};
 /* sirve para checar que el descuento de porcentaje no sobrepare 100 %  */


