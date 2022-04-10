import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Index extends PureComponent {
  render() {
    return (
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
          <Menu.Item key='91'>推荐</Menu.Item>
          <SubMenu key='sub1' icon={<SettingOutlined />} title='学习资料'>
            <Menu.Item key='9'>前端</Menu.Item>
            <Menu.Item key='10'>后端</Menu.Item>
            <Menu.Item key='11'>数据库</Menu.Item>
            <Menu.Item key='12'>其他</Menu.Item>
          </SubMenu>
          <SubMenu key='sub4' icon={<SettingOutlined />} title='生活服务'>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <Menu.Item key='11'>Option 11</Menu.Item>
            <Menu.Item key='12'>Option 12</Menu.Item>
          </SubMenu>
          <SubMenu key='sub4' icon={<SettingOutlined />} title='工具大全'>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <Menu.Item key='11'>Option 11</Menu.Item>
            <Menu.Item key='12'>Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default Index;
