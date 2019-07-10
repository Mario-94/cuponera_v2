import React from 'react';
import { Container } from 'reactstrap';

export const QrReaderContainer = props => {
  if (typeof window !== 'undefined') {
    const QrScannerComponent = require('../componets/QrScannerComponent')
      .QrScannerComponent; // eslint-disable-line global-require
    return (
      <Container>
        <QrScannerComponent {...props} />
      </Container>
    );
  }
  return null;
};
