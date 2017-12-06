import Hexagon from './modules/Hexagon'
import SneakerCircle from './modules/SneakerCircle'
import Display from './modules/Display'
import DragModule from './modules/DragModule'
import ClickModule from './modules/ClickModule'
import ZoomModule from './modules/ZoomModule'
import IconType from './modules/IconType'
import SneakerList from './modules/SneakerList'

;(function() {
  window.start = null;
  window.startState = null;
  window.dragFlag = false;
  window.animationTime = 0;
  window.currentAnimationModule = null;

  var svg = document.getElementById("icons");
  var origin = SneakerList[0];
  var hex = new Hexagon(new SneakerCircle(origin.name, origin.iconType));

  for (var i = 0; i < 80; i++) {
    var sneaker = SneakerList[0];
    hex.addApp(new SneakerCircle(sneaker.name, sneaker.iconType));
  }
  // for (var i = 0; i < 80; i++) {
  //   hex.addApp(new SneakerCircle("anon", IconType.ANON));
  // }

  var crown = document.getElementById("crown")

  var display = new Display(svg, hex);
  display.draw();

  var drag = new DragModule(display);
  drag.setDraggable();

  var click = new ClickModule(display, crown);
  click.setClickable();

  var zoom = new ZoomModule(display);
  zoom.setZoomable();
})()
