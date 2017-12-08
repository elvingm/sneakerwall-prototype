import { sumCoord, subCoord } from './Utility'
import IconType from './IconType'

export default class SneakerCircle {
  constructor(_name, _iconType) {
    this.sneakerName = _name
    this.radius = 50
    this.coord = []
    this.parentMap = undefined

    this.backgroundColor = this.getRandomColor()
    this.iconType = _iconType

    this.icon = this.makeIcon(_iconType)
    this.nearCoords = [[2, 0], [1, 1], [-1, 1], [-2, 0], [-1, -1], [1, -1]]
  }

  getNearApps() {
    var nearAppList = []
    for (var i = 0; i < 6; i++) {
      var nearCoord = sumCoord(this.coord, this.nearCoords[i])
      var nearApp = this.parentMap.getApp(nearCoord)

      nearAppList.push(nearApp)
    }
    return nearAppList
  }

  getNearAppsWithDir(dir) {
    var nearAppsWithDir = []
    var first = dir - 1 < 0 ? 5 : dir - 1
    var last = dir + 1 >= 6 ? 0 : dir + 1

    var nearApps = this.getNearApps()

    nearAppsWithDir.push(nearApps[first])
    nearAppsWithDir.push(nearApps[dir])
    nearAppsWithDir.push(nearApps[last])

    return nearAppsWithDir
  }

  getPosition() {
    var x = this.coord[0] / 2
    var y = this.coord[1] * Math.sqrt(3) / 2
    return [x, y]
  }

  getTunedPosition() {
    var x = this.icon.getAttribute('x') + this.radius
    var y = this.icon.getAttribute('y') + this.radius
    return [x, y]
  }

  tunePosition(tuneValue) {
    var pos = this.getPosition()
    var x = pos[0] + tuneValue[0]
    var y = pos[1] + tuneValue[1]
    this.icon.setAttribute('x', x - this.radius)
    this.icon.setAttribute('y', y - this.radius)
  }

  getDistanceFrom(anotherCircle) {
    var sub = subCoord(this.coord, anotherCircle.coord)
    if (Math.abs(sub[0]) > Math.abs(sub[1])) {
      return (Math.abs(sub[0]) + Math.abs(sub[1])) / 2
    } else return Math.abs(sub[1])
  }

  setRadius(newRad) {
    // if (this.radius - newRad > 0.1) debugger;
    this.radius = newRad
    this.icon.setAttribute('width', newRad * 2)
    this.icon.setAttribute('height', newRad * 2)
  }

  // http://stackoverflow.com/a/1484514
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    // avoid too-dark color
    var count = 0
    for (var i = 1; i <= 3; i++) {
      if (color[i] < '4') count++
    }
    if (count == 3) return this.getRandomColor()
    return color
  }

  isSentinel() {
    return false
  }

  makeIcon(iconType) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '-50 -50 100 100')

    if (iconType == IconType.IMAGE) {
      svg.setAttribute('key', 'sneaker-icon')

      var imageAddr = `/img/sneakers/${this.sneakerName}`
      var icon = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageAddr)
      icon.setAttribute('x', -50)
      icon.setAttribute('y', -50)
      icon.setAttribute('width', 100)
      icon.setAttribute('height', 100)
      var shelf = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      shelf.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/img/shelf.png')
      shelf.setAttribute('x', -55)
      shelf.setAttribute('y', 35)
      shelf.setAttribute('width', 105)
      shelf.setAttribute('height', 15)
      shelf.setAttribute('class', 'shelf')
      //- EGM: Hide Shadow
      // var shadow = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      // shadow.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/img/shadow.png')
      // shadow.setAttribute('x', -55)
      // shadow.setAttribute('y', 25)
      // shadow.setAttribute('width', 100)
      // shadow.setAttribute('height', 15)
      // shadow.setAttribute('class', 'shadow')
      // svg.appendChild(shadow)
      svg.appendChild(shelf)
      svg.appendChild(icon)
    }

    return svg
  }

  getAppAddr() {
    return './sneakers/' + this.sneakerName + '/index.html'
  }
}
