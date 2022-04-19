import React, { PureComponent } from 'react';
import { Avatar, Card, Col, Form, Row } from 'antd';
import style from '../dashboard/index.css';
import { get_single_source } from '../../service/service';
import Header from '../../components/Header';

const { Meta } = Card;
export default class Index extends PureComponent {
  state = {
    user_name: '',
    user_avatar: '',
  };

  componentDidMount() {
    get_single_source({ source_id: 1 }).then(
      (res) => {
        console.log(res);
      },
    );
  }

  render() {
    const { user_name, user_avatar, isModalVisible } = this.state;
    return (
      <div>
        <Header />
        <Row gutter={24} style={{ margin: '10 0 0 0' }}>
          <Col xs={18} sm={18} md={18} lg={18} xl={18}>
            <Card
              bodyStyle={{
                height: 200,
                overflow: 'hidden',
              }}
              style={{ width: 320 }}
              className={style.card}
            >
              <Meta
                avatar={<Avatar src={item.author_avatar} />}
                title={item.source_title}
                description={item.source_desc}
              />
            </Card>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Card
                style={{ width: 300 }}
                title='关于快分享'
              >
                <Meta
                  avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                  title='Card title'
                  description='This is the description'
                />
              </Card>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}
