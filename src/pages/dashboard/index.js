import React, { PureComponent } from 'react'
import { Redirect } from 'umi'
import { Avatar, Col, Input, Menu, Popover, Row } from 'antd';
import {
  MailOutlined, SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import style from './index.css'
const { Search } = Input;
const { SubMenu } = Menu;
class Index extends PureComponent {


 onSearch = value => console.log(value);
  render() {
      return(
        <>
          <div className={style.header}>
            <div className={style.logoBox}>
              <img src={require('../../static/logo.jpg')} className={style.logo} alt='' />
            </div>
            <div>
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={this.onSearch}
              />
            </div>
            <div className={style.popover}>
              <Popover
                placement="bottomRight"
                trigger={["click", "hover"]}
                content={
                  <div
                  className={style.popoverLi}
                  // onClick={this.handleClickMenu}
                >
                  <span>Sign out</span>
                </div>
                }>
                <span>姓名</span>
                <Avatar style={{ marginLeft: 8 }} icon={<UserOutlined />} />
              </Popover>
            </div>
          </div>
          <div className={style.main}>
            <div className={style.menu}>
              <Menu
                onClick={this.handleClick}
                style={{ width: 200 }}
                defaultSelectedKeys={['91']}
                defaultOpenKeys={['91']}
                mode="inline"
              >
                <Menu.Item key="91">推荐</Menu.Item>
                <SubMenu key="sub1" icon={<SettingOutlined />} title="学习资料">
                  <Menu.Item key="9">前端</Menu.Item>
                  <Menu.Item key="10">后端</Menu.Item>
                  <Menu.Item key="11">数据库</Menu.Item>
                  <Menu.Item key="12">其他</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="生活服务">
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="工具大全">
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
            <div className={style.content}>
              <Row gutter={24} style={{margin:0}}>
                <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                  <h1>推荐</h1>
                  <div className={style.contentLeft}>
                    <Row gutter={24}>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        ？？？？？
                      </Col>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        ？？？？？
                      </Col>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        ？？？？？
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <div>古纳倒萨大
                  </div>
                </Col>
              </Row>


            </div>

            {/*<div>*/}
            {/*  */}
            {/*</div>*/}
            {/*<div>*/}
            {/*  */}
            {/*</div>*/}
            {/*<div>*/}
            {/*  */}
            {/*</div>*/}
          </div>
        </>


      )
  }
}

export default Index
