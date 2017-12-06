import SneakerCircle from './SneakerCircle'
import IconType from './IconType'

function Sentinel(_parentMap, _coord) {
  SneakerCircle.call(this, 'anon', IconType.ANON)
  this.parentMap = _parentMap
  this.coord = _coord
  this.backgroundColor = 'black'
}

Sentinel.prototype = new SneakerCircle()
Sentinel.prototype.constructor = Sentinel
Sentinel.prototype.isSentinel = function() {
  return true
}

export default Sentinel
