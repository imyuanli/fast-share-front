import React, { PureComponent } from 'react';
import { Input, Layout, Menu, Select, Tooltip } from 'antd';
import style from './index.css';
import Header from '../../components/Header';
import Content from '../../components/Content';
import {get_source_list } from '../../service/service';
const { Sider } = Layout;

class Index extends PureComponent {
  state = {
    isLogin: false,
    user_name: '',
    user_avatar: '',
    visible: false,
    section_list: '',
    source_list: '',
  };

  componentDidMount() {
    //获取全部资源
    get_source_list().then((res) => {
      this.setState({
        section_list: res.section_list,
        source_list: res.source_list,
      });
    });
  }

  handleClick = (value) => {
    get_source_list({ section: value.key }).then((res) => {
      this.setState({
        section_list: res.section_list,
        source_list: res.source_list,
      });
    });
  };

  render() {
    const { section_list, source_list } = this.state;
    return (
      <>
        {
          source_list && <Layout hasSider>
            <Sider
              style={{
                backgroundColor: '#fff',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                marginTop: 60,
              }}
            >
              <Menu
                onClick={this.handleClick}
                style={{ width: 200, height: '100%' }}
                defaultSelectedKeys={['91']}
                defaultOpenKeys={['91']}
                mode='inline'
              >
                <Menu.Item key='91'>全部</Menu.Item>
                {
                  section_list.map((item, index) => {
                    return (
                      <Menu.Item key={Object.keys(item)[0]}>{Object.values(item)[0]}</Menu.Item>
                    );
                  })
                }
              </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200, marginTop: 65 }}>
              <Header />
              <Content section_list={section_list} source_list={source_list} />
              <div className={style.footer}>
                <div>
                  <Tooltip title='qq:2865437316'>
                    <span style={{ margin: 10 }}>联系作者</span>
                  </Tooltip>
                  <Tooltip title='本站仅为网址导航，网站来源于网络，对其内容不负任何责任，若有问题，请联系我'>
                    <span style={{ margin: 10 }}>免责声明</span>
                  </Tooltip>
                </div>
                <div>
                  Copyright © 2020-2021| Design by 快分享
                </div>
              </div>
            </Layout>
          </Layout>
        }

      </>
    );
  }
}

export default Index;
