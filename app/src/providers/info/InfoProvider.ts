import { HttpParams } from '@angular/common/http'
import { ServerUrl } from '../../contract/url'
import { Api } from '../base/api'
import { InfoArticleWarpRE } from './entity/article'
import { InfoCommentRE } from './entity/comment'
import { InfoPreviewWarpRE } from './entity/info-preview-warp'
import { InfoSubjectRE } from './entity/subject'

export class InfoProvider extends Api {
  //-----------------------------------资讯相关
  /**
   * 资讯列表
   */
  getInfoList() {
    return this.http.get(`${ServerUrl}/info`)
      .apiOperate<InfoPreviewWarpRE[]>(InfoPreviewWarpRE)
  }

  /**
   * 专题内容
   */
  getSubject(subjectId: number) {
    return this.http.get(`${ServerUrl}/info/subject/${subjectId}`)
      .apiOperate<InfoSubjectRE>(InfoSubjectRE)
  }

  /**
   * 文章内容
   */
  getArticle(articleId: number) {
    return this.http.get(`${ServerUrl}/info/article/${articleId}`)
      .apiOperate<InfoArticleWarpRE>(InfoArticleWarpRE)
  }

  /**
   * 举报文章
   */
  reportArticle(articleId: number, reason: string) {
    let formData = new HttpParams().append('reason', reason)
    return this.http.post(`${ServerUrl}/info/article/${articleId}/report`, formData)
      .apiOperate<undefined>(undefined)
  }

  //-----------------------------------评论相关
  /**
   * 文章评论列表
   */
  getArticleCommentList(articleId: number, offset: number, limit: number) {
    return this.http.get(`${ServerUrl}/info/comment/article/${articleId}`, {
      params: {
        offset: offset.toString(),
        limit: limit.toString()
      }
    })
      .apiOperate<InfoCommentRE[]>(InfoCommentRE)
  }

  /**
   * 专题评论列表
   */
  getSubjectCommentList(subjectId: number, offset: number, limit: number) {
    return this.http.get(`${ServerUrl}/info/comment/subject/${subjectId}`, {
      params: {
        offset: offset.toString(),
        limit: limit.toString()
      }
    })
      .apiOperate<InfoCommentRE[]>(InfoCommentRE)
  }

  /**
   * 给评论点赞
   */
  likeComment(commentId: number) {
    return this.http.post(`${ServerUrl}/info/comment/${commentId}/like`, null)
      .apiOperate<undefined>(undefined)
  }

  /**
   * 专题下发布评论
   */
  postSubjectComment(subjectId: number, content: string) {
    let formData = new HttpParams()
      .append('comment', content)
    return this.http.post(`${ServerUrl}/info/comment/subject/${subjectId}`, formData)
      .apiOperate<InfoCommentRE>(InfoCommentRE)
  }

  /**
   * 文章下发布评论
   */
  postArticleComment(articleId: number, content: string) {
    let formData = new HttpParams()
      .append('comment', content)
    return this.http.post(`${ServerUrl}/info/comment/article/${articleId}`, formData)
      .apiOperate<InfoCommentRE>(InfoCommentRE)
  }
}
