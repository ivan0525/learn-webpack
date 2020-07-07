import './common/style/index.less'
class Factory {
  constructor(name) {
    this.name = name
  }
  getName () {
    return this.name
  }
}

const mobilePhone = new Factory('HuaWei')
console.log(mobilePhone)
console.log(mobilePhone.getName())
