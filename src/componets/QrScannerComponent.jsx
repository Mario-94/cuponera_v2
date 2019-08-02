import React from "react";
import QrReader from "react-qr-reader";

import { Row, Col, CardBody, Card, Spinner } from "reactstrap";

export class QrScannerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      currentQR: "",
      scannerError: "",
    };
  }
  handleScan(data) {        
    if (data && data !== this.state.currentQR) {
      this.setState({
        currentQR: data,
      });
      this.props.history.push(`/validateCupon/${this.state.currentQR}`);   
    }
  }
  handleError() {
    this.setState({
      currentQR: "Ocurrio un error",
    });
  }
  toggle() {
    this.setState(state => ({ currentQR: !state.currentQR }));
  }
  render() {
    if (!QrReader) {
      return <Spinner color="primary" />;
    } else {
      return (
        <Row className="justify-content-center mb-5">
          <Col xs="12" lg="7">
           
            <Card>
              <CardBody>
                <QrReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{ width: "100%" }}                  
                />          
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      );
    }
  }
}
