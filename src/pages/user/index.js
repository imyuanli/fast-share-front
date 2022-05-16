import React, { PureComponent } from 'react';
import { Avatar, Button, Card, Col, Drawer, Form, Input, message, Modal, Row, Select, Table } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {
  delete_published,
  get_info,
  get_is_published,
  get_source_list,
  update_published,
} from '../../service/service';
import Header from '../../components/Header';

const { Meta } = Card;
const FormItem = Form.Item;
const { Option } = Select;
const { confirm } = Modal;
export default class Index extends PureComponent {
  state = {
    user_name: '',
    user_avatar: '',
    isModalVisible: false,
    imageUrl: '',
    source_list: '',
    section_list: '',
    visible: false,
    source_title: '',
    source_url: '',
    source_section: '',
    source_desc: '',
    source_id: '',
  };

  componentDidMount() {
    get_info().then((res) => {
      this.setState({
        user_name: res.user_name,
        user_avatar: res.user_avatar,
      });
    });
    get_is_published().then((res) => {
      if (res) {
        this.setState({
          source_list: res.source_list,
          section_list: res.section_list,
        });
      }
    });
  }

  onClick = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  showDrawer = (recode) => {
    this.setState({
      visible: true,
      source_title: recode.source_title,
      source_url: recode.source_url,
      source_section: recode.source_section,
      source_desc: recode.source_desc,
      source_id: recode.source_id,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onFinish = (values) => {
    values.source_id = this.state.source_id;
    update_published(values).then(
      (res) => {
        if (res) {
          this.setState({
            visible: false,
          });
          message.success('更改成功');
          get_source_list().then((res) => {
            this.setState({
              section_list: res.section_list,
              source_list: res.source_list,
            });
          });
          this.setState({
            source_id: '',
          });
        }
      },
    );
  };


  getSection = (section) => {
    const { section_list } = this.state;
    let section_name = '';
    section_list.map((item) => {
      if (Object.keys(item)[0] == section) {
        section_name = Object.values(item)[0];
      }
    });
    return section_name;
  };

  deleteSource = (recode) => {
    confirm({
      title: `确定删除这个资源吗？`,
      okText: '确认删除',
      cancelText: '取消',
      onOk: () => {
        delete_published({ source_id: recode.source_id }).then(
          (res) => {
            if (res) {
              message.success('删除成功');
              get_source_list().then((res) => {
                this.setState({
                  section_list: res.section_list,
                  source_list: res.source_list,
                });
              });
            }
          },
        );
      },
    });
  };

  render() {
    const {
      user_name,
      visible,
      section_list,
      user_avatar,
      source_list,
      isModalVisible,
      source_title,
      source_url,
      source_section,
      source_desc,
    } = this.state;
    const props = {
      name: '',
      action: 'http://127.0.0.1:8000/api/update_info/',
      // headers: {
      //   authorization: 'authorization-text',
      // },
      accept: 'image/png, image/jpeg',
      onChange: this.onChange,
    };
    const columns = [
      {
        title: '资源标题',
        dataIndex: 'source_title',
        key: 'source_title',
      },
      {
        title: '资源类型',
        dataIndex: 'source_section',
        key: 'source_section',
        render: (item) => {
          return (
            <span>{this.getSection(item)}</span>
          );
        },
      },
      {
        title: '资源链接',
        dataIndex: 'source_url',
        key: 'source_url',
      },
      {
        title: '资源描述',
        dataIndex: 'source_desc',
        key: 'source_desc',
      },
      {
        title: '操作',
        dataIndex: 'source_url',
        key: 'source_url',
        render: (item, recode) => (
          <>
            <Button type={'default'} onClick={() => this.showDrawer(recode)} style={{ margin: 5 }}>编辑</Button>
            <Button type={'danger'} onClick={() => this.deleteSource(recode)} style={{ margin: 5 }}>删除</Button>
          </>
        ),
      },
    ];
    return (
      <div>
        <Header />
        <div style={{ marginTop: 70, padding: 24 }}>
          <Row gutter={24} style={{ margin: '10 0 0 0' }}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} style={{ marginBottom: 10 }}>
              <Card
                style={{ width: '100%', marginTop: 16 }}
                actions={[
                  <EditOutlined onClick={this.onClick} key='edit' />,
                ]}
                title={'个人信息'}
              >
                <Meta
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                  avatar={<Avatar src={user_avatar} />}
                  title={user_name}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={19} lg={19} xl={19}>
              <Card
                style={{ width: '100%', marginTop: 16 }}
                title={'已发布'}
              >
                <Table
                  dataSource={source_list}
                  columns={columns}
                  size='small'
                  scroll={{ x: 400 }}
                />
              </Card>

            </Col>
          </Row>
        </div>
        {
          section_list &&
          <Drawer title='发布资源' placement='right'
                  onClose={this.onClose}
                  visible={visible}
          >
            <Form layout='vertical'
                  hideRequiredMark
                  initialValues={{
                    source_title: source_title,
                    source_url: source_url,
                    source_section: source_section,
                    source_desc: source_desc,
                  }}
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
        }

        {/*<Modal title='更改信息'*/}
        {/*       visible={isModalVisible}*/}
        {/*       onOk={this.handleOk}*/}
        {/*       onCancel={this.handleCancel}*/}
        {/*       cancelText={'取消'}*/}
        {/*       okText={'更改'}*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    placeholder='邮箱'*/}
        {/*    defaultValue={user_name}*/}
        {/*    onChange={e => this.setState({ email: e.target.value })}*/}
        {/*  />*/}
        {/*  <Upload {...props}>*/}
        {/*    <Button icon={<UploadOutlined />}>Click to Upload</Button>*/}
        {/*  </Upload>,*/}
        {/*</Modal>*/}
      </div>
    );
  }
}
