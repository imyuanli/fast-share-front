import React, { PureComponent } from 'react';
import { Avatar, Card, Col, List, message, Row, Tag, Tooltip } from 'antd';
import { EyeOutlined, HeartOutlined, HeartTwoTone, LinkOutlined } from '@ant-design/icons';
import style from './index.css';
import { history } from 'umi';
import { get_collection } from '../../service/service';
import { CopyToClipboard } from 'react-copy-to-clipboard'
const { Meta } = Card;

class Index extends PureComponent {

  state={
    copy_url:''
  }

  locationChage = (url) => {
    window.location.href = url;
    window.returnValue = false;
  };

  getSection=(section)=>{
    const {section_list } = this.props;
    let section_name = ""
    section_list.map((item)=>{
      if(Object.keys(item)[0] == section){
        section_name =  Object.values(item)[0]
      }
    })
    return section_name
  }


  shareUrl=()=>{

  }
  render() {
    const { source_list } = this.props;
    const colorArr = ["magenta","red",
        "volcano","orange",
        "gold","lime","green","cyan","blue","geekblue","purple"]
    return (
      <div className={style.content}>
        <Row gutter={24} style={{ margin: '10 0 0 0' }}>
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
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      style={{ width: 320, cursor: 'pointer' }}
                      actions={[
                        <CopyToClipboard text={item.source_url}
                                         onCopy={() => {
                                           message.success('????????????~')
                                         }}>
                          <Tooltip title='??????'>
                            <LinkOutlined onClick={this.shareUrl} />
                          </Tooltip>
                        </CopyToClipboard>,
                        <Tooltip title='??????'>
                          <EyeOutlined onClick={() => {
                            this.locationChage(item.source_url);
                          }} />
                        </Tooltip>,
                      ]}
                      className={style.card}
                    >
                      <div style={{ height: '100%' }} onClick={
                        () => {
                          history.push(`/${item.source_id}`);
                        }
                      }>
                        <Meta
                          avatar={<img alt=''
                                       style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '50%' }}
                                       src={item.author_avatar} />}
                          title={item.source_title}
                          description={item.source_desc}
                          style={{ height: '100%' }}
                        />
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '0 20px',
                      }}>
                        <Tag color={colorArr[item.source_section]}>{this.getSection(item.source_section)}</Tag>
                      </div>
                    </Card>
                  </Col>
                </List.Item>
              )}
            />
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Card
                style={{ width: 300,marginBottom:20 }}
                title='????????????'
              >
                <Meta
                  avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                  title='imyuanli'
                  description='???????????????????????????????????????????????????????????????????????????????????????????????????'
                />
              </Card>
              <Card
                style={{ width: 300 }}
                title='???????????????'
              >
                <Meta
                  description='????????????????????????????????????????????????????????????????????????????????????????????????'
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
