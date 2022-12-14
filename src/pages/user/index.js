import React, { PureComponent } from 'react';
import { Avatar, Button, Card, Col, Drawer, Form, Input, message, Modal, Row, Select, Table, Tag } from 'antd';
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
          message.success('????????????');
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
      title: `??????????????????????????????`,
      okText: '????????????',
      cancelText: '??????',
      onOk: () => {
        delete_published({ source_id: recode.source_id }).then(
          (res) => {
            if (res) {
              message.success('????????????');
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
    const colorArr = ["magenta","red",
      "volcano","orange",
      "gold","lime","green","cyan","blue","geekblue","purple"]
    const columns = [
      {
        title: '????????????',
        dataIndex: 'source_title',
        key: 'source_title',
      },
      {
        title: '????????????',
        dataIndex: 'source_section',
        key: 'source_section',
        render: (item) => {
          return (
            <span>{<Tag color={colorArr[item]}>{this.getSection(item)}</Tag>}</span>
          );
        },
      },
      {
        title: '????????????',
        dataIndex: 'source_url',
        key: 'source_url',
      },
      {
        title: '????????????',
        dataIndex: 'source_desc',
        key: 'source_desc',
      },
      {
        title: '??????',
        dataIndex: 'source_url',
        key: 'source_url',
        render: (item, recode) => (
          <>
            <Button type={'primary'} onClick={() => this.showDrawer(recode)} style={{ margin: 5 }}>??????</Button>
            <Button type={'danger'} onClick={() => this.deleteSource(recode)} style={{ margin: 5 }}>??????</Button>
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
                title={'????????????'}
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
                title={'?????????'}
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
          <Drawer title='????????????' placement='right'
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
                label='??????'
                rules={[{ required: true, message: '????????????????????????' }]}
              >
                <Input placeholder='?????????????????????' />
              </Form.Item>
              <Form.Item
                name='source_url'
                label='??????'
                rules={[{ required: true, message: '????????????????????????' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder='?????????????????????'
                />
              </Form.Item>
              <Form.Item
                name='source_section'
                label='??????'
                rules={[{ required: true, message: '????????????????????????' }]}
              >
                <Select placeholder='??????????????????'>
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
                label='??????'
              >
                <Input.TextArea maxLength={100} rows={4} placeholder='?????????????????????' />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                  ??????
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        }

        {/*<Modal title='????????????'*/}
        {/*       visible={isModalVisible}*/}
        {/*       onOk={this.handleOk}*/}
        {/*       onCancel={this.handleCancel}*/}
        {/*       cancelText={'??????'}*/}
        {/*       okText={'??????'}*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    placeholder='??????'*/}
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
