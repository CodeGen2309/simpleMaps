import paper from "paper"

class cameraItem {
  constructor ({
    radius = 200, position = [0, 0],
    scale = 1, paper
  }) {
    this.position = position
    this.scale = scale
    this.radius = radius

    this.group
    this.eye
    this.area
    this.vZone
    this.cameraView

    this.scale = scale
    this.scaleFactor = 1
    this.scaleDelta = 0.005

    this.areaOpacity = 0.1
    this.eyeOpacityDelta = 0.05

    this.scaleAnim = false
    this.areaFading = false

    this.cameraAngle = 20
    this.viewAngle = 40
    this.viewRadius = 100

    this.createCamera({scale, position, radius})
    this.initHandlers()
    this.update()
  }

  
  createCamera ({scale, position, radius}) {
    this.group = new paper.Group()
    this.eye   = this.createEye({position})
    this.vZone = this.createZone({position})
    this.cameraView = this.vZone

    this.group.addChild(this.eye)
    this.group.addChild(this.vZone)
    this.group.scale(scale)
  }


  createEye ({position =[0, 0]}) {
    let eye = new paper.Raster({
      source: '/icons/eosMin.png', position
    })

    return eye
  }


  createZone ({position = [0, 0]}) {
    let pOrigin, pClone, circle, area,
    figure

    circle = new paper.Path.Circle(position, this.viewRadius)

    pOrigin = new paper.Path()
    pOrigin.add(position)
    pOrigin.add(position.x + this.viewRadius + 100, position.y)

    pClone = pOrigin.clone()
    pOrigin.rotate(-this.viewAngle, position)
    pClone.rotate(this.viewAngle, position)
    figure = pOrigin.join(pClone)

    area = circle.intersect(figure)
    area.fillColor = 'green'
    area.opacity = 0.1
    
    return area
  }


  // state changers
  setAreaOpacity (opacity) {
    this.areaOpacity = opacity
    this.areaFading = true
  }


  setViewAngle (angle = 30) {
    this.position = this.eye.position
    this.vZone.remove()

    this.vZone = this.createZone({
      position: this.position, 
      radius: 80
    })

    this.group.addChild(this.vZone)
    return true
  }


  // event hadlers
  initHandlers () {
    this.group.onMouseEnter = ent => {
      this.mouseEnterHandler(ent)
    }

    this.group.onMouseLeave = ent => {
      this.mouseLeaveHandler(ent)
    }
  }

  mouseEnterHandler (ent) {
    this.fadeAnim = true
  }

  mouseLeaveHandler (ent) {
    this.fadeAnim = false
    this.eye.opacity = 1
  }

  areaClickHandler (ent) {}


  // animaions
  eyeFading () {
    if (this.eye.opacity > 1) { this.eyeOpacityDelta = -this.eyeOpacityDelta }
    if (this.eye.opacity < 0) { this.eyeOpacityDelta = -this.eyeOpacityDelta }

    this.eye.opacity += this.eyeOpacityDelta
  }

  areaFadeAnimation () {
    let delta = 0.01
    let trashHold = Math.abs(this.cameraView.opacity - this.areaOpacity)

    if (this.cameraView.opacity > this.areaOpacity) { delta = -delta }
    if (trashHold < delta) { this.areaFading = false }

    this.cameraView.opacity += delta
  }

  scaleAnimation () {
    this.scaleFactor += this.scaleDelta

    if (this.scaleFactor > 1.3) {
      this.scaleDelta = -this.scaleDelta
    }

    if (this.scaleFactor < 0.9) {
      this.scaleDelta = -this.scaleDelta
    }

    this.eye.setScaling(this.scaleFactor)
  }

  update () {
    this.group.onFrame = () => {
      if (this.fadeAnim) { this.eyeFading() }

      if (this.areaFading) { this.areaFadeAnimation() }
    }
  }
}



export default cameraItem