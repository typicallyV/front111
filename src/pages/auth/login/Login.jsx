import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate= useNavigate();
    const[formData, setFormData] = React.useState({
        email: '',
        
        password: ''
    })
 const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://back111.onrender.com/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
//response into json form
    const result = await response.json();
    console.log(result);
localStorage.setItem("token", result.token);

    navigate("/dashboard"); // Redirect to login page

  } catch (error) {
    console.error('Error:', error);
  } finally {
    setFormData({
      email: '',
      password: ''
    });
  }
};


  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        


        
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
