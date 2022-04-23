import React, { PureComponent } from 'react';
import { Avatar, Card, Col, Comment, Form, Row, Tag, Tooltip } from 'antd';
import style from './index.css'
import { get_single_source } from '../../../service/service';
import  Header from '../../../components/Header';
import moment from 'moment'

const { Meta } = Card;
export default class Index extends PureComponent {
  state = {
    user_name: '',
    user_avatar: '',
    source:"",
    section_list:''
  };

  componentDidMount() {
    const {match:{params}} = this.props
    const source_id  = params.id
    get_single_source({ source_id}).then(
      (res) => {
        this.setState({
          source:res.source_list,
          section_list:res.section_list
        })
      },
    );
  }
  getSection=(section)=>{
    const {section_list } = this.state;
    let section_name = ""
    section_list.map((item)=>{
      if(Object.keys(item)[0] == section){
        section_name =  Object.values(item)[0]
      }
    })
    return section_name
  }

  render() {
    const {source} = this.state;
    const colorArr = ["magenta","red",
      "volcano","orange",
      "gold","lime","green","cyan","blue","geekblue","purple"]
    return (
      <>
        {
          source && <div className={style.content}>
            <div style={{height:80}}>
              <Header />
            </div>
            <Row gutter={24} style={{ margin: '10 0 0 0' }}>
              <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                <Card
                  bodyStyle={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column'
                  }}
                  title="资源详情"
                  style={{marginBottom:'40px'}}
                >
                  <div className={style.mainHeader}>
                    <img className={style.avatar} src={source.author_avatar} alt='' />
                    <div className={style.title}>{source.source_title}</div>
                    <div>{source.source_desc}</div>
                    <Tag className={style.tag} color={colorArr[source.source_section]}>{this.getSection(source.source_section)}</Tag>
                  </div>
                  <div className={style.mainFooter}>
                    <div className={`${style.text} ${style.url}`}>链接：<a href={source.source_url}>{source.source_url}</a></div>
                    <div className={`${style.text}`}>发布时间：{source.source_time.split("T")[0]}</div>
                    <div className={`${style.text}`}>发布者：{source.author_name}</div>
                  </div>
                </Card>
                <Card
                  bodyStyle={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'flex-start',
                    flexDirection:'column'
                  }}

                  title="评论"
                >
                  <Comment
                    author={<a>Han Solo</a>}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                      <p>
                        你好
                      </p>
                    }
                    datetime={
                      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                  <Comment
                    author={<a>Han Solo</a>}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                    content={
                      <p>
                        你好
                      </p>
                    }
                    datetime={
                      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </Card>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                  <Card
                    style={{ width: 300 }}
                    title='推荐'
                  >
                    文章
                  </Card>
                  <Card
                    style={{ width: 300 }}
                    title='推荐'
                  >
                    文章
                  </Card>
                </Col>
              </Col>
            </Row>
          </div>
        }
      </>
    );
  }
}
