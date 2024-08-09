import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import datas from './data.json';

const App = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

useEffect(() => {
    setUsers(datas);
}, []);


  const handleShow = (user = null) => {
    setEditUser(user);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSave = (user) => {
    if (user.id) {
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    } else {
      user.id = users.length + 1;
      setUsers([...users, user]);
    }
    handleClose();
  };

  return (
    <Container>
      <h1 className="my-4">CRUD Operations with React and Bootstrap</h1>
      <Button onClick={() => handleShow()} className="mb-3">Add User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(user)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UserModal show={show} handleClose={handleClose} user={editUser} handleSave={handleSave} />
    </Container>
  );
};

const UserModal = ({ show, handleClose, user, handleSave }) => {
  const [formData, setFormData] = useState({ id: null, name: '', email: '' });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({ id: null, name: '', email: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default App;
