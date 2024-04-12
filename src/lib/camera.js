import paper from "paper"

export default class {
  constructor ({
    radius = 200, position = [0, 0],
    scale = 1, paper, angle = 30,
    cameraAngle = 40
  }) {

    this.position = position
    this.scale = scale
    this.radius = radius
    this.viewAngle = angle
    this.cameraAngle = cameraAngle
    this.areaOpacity = 0.2

    this.group = new paper.Group()
    this.eye = this.createEye()
    this.viewZone = this.createZone()
  }

  
  createEye () {
    let eye = new paper.Raster({
      source: '/icons/eosMin.png',
      position: this.position
    })

    eye.scale(this.scale)
    this.group.addChild(eye)
    return eye
  }


  createZone () {
    if (this.viewZone != undefined) {
      this.viewZone.remove()
    }

    let lBorder, rBorder, curve,
    througtPoint, view, psn, rds

    psn = this.position
    rds = this.radius

    lBorder = new paper.Path()
    lBorder.add(psn)
    lBorder.add(psn.x, psn.y - rds)

    rBorder = lBorder.clone()
    lBorder.rotate(-this.viewAngle, psn)
    rBorder.rotate(this.viewAngle, psn)

    througtPoint = rBorder['segments']['1']['point'].subtract(this.viewAngle)

    curve = new paper.Path.Arc(
      lBorder['segments']['1']['point'],
      througtPoint,
      rBorder['segments']['1']['point']
    )

    view = lBorder.join(rBorder)
    view.join(curve)

    view.closed = true
    view.fillColor = 'green'
    view.opacity = this.areaOpacity

    view.rotate(this.cameraAngle, psn)
    view.scale(this.scale, psn)

    this.group.addChild(view)
    return view
  }


  setViewOpacity (opacity) {
    this.areaOpacity = opacity
    this.viewZone.opacity = opacity
  }


  setViewAngle (angle, scale) {
    this.viewAngle = angle
    this.scale = scale
    this.position = this.eye.position
    this.viewZone = this.createZone()
  }


  rotateCamera (angle,scale) {
    this.scale = scale
    this.cameraAngle = angle
    this.position = this.eye.position
    this.viewZone = this.createZone()
  }


  changeRadius (radius, scale) {
    this.position = this.eye.position
    this.radius = radius
    this.scale = scale
    this.viewZone = this.createZone()
  }
}