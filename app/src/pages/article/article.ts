import { Component, Injector } from '@angular/core'
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular'
import { InfoArticleWarpRE } from '../../providers/info/entity/article'
import { InfoProvider } from '../../providers/info/InfoProvider'
import { ToastControllerExProvider } from '../../providers/toast-control-ex/toast-controler-ex'
import { BasePage } from '../base/base-page'

@IonicPage({defaultHistory: ['HomePage']})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})
export class ArticlePage extends BasePage {
  articleId: number
  articleData: InfoArticleWarpRE

  noBorder = false

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public infoProvider: InfoProvider, public toastCtrl: ToastControllerExProvider,
              public alertCtrl: AlertController) {
    super(injector)
    this.articleId = this.navParams.data
  }

  onCreate() {
    this.getData()
  }

  onShareClick() {
    this.toastCtrl.show({message: '分享功能正在开发中 敬请期待'})
  }

  onReportClick() {
    this.alertCtrl.create({
      title: '举报文章',
      subTitle: '请选择举报的原因',
      inputs: [
        {
          type: 'radio',
          label: '色情内容',
          value: '色情内容'
        },
        {
          type: 'radio',
          label: '暴力或令人反感的内容',
          value: '色情内容'
        },
        {
          type: 'radio',
          label: '侵犯了我的权利',
          value: '侵犯了我的权利'
        },
        {
          type: 'radio',
          label: '宣言恐怖主义',
          value: '宣言恐怖主义'
        },
        {
          type: 'radio',
          label: '垃圾内容或误导性内容',
          value: '垃圾内容或误导性内容'
        }
      ],
      buttons: [
        {
          text: '取消',
        },
        {
          text: '确定',
          handler: (v) => {
            this.infoProvider.reportArticle(this.articleId, v)
              .loadingOperate()
              .subscribe(
                (v) => {
                  this.alertCtrl.create({
                    title: `感谢您的举报`,
                    subTitle: `如果我们发现此内容违反了我们的准则,便会将其移除`,
                    buttons: ['好的']
                  }).present()
                },
                (v) => {
                  this.toastCtrl.show({message: v.message})
                }
              )
          }
        }
      ]
    }).present()
  }

  private getData() {
    this.loadErrorTipCmp.showLoading()

    this.infoProvider.getArticle(this.articleId)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.articleData = v
          this.loadErrorTipCmp.showContent()
        },
        (v) => {
          this.loadErrorTipCmp.showError(v, this.getData.bind(this))
        }
      )
  }

}
