import React, { PureComponent } from 'react';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Drawer,
  Form,
  Input,
  List,
  message,
  Modal,
  Popover,
  Select, Upload,
} from 'antd';
import {
  EditOutlined,
  InfoCircleOutlined,
  KeyOutlined,
  MailOutlined,
  PlusOutlined, UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import style from '../dashboard/index.css'
import { get_info, get_login, get_login_code, get_single_source } from '../../service/service';
const { Meta } = Card;
const FormItem = Form.Item;
import { history, Link } from 'umi';
import Header from '../../components/Header';
export default class Index extends PureComponent {
  state = {
    user_name:"",
    user_avatar:"",
    isModalVisible:false,
    imageUrl:''

  };
  componentDidMount() {
    get_info().then((res) => {
      this.setState({
        user_name: res.user_name,
        user_avatar: res.user_avatar,
      });
    });
    get_single_source({source_id:1}).then(
      (res)=>{
        console.log(res);
      }
    )
  }

  onClick=()=>{
    this.setState({
      isModalVisible:true
    })
  }

  handleCancel=()=>{
    this.setState({
      isModalVisible:false
    })
  }


  getBase64=(img, callback)=>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

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

  onChange= (info)=> {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const { user_name,user_avatar,isModalVisible} = this.state;
    const props = {
      name: '',
      action: 'http://127.0.0.1:8000/api/update_info/',
      // headers: {
      //   authorization: 'authorization-text',
      // },
      accept:"image/png, image/jpeg",
      onChange:this.onChange
    };
    return (
      <div>
        <Header />
        <Descriptions
          style={{marginTop: 70}}
          bordered={true}
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          size='small'
        >
          <Descriptions.Item label="用户名">{user_name}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <img style={{width:50,height:50}} src={user_avatar} alt='' />
          </Descriptions.Item>
          <div>
            <Button onClick={this.onClick} icon={<EditOutlined />}>更改</Button>
          </div>
        </Descriptions>
        <Modal title="更改信息"
               visible={isModalVisible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
               cancelText={'取消'}
               okText={'更改'}
        >
          <Input
            placeholder='邮箱'
            defaultValue={user_name}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>,
        </Modal>
      </div>
    );
  }
}
