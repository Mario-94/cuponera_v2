import React from 'react';
import { Table } from 'reactstrap';

export const CustomerList = props => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Customer</th>
          <th>Collaborator</th>
        </tr>
      </thead>
      {[].map((item, index) => (
        <tbody key={index}>
          <tr>
            <td>{item.name}</td>
            <td>{item.customer ? 'Publicado' : 'no publiado'}</td>
            <td>{item.collaborator ? 'Habilitado' : 'Desabilitado'}</td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
};
