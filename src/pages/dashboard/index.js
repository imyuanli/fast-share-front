import React, { PureComponent } from 'react';
import { Avatar, Input, Layout, Popover, Tooltip } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.css';
import Sider from '../../components/Sider';
import Content from '../../components/Content';
import { Link } from 'umi';
import store from 'store'
const { Search } = Input;

class Index extends PureComponent {
  state = {
    isLogin: false,
  };
  componentDidMount() {
    if(store.get("token")){
      this.setState({isLogin:true})
    }
  }

  onSearch = value => console.log(value);

  signOut=()=>{
    store.remove("token")
    this.setState({isLogin:false})
  }
  render() {
    const { isLogin } = this.state;
    return (
      <>
        <Layout hasSider>
          <Sider />
          <Layout style={{ marginLeft: 200, marginTop: 65 }}>
            <div className={style.header}>
              <div className={style.logoBox}>
                <img src={require('../../static/logo.jpg')} className={style.logo} alt='' />
              </div>
              <div>
                <Search
                  placeholder='input search text'
                  allowClear
                  enterButton='Search'
                  size='large'
                  onSearch={this.onSearch}
                />
              </div>
              <div className={style.popover}>
                <Popover
                  placement='bottomRight'
                  trigger={['click', 'hover']}
                  content={
                    <div
                      className={style.popoverLi}
                    >
                      {
                        isLogin ?
                          <span onClick={this.signOut}>Sign out<LoginOutlined /></span>
                          :
                          <Link to='/login'>
                            <span>Sign in</span>
                          </Link>
                      }

                    </div>
                  }>
                  {isLogin && <span>姓名</span>}
                  <Avatar icon={<UserOutlined />} />
                </Popover>
              </div>
            </div>
            <Content />
            <div className={style.footer}>
              <div>
                <Tooltip title='Tooltip will show on mouse enter.'>
                  <span>联系作者</span>
                </Tooltip>
                <Tooltip title='本站仅为网址导航，网站来源于网络，对其内容不负任何责任，若有问题，请联系我'>
                  <span>免责声明</span>
                </Tooltip>
              </div>
              <div>
                Copyright © 2020-2021| Design by 快分享
              </div>
            </div>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default Index;
