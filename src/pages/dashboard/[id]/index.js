import React, { PureComponent } from 'react';
import { Avatar, Button, Card, Col, Comment, Empty, Form, Input, message, Modal, Row, Tag, Tooltip } from 'antd';
import style from './index.css'
import { get_comment_list, get_info, get_single_source, insert_comment } from '../../../service/service';
import  Header from '../../../components/Header';
import moment from 'moment'
import { CommentOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { history } from '../../../.umi/core/history';
import store from 'store';
const { TextArea } = Input;
const { Meta } = Card;
export default class Index extends PureComponent {
  state = {
    user_name: '',
    user_avatar: '',
    source:"",
    section_list:'',
    isShow:false,
    comment_list: [],
    comments:[],
    submitting: false,
    value: '',
    pre_comment_id:'',
    source_id:'',
    recommend_list:''
  };

  componentDidMount() {
    const {match:{params}} = this.props
    const source_id = params.id
    get_single_source({ source_id}).then(
      (res) => {
        this.setState({
          source:res.source_list,
          section_list:res.section_list,
          source_id:source_id,
          recommend_list:res.recommend_list
        })
      },
    );
    get_info().then(
      (res) => {
        this.setState({
          user_name:res.user_name,
          user_avatar:res.user_avatar,
          source_id:source_id
        })
      },
    );
   this.getCommentList(source_id)
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

  showComment=(pre_comment_id)=>{
    if (!store.get('token')) {
      history.push(`/login?redirect=${window.location.href}`)
    }
    this.setState({
      isShow:true,
      pre_comment_id:pre_comment_id ? pre_comment_id:''
    })
  }

  closeComment=()=>{
    this.setState({
      isShow:false
    })
  }

  getCommentList=(source_id)=>{
    get_comment_list({source_id:source_id}).then(
      (res)=>{
        if (res.comment_list){
          this.setState({
            comment_list:res.comment_list,
            comments:res.comment
          })
        }
      }
    )
  }
  handleSubmit = () => {
    const {
      value,
      pre_comment_id,
      source_id,
    } = this.state;
    if (!value) {
      return;
    }
    this.setState({
      submitting: true,
    });
    setTimeout(() => {
       let newComments  = {
        comment_content:value,
        pre_comment_id:pre_comment_id,
        article_id:source_id
      }
      insert_comment(newComments).then(
        (res)=>{
          if(res){
            this.setState({
              submitting: false,
              value: ""
            },()=>{
              this.getCommentList(source_id)
              this.closeComment()
            });
          }
        })
    }, 500);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  //获取父级的评论名字
  getPreComment=(pre_id)=>{
    const { comments } = this.state
    for(let item of comments){
      if(item.id == pre_id){
        return item.author
      }
    }
  }
  render() {
    const {source,isShow,recommend_list,submitting,value,comment_list} = this.state;
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
            <Modal
              title="想要发表什么呢"
              visible={isShow}
              onOk={()=>{this.showComment()}}
              onCancel={this.closeComment }
              footer={null}
            >
              <div  style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}>
                <TextArea style={{marginBottom:20}} rows={4} onChange={this.handleChange} value={value} />
                <Button htmlType="submit" loading={submitting} onClick={this.handleSubmit} type="primary">
                  发送
                </Button>
              </div>
            </Modal>
            <Row gutter={24} style={{ margin: '10 0 0 0' }}>
              <Col xs={18} sm={18} md={18} lg={18} xl={18} style={{margin:'0 0 24px 24px'}}>
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
                  extra={<Button onClick={()=>{this.showComment()}} icon={<CommentOutlined />} type={'primary'}>发表评论</Button>}
                  title="评论"
                >
                  {
                    comment_list.length > 0 ?
                      comment_list.map((item,index)=>{
                      return(
                       <>
                         {
                           <Comment
                             actions={[<span key="comment-nested-reply-to" onClick={()=>this.showComment(item.id)}>回复</span>]}
                             author={item.author}
                             avatar={<Avatar src={item.avatar} alt="" />}
                             content={
                               <p>
                                 {item.content}
                               </p>
                             }
                             datetime={
                               <Tooltip title={moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')}>
                                 <span>{moment(item.datetime).fromNow()}</span>
                               </Tooltip>
                             }
                           >
                             {
                               item.children.length > 0
                               &&
                               item.children.map((item_child,index)=>{
                                 return(
                                   <Comment
                                     actions={[<span key="comment-nested-reply-to"
                                                     onClick={() => this.showComment(item_child.id)}>回复</span>]}
                                     author={`${item_child.author} 回复给 ${this.getPreComment(item_child['pre_id'])}`}
                                     avatar={<Avatar src={item_child.avatar} alt="" />}
                                     content={
                                       <p>
                                         {item_child.content}
                                       </p>
                                     }
                                     datetime={
                                       <Tooltip title={moment(item_child.datetime).format('YYYY-MM-DD HH:mm:ss')}>
                                         <span>{moment(item_child.datetime).fromNow()}</span>
                                       </Tooltip>
                                     }
                                   />
                                 )
                               })
                             }
                           </Comment>
                         }
                       </>
                      )
                    })
                      :
                      <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%'
                      }}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无评论'} />
                      </div>
                  }
                </Card>
              </Col>
              <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                {
                  recommend_list && recommend_list.map(
                    (item,index)=>{
                      return(
                        <Card
                          bodyStyle={{
                            height: 200,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                          }}

                          style={{ width: 320,marginBottom:10, cursor: 'pointer' }}
                          actions={[
                            <CopyToClipboard text={item.source_url}
                                             onCopy={() => {
                                               message.success('复制成功~')
                                             }}>
                              <Tooltip title='分享'>
                                <LinkOutlined onClick={this.shareUrl} />
                              </Tooltip>
                            </CopyToClipboard>,
                            <Tooltip title='前往'>
                              <EyeOutlined onClick={() => {
                                this.locationChage(item.source_url);
                              }} />
                            </Tooltip>,
                          ]}
                          className={style.card}
                          title={'推荐'}
                        >
                          <div style={{ height: '100%' }} onClick={
                            () => {
                              window.location.href = `/${item.source_id}`;
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
                      )
                    }
                  )
                }
              </Col >
            </Row>
          </div>
        }
      </>
    )
  }
}
