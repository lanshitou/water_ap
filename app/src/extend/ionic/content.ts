import { Content } from "ionic-angular"

export function calcContentDimensions(content: Content) {
  setTimeout(() => {
    content['_readDimensions']()
    content['_writeDimensions']()
  })
}
