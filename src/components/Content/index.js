import React, { PureComponent } from 'react';
import { Avatar, Card, Col, List, Row, Tooltip } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  HeartOutlined,
  LinkOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import style from './index.css';
import {Link} from 'umi'
const { Meta } = Card;

class Index extends PureComponent {
  render() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }
    return (
      <div className={style.content}>
        <div className={style.contentTitle}>推荐</div>
        <Row gutter={24} style={{ margin: 0 }}>
          <Col xs={18} sm={18} md={18} lg={18} xl={18}>
            <div className={style.contentLeft}>
              <Row gutter={24}>
                <List
                  grid={{
                    gutter: 24,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3,
                  }}
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 9,
                  }}
                  dataSource={listData}
                  renderItem={item => (
                    <List.Item
                      key={item.title}
                      className={style.listItem}
                    >
                      <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Link>
                          <Card
                            bodyStyle={{
                              height:200,
                              overflow:'hidden'
                            }}
                            style={{ width: 320 }}
                            actions={[
                              <Tooltip title='收藏'>
                                <HeartOutlined />
                              </Tooltip>,
                              <Tooltip title='分享'>
                                <LinkOutlined />
                              </Tooltip>,
                              <Tooltip title='访问'>
                                <EyeOutlined />
                              </Tooltip>
                            ]}
                            className={style.card}
                          >
                            <Meta
                              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                              title='Card title'
                              description='This is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the descriptionThis is the description'
                            />
                          </Card>
                        </Link>
                      </Col>
                    </List.Item>
                  )}
                />
              </Row>
            </div>
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

export default Index;
