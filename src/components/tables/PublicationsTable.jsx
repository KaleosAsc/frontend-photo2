// PublicationsTable.js
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function PublicationsTable({ data, onEdit, onDelete }) {
  return (
    <div className="table-responsive w-100">
      <Table bordered className="text-center">
        <thead>
          <tr>
            <th scope="col">UserName</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Stars</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.userName}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.image} alt="Publication" style={{ width: '100px', height: '100px' }} />
              </td>
              <td>{item.stars}</td>
              <td>
                <Button variant="dark" size="sm" onClick={() => onEdit(item)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button variant="dark" size="sm" onClick={() => onDelete(item)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PublicationsTable;
