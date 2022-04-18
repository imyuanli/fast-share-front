import React, { PureComponent } from 'react';
import { Avatar, Button, Drawer, Form, Input, Layout, Popover, Select, Tooltip } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.css';
import Sider from '../../components/Sider';
import Content from '../../components/Content';
import { Link } from 'umi';
import store from 'store';
import { get_info, get_source_list, insert_source } from '../../service/service';

const { Search } = Input;
const { Option } = Select;

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
    if (store.get('token')) {
      this.setState({ isLogin: true });
      get_info().then((res) => {
        this.setState({
          user_name: res.user_name,
          user_avatar: res.user_avatar,
        });
      });
    }
    //获取全部资源
    get_source_list().then((res) => {
      this.setState({
        section_list: res.section_list,
        source_list: res.source_list,
      });
    });
  }

  onSearch = value => console.log(value);

  signOut = () => {
    store.remove('token');
    this.setState({ isLogin: false });
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onFinish = (values) => {
    console.log(values);
    insert_source(values).then(
      (res)=>{
        if(res){
          this.setState({
            visible: false,
          });
          get_source_list().then((res) => {
            this.setState({
              section_list: res.section_list,
              source_list: res.source_list,
            });
          });
        }
      }
    )
  };

  render() {
    const { isLogin, user_name, user_avatar, visible, section_list, source_list } = this.state;

    return (
      <>
        {
          source_list && <Layout hasSider>
            <Sider />
            <Layout style={{ marginLeft: 200, marginTop: 65 }}>
              <div className={style.header}>
                <div className={style.logoBox}>
                  <img src={require('../../static/logo.jpg')} className={style.logo} alt='' />
                </div>
                <div>
                  <Button type='primary' icon={<PlusOutlined />} onClick={this.showDrawer}>
                    发布资源
                  </Button>
                  <Drawer title='发布资源' placement='right'
                          onClose={this.onClose}
                          visible={visible}
                  >
                    <Form layout='vertical'
                          hideRequiredMark

                          initialValues={{ remember: true }}
                          onFinish={this.onFinish}
                    >
                      <Form.Item
                        name='source_title'
                        label='标题'
                        rules={[{ required: true, message: '请输入资源的标题' }]}
                      >
                        <Input placeholder='输入资源的标题' />
                      </Form.Item>
                      <Form.Item
                        name='source_url'
                        label='链接'
                        rules={[{ required: true, message: '请输入资源的链接' }]}
                      >
                        <Input
                          style={{ width: '100%' }}
                          placeholder='输入资源的链接'
                        />
                      </Form.Item>
                      <Form.Item
                        name='source_section'
                        label='类型'
                        rules={[{ required: true, message: '请选择资源的类型' }]}
                      >
                        <Select placeholder='选择资源类型'>
                          {
                            section_list.map((item, index) => {
                              return(
                                <Option key={index} value={Object.keys(item)[0]}>{Object.values(item)[0]}</Option>
                              )
                            })
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name='source_desc'
                        label='描述'
                      >
                        <Input.TextArea maxLength={100} rows={4} placeholder='输入资源的描述' />
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                          提交
                        </Button>
                      </Form.Item>
                    </Form>
                  </Drawer>
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
                            <span onClick={this.signOut}>退出登录</span>
                            :
                            <Link to='/login'>
                              <span>登录</span>
                            </Link>
                        }

                      </div>
                    }>
                    {isLogin && <span style={{ marginRight: 10 }}>{user_name}</span>}
                    {isLogin ? <Avatar src={user_avatar} />
                      :
                      <Avatar icon={<UserOutlined />} />
                    }
                  </Popover>
                </div>
              </div>
              <Content section_list={section_list} source_list={source_list} />
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
        }

      </>
    );
  }
}

export default Index;
