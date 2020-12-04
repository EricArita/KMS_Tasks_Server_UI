import * as React from 'react';
import '../../styles/AuthLayout.scss';
import { Divider } from 'antd';

export class AuthLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='auth-container'>
        <div className='form-wrapper' style={{ display: '' }}>
          <img className='logo' src="/images/kms-logo.png" width={'30%'} />
          {this.props.children}          
        </div>
        <Divider></Divider>
        <div className='footer'>
          <p className='copyright'>Developed By I554 © 2020 KMS Technology</p>    
        </div>
      </div>
    );
  }
}