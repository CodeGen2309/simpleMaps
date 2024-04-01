import paper from "paper"

class cameraItem {
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

    this.group
    this.eye
    this.viewZone

    this.areaOpacity = 0.2

    this.eyeFadeAnim = false
    this.areaFadeAnim = false

    this.createCamera()
  }

  
  createCamera () {
    this.group = new paper.Group()
    this.eye   = this.createEye()
    this.viewZone = this.createZone()

    this.group.addChild(this.eye)
    this.group.addChild(this.viewZone)
    this.group.scale(this.scale)
  }


  createEye () {
    let eye = new paper.Raster({
      source: '/icons/eosMin.png',
      position: this.position
    })

    return eye
  }


  createZone () {
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

    througtPoint = rBorder['segments']['1']['point'].subtract(5)

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

    view.rotate(this.cameraAngle, this.position)

    return view
  }


  setViewOpacity (opacity) {
    this.viewZone.opacity = opacity
  }


  setViewAngle (angle) {
    this.viewAngle = angle
    this.viewZone.remove()
    this.viewZone = this.createZone()
    this.group.addChild(this.viewZone)
  }

  rotateCamera (angle) {
    this.position = this.eye.position
    this.cameraAngle = angle

    this.viewZone.remove()
    this.viewZone = this.createZone()
    this.group.addChild(this.viewZone)
  }


  scaleCamera (delta) {
    this.position = this.eye.position
    this.viewZone.scale(delta, this.position)
  }
}



export default cameraItem