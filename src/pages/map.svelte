<script>
  import { onMount } from "svelte";

  import paper from "paper"
  import camera from '../lib/camera.js'
  import Panel from '../components/toolPanel.svelte'
  import utils from '../lib/multiTool.js'

  let mapContainer, canvas, map, mapGroup,
  dragTool, activeCamera

  let scaleFactor = 1
  let currRotate = 0
  let currScale = 1

  onMount(() => {
    paper.setup(canvas)
    mapGroup = new paper.Group()
    map = new paper.Raster('/img/map.jpg')
    map.scale(0.7)

    mapGroup.addChild(map)
    mapGroup.onDoubleClick = setCamera
    initDragTool()
  })

  function eventLogger (ent) {
    console.log('EVENT!');
    console.log(ent);
  }

  function initDragTool () {
    let mapKey = 'shift'
    dragTool = new paper.Tool()

    dragTool.onKeyDown = ent => {
      if (ent.key == mapKey) {
        mapGroup.onMouseMove = mapDrag
      }
    }

    dragTool.onKeyUp = ent => {
      if (ent.key == mapKey) {
        mapGroup.onMouseMove = null
      }
    }
  }

  function mapDrag (ent) {
    let bounds = mapGroup.bounds
    let width = canvas.width
    let height = canvas.height

    mapGroup.position.x += ent.delta.x
    mapGroup.position.y += ent.delta.y
    
    if (bounds.left > 0)        { bounds.left = 0 }
    if (bounds.top > 0)         { bounds.top = 0 }
    if (bounds.right < width)   { bounds.right = width }
    if (bounds.bottom < height) { bounds.bottom = height }
  }

  function mouseWheelHandler (ent) {
    let delta = ent.wheelDeltaY

    if (delta > 0 && scaleFactor < 2) {
      scaleFactor *= 1.1
      zoom(1.1)
    }

    if (delta < 0 && scaleFactor > 0.4) { 
      scaleFactor *= 0.9
      zoom(0.9)
    }
  }

  function zoom (factor) {
    mapGroup.scale(factor)
  }

  function setCamera (ent) {
    let item = new camera({
      paper: paper,
      position: ent.point,
      scale: scaleFactor,
      cameraAngle: utils.getRandomNumber(0, 360)
    })

    mapGroup.addChild(item.group)
    item.group.onClick = ent => changeActiveCamera(item)
    changeActiveCamera(item)
  }

  function changeActiveCamera (item) {
    if (activeCamera) {
      activeCamera.setViewOpacity(0.2)
    }

    activeCamera = item
    activeCamera.setViewOpacity(0.6)
  }


  function rotateCamera (ent) {
    let angle = ent.detail.rotateAngle

    if (angle == undefined) { return true }
    if (activeCamera == undefined) { return true }
    activeCamera.rotateCamera(angle, scaleFactor)
  }


  function changeRadius (ent) {
    let rds = ent.detail.radius
    console.log(rds);

    if (rds == undefined) { return true }
    if (activeCamera == undefined) { return true }

    activeCamera.changeRadius(rds, scaleFactor)
  }


  function changeAngle (ent) {
    let angle = ent.detail.viewAngle

    if (angle == undefined) { return true }
    if (activeCamera == undefined) { return true }
    activeCamera.setViewAngle(angle, scaleFactor)
  }
</script>




<div class="map__conainer"
  bind:this={mapContainer} 
  on:wheel={mouseWheelHandler}
>
  <canvas class="map" bind:this={canvas}></canvas>
</div>


<Panel
  on:viewAngle={ changeAngle }
  on:rotateEvent={ rotateCamera }
  on:radiusEvent={ changeRadius }
>
</Panel>



<style>
  .map {
    width: 100vw;
    min-height: 99vh;
  }
</style>