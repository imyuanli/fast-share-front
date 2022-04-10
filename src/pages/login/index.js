import React, { PureComponent } from 'react';
import { Button, Card, Form, Input, message, Modal } from 'antd';
import style from './index.css';
import { InfoCircleOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import store from 'store'
const { Meta } = Card;
const FormItem = Form.Item;
export default class Index extends PureComponent {
  state = {
    login: true,
    email: '',
    code: '',
    timer: 60 ,
  };
  componentDidMount() {

  }

  onChange = () => {
    this.setState({
      login: false,
    });
  };
  loginInfo = () => {
    const { email, code } = this.state;
    if (!email) {
      message.warn('邮箱不能为空');
      return;
    }
    if (!code) {
      message.warn('验证码不能为空');
      return;
    }
  };

  getLoginCode = () => {
    const { email } = this.state;
    if (email.indexOf('@') < 0) {
      message.warn('邮箱格式不正确');
      return;
    }
    if (!email) {
      message.warn('邮箱不能为空');
      return;
    }
    if(this.interval){
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
      this.setState({
        timer: this.state.timer - 1,
      })
      if (this.state.timer <= -1) {
        clearInterval(this.interval)
        this.setState({
          timer: 60,
        })
      }
    }, 1000)
  };

  render() {
    const { timer } = this.state;
    return (
      <div>
        <Modal
          visible={true}
          title='登录'
          footer={null}
          closable={null}
          bodyStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Input
            placeholder='邮箱'
            className={style.inputItem}
            prefix={<MailOutlined />}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            placeholder='验证码'
            className={style.inputItem}
            onChange={e => this.setState({ code: e.target.value })}
            prefix={<KeyOutlined />}
            suffix={
              timer == 60?
                <Button
                  size={'small'}
                  type={'primary'}
                  onClick={this.getLoginCode}
                >发送验证码
                </Button>
                :
                <span>请{timer}秒后重试</span>
            }
          />
          <span style={{
            color: 'red',
            marginBottom: 20,
          }}
          ><InfoCircleOutlined />未注册的账号验证后将会自动注册</span>
          <Button
            size='large'
            type='primary'
            onClick={this.loginInfo}
          >
            注册&登录
          </Button>
        </Modal>
      </div>
    );
  }
}
