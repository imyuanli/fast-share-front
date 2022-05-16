import React, { PureComponent } from 'react';
import { Avatar, Button, Drawer, Form, Input, message, Popover, Select, Tag } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Link,history } from 'umi';
import style from '../../pages/dashboard/index.css';
import store from 'store';
import { get_info, get_source_list, insert_source, search_source } from '../../service/service';
const { Search } = Input;
const { Option } = Select;
export default class Index extends PureComponent {
  state = {
    isLogin: false,
    user_name: '',
    user_avatar: '',
    visible: false,
    search_list: [],
    value: undefined,
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
    get_source_list().then((res) => {
      this.setState({
        section_list: res.section_list,
        source_list: res.source_list,
      });
    });
  }

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
    insert_source(values).then(
      (res) => {
        if (res) {
          this.setState({
            visible: false,
          });
          message.success("发布成功")
          get_source_list().then((res) => {
            this.setState({
              section_list: res.section_list,
              source_list: res.source_list,
            });
          });
        }
      },
    );
  };


  handleSearch = value => {
    if (value) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(
        ()=>{
          search_source({q:value}).then(
            (res)=>{
              this.setState({
                search_list:res.search_list
              })
            }
          )
      }, 300)
    } else {
      this.setState({ search_list: [] });
    }
  };

  handleChange = value => {

    window.location.href = `/${value}`
  };

  handleBlur=()=>{
    this.setState({ search_list: [] });
  }
  render() {
    const { isLogin, user_name, user_avatar, visible, section_list } = this.state;
    const options = this.state.search_list.map(d =>
      <Option key={d.source_id}>
        {d.source_title}
      </Option>
    )
    return (
      <>
        {
          section_list && <div className={style.header}>
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
                          return (
                            <Option key={index} value={Object.keys(item)[0]}>{Object.values(item)[0]}</Option>
                          );
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
              <Select
                showSearch
                value={this.state.value}
                placeholder={'搜索一下吧'}
                style={{
                  width:'200px',
                }}
                allowClear={true}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                onBlur={this.handleBlur}
              >
                {options}
              </Select>
            </div>
            <div className={style.popover}>
              <Popover
                placement='bottomRight'
                trigger={['click', 'hover']}
                content={
                  <div

                  >
                    {
                      isLogin ?
                        <div style={{display:'flex',flexDirection:'column'}}>
                          <span className={style.popoverLi} onClick={this.signOut}>退出登录</span>
                          <span className={style.popoverLi} onClick={()=>{history.push('/user')}}>个人中心</span>
                        </div>
                        :
                        <Link to='/login'>
                          <span className={style.popoverLi}>登录</span>
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
        }
      </>
    );
  }
}
