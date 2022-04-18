import React, { PureComponent } from 'react';
import { Button, Card, Form, Input, message, Modal } from 'antd';
import style from './index.css';
import { InfoCircleOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import store from 'store'
import { get_info, get_login, get_login_code } from '../../service/service';
const { Meta } = Card;
const FormItem = Form.Item;
import {history} from 'umi'
export default class Index extends PureComponent {
  state = {
    login: true,
    email: '',
    login_code: '',
    timer: 60 ,
    user_name:"",
    user_avatar:"",
  };
  componentDidMount() {
    get_info().then((res) => {
      this.setState({
        user_name: res.user_name,
        user_avatar: res.user_avatar,
      });
    });
  }


  render() {
    const { timer } = this.state;
    return (
      <div>

      </div>
    );
  }
}
