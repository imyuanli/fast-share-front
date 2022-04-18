import React, { PureComponent } from 'react';
import { Avatar, Card, Col, List, Row, Tooltip } from 'antd';
import { EyeOutlined, LinkOutlined } from '@ant-design/icons';
import style from './index.css';
import { Link } from 'umi';

const { Meta } = Card;

class Index extends PureComponent {

  locationChage = (url) => {
    window.location.href = url;
    window.returnValue = false;
  };

  render() {
    const { source_list } = this.props;
    return (
      <div className={style.content}>
        <Row gutter={24} style={{ margin: "10 0 0 0" }}>
          <Col xs={18} sm={18} md={18} lg={18} xl={18}>
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
                hideOnSinglePage: true,
              }}
              className={style.list}
              // loading={source_list.length >0 ?:truefalse}
              dataSource={source_list}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  className={style.listItem}
                >
                  <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Card
                      bodyStyle={{
                        height: 200,
                        overflow: 'hidden',
                      }}
                      style={{ width: 320, cursor: 'pointer' }}
                      actions={[
                        <Tooltip title='分享'>
                          <LinkOutlined />
                        </Tooltip>,
                        <Tooltip title='前往'>
                          <EyeOutlined onClick={() => {
                            this.locationChage(item.source_url);
                          }} />
                        </Tooltip>,
                      ]}
                      className={style.card}
                    >
                      <Link to={`/source/${item.source_id}`}>
                        <Meta
                          avatar={<Avatar src={item.author_avatar} />}
                          title={item.source_title}
                          description={item.source_desc}
                        />
                      </Link>
                    </Card>
                  </Col>
                </List.Item>
              )}
            />
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
