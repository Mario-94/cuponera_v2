import React from 'react';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
  Badge,
  CardFooter,
} from 'reactstrap';

export const CouponItemComponent = ({ item, showNameDescription = true }) => (
  <Card>
    {item.image && (
      <CardImg top width="100%" src={item.image} alt="Card image cap" />
    )}

    <CardBody>
      {showNameDescription && (
        <React.Fragment>
          <CardTitle>
            <h2>{item.name}</h2>
          </CardTitle>
          <CardText>{item.description}</CardText>
        </React.Fragment>
      )}
      <hr />
      <Row>
        <Col>
          <h2>
            <Badge color="info">
              <strike>${item.list_price} </strike>
            </Badge>
          </h2>
        </Col>
        <Col>
          <h2>
            <Badge color="danger">%{item.discount_percenatage}</Badge>
          </h2>
        </Col>
        <Col>
          <h2>
            <Badge color="success">
              {item.discount_percenatage
                ? `-${item.discount_percenatage}%`
                : ` -${item.discount_price}$`}
            </Badge>
          </h2>
        </Col>
      </Row>
    </CardBody>
    <CardFooter>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          Empieza
          <div>
            <h4> {item.valid_sice}</h4>
          </div>
        </Col>
        <Col style={{ textAlign: 'center' }}>
          Termina
          <div>
            <h4>{item.valid_until}</h4>
          </div>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);
