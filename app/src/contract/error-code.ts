//基础错误码
export enum ErrorCode {
  OK = 0, //没有错误

  RESULT_ERR = 10, //http请求异常
  JSON_ERR = 11, //解析JSON时出现异常
  TIMEOUT_ERR = 12, //超时

  OAUTH_ERR = 1000, //登录授权码无效/过期
  ALREADY_SEND_VCODE = 1201, //验证码已经发送

  Empty = 2000, //没有数据了
}

//内部错误
export const RESULT_ERR = {code: ErrorCode.RESULT_ERR, message: '请求异常!'}
export const JSON_ERR = {code: ErrorCode.JSON_ERR, message: '解析异常!'}
export const TIMEOUT_ERR = {code: ErrorCode.TIMEOUT_ERR, message: '请求超时!'}

