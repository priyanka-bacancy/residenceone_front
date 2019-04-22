import React, { Component } from 'react';
import Axios from 'axios';
// import logo from './1.jpg';
import './Login.css';
import { Input, Button, Container, Row, Col } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validEmail: '',
      validPassword: '',
      valid: true
    }
    this.onClickAction = this.onClickAction.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onClickAction() {
    if (this.state.email === '') {
      this.setState({ validEmail: 'Email required' });
    }
    if (this.state.password === '') {
      this.setState({ validPassword: 'Password required' })
    }
    else {
      this.setState({ validPassword: '' });
      Axios.post('http://localhost:8080/api/user/login', {
        email: this.state.email,
        password: this.state.password
      })
        .then((res) => {
          if (res.data.status === true) {
            localStorage.setItem('user', JSON.stringify(res.data));
            this.props.history.push('/admin/dashboard');
          }
          else if (this.state.validEmail === '') {
            this.setState({ valid: false })
          }
        })
    }
  }

  isValidEmail() {
    if (this.state.email === '') {
      this.setState({ validEmail: 'Email required' });
    }
    else if (!this.state.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.setState({ validEmail: 'Enter Valid Email' });
    }
    else {
      this.setState({ validEmail: '' });
    }
  }

  isValidPassword() {
    if (this.state.password === '') {
      this.setState({ validPassword: 'Password Required' });
    }
    else {
      this.setState({ validPassword: '' });
    }
  }

  logout() {
    localStorage.clear();
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <center id='heading'><b>La Cadenelle</b></center><br />
        {/* <center>
          <img src={logo} height={150} className="AppLogo" alt="react-js" />
        </center> */}
        <Container id='sign'>
          <Row>
            <Col><span className='login-column'>&#128274;</span> &nbsp;<b className='login'>Login<hr /></b></Col>
          </Row>
          {this.state.valid ? null : <div id='error'>Invalid Username and Password</div>}
          <Row>
            <Col ><b className='login-column'> Email :</b></Col>
          </Row>
          <Row>
            <Col>
              <Input
                type='email'
                name='email'
                placeholder='Enter email'
                value={email}
                onBlur={() => this.isValidEmail()}
                onChange={e => this.onChange(e)}
              />
              <div id='error'> {this.state.validEmail}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className='col'><b className='login-column'>Password :</b></Col>
          </Row>
          <Row>
            <Col>
              <Input
                type='password'
                name='password'
                placeholder='Enter password'
                value={password}
                onBlur={() => this.isValidPassword()}
                onChange={e => this.onChange(e)}
              />
              <div id='error'> {this.state.validPassword}</div>
            </Col>
          </Row>
          <br />
          <hr />
          <Row>
            <Col>
              <Button color="success" type='submit' name='login' className='button' onClick={this.onClickAction}> Login </Button>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default Login;
