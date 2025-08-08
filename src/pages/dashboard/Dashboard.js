import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';   
import { Container, Row, Col, Table } from 'react-bootstrap';
const Dashboard = () => {
    const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [, setError] = useState('');
const navigate= useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
      
        console.log("Token from localStorage:", token);

        const response = await fetch('https://back111.onrender.com/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          },
        });
 const data = await response.json();
         
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }
        setUsers(Array.isArray(data) ? data : data.users || []);
} catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    
    } ;
    if (token) {
    fetchUsers();
  } else {
    navigate("/login"); 
  }
}, [token, navigate]);

    

  return (
     <Container className="mt-4">
      <Row>
        <Col>
        <h1 className='text-center'>Dashboard</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Email</th>
              </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>
      </Container>
    
  );
};

export default Dashboard;
