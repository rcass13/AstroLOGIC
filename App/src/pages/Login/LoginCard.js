import React, { useState, useEffect } from 'react';
import CustomInput from '../../components/CustomInput';
import { Card, Form, Button} from 'react-bootstrap';
// import 'bootswatch/dist/vapor/bootstrap.min.css'; // Added this :boom:
import '../../styles/bootstrap.min.css';
import '../../styles/login.css';

const LoginCard = ({setAuth}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState();

    useEffect(() => {
        const isValidEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(email);
        if (isValidEmail) {
            setEmailError(null);
        } else {
            setEmailError('Invalid email')
        }
      }, [email])
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const loginData = {
        email: email,
        password: password,
      };
  
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        body: JSON.stringify(loginData)
      })
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then(data => {
          setAuth(data)
          console.log('Login successful:', data);
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    };
  
    return (
      <Card className="card border-primary mb-3"style={{width: '40rem' }}>
      <Card.Header as="h5"className="text-white">Login</Card.Header>
      <Card.Body className="justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <CustomInput className="form-control"
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={setEmail}
              error={emailError}
          />
           <CustomInput className="form-control"
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={setPassword}
          />
          <Button className="btn btn-primary" type="submit">Login</Button>
        </Form>
      </Card.Body>
    </Card>
    );
  };

export default LoginCard;
