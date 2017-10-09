const LOG_ENABLE = false

const EventLite = {
  _checkEv(name) {
    if (!this._evPool) {
      this._evPool = {}
    }
    if (!Array.isArray(this._evPool[name])) {
      this._evPool[name] = []
    }
    return this._evPool[name]
  },
  fetchAfter: [],
  once(names, fn) {
    if (!Array.isArray(names)) {
      names = [names]
    }
    names.forEach(ev_name => {
      LOG_ENABLE && console.log('once:', ev_name)
      const that = this
      const h_fn = function () {
        this.fetchAfter.push(() => that.remove(names, h_fn))
        return fn.apply(that, arguments)
      }
      this.on(ev_name, h_fn, true)
    })
  },
  get on() { return this.addListener },
  addListener(names, fn) {
    if (Array.isArray(names)) {
      names.forEach(name => {
        LOG_ENABLE && console.log('on:', name)
        this.addOneListener(name, fn)
      })
      return this
    } else {
      return this.addListener([names], fn)
    }
  },
  addOneListener(name, fn) { this._checkEv(name).push(fn) },
  emit() {
    LOG_ENABLE && console.log('emit:', arguments[0])

    const args = Array.prototype.slice.apply(arguments)
    const evs = this._checkEv(args.shift())
    evs.forEach(fn => fn.apply(this, args))
    this.fetchAfter.forEach(fn => fn())
    this.fetchAfter.splice(0, this.fetchAfter.length)
  },
  remove(names, fn) {
    if (Array.isArray(names)) {
      names.forEach(name => {
        const ev_list = this._checkEv(name)
        const index = this._checkEv(name).indexOf(fn)
        if (index !== -1) {
          ev_list.splice(index, 1)
        }
      })
    } else {
      return this.remove([names], fn)
    }
  },
  create(obj = {}) {
    obj.__proto__ = this
    return obj
  },
  assign(obj) {
    Object.keys(this).forEach(key => obj[key] = this[key])
    return obj
  },
}

module.exports = EventLite
