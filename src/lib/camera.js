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
    lBorder.add(psn.x + this.radius, psn.y)

    rBorder = lBorder.clone()
    lBorder.rotate(-this.viewAngle, psn)
    rBorder.rotate(this.viewAngle, psn)

    througtPoint = lBorder['segments']['1']['point'].add(10)

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
    console.log('removed!');
    this.viewZone = this.createCamera()
  }

  rotateCamera (angle) {
    this.position = this.eye.position
    this.viewZone.rotate(angle / 10, this.position)
    console.log(this.position);
  }
}



export default cameraItem