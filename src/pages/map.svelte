<script>
  import { onMount } from "svelte";
  import paper from "paper"
  import camera from '../lib/camera.js'
  import Panel from '../components/toolPanel.svelte'

  let mapContainer, canvas, map, mapGroup,
  dragTool, activeCamera

  let scaleFactor = 1

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
    dragTool = new paper.Tool()

    dragTool.onKeyDown = ent => {
      if (ent.key == 'control') {
        mapGroup.onMouseMove = mapDrag
      }
    }

    dragTool.onKeyUp = ent => {
      if (ent.key == 'control') {
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
      scale: scaleFactor
    })

    mapGroup.addChild(item.group)

    item.group.onClick = ent => changeActiveCamera(item)
  }

  function changeActiveCamera (item) {
    if (activeCamera) {
      activeCamera.setAreaOpacity(0.2)
    }

    item.setAreaOpacity(0.4)
    activeCamera = item
  }

  function changeAngle () {
    activeCamera.viewAngle++

  }

  function changeRadius () {}
</script>




<div class="map__conainer"
  bind:this={mapContainer} 
  on:wheel={mouseWheelHandler}
>
  <canvas class="map" bind:this={canvas}></canvas>
</div>


<Panel
  on:angleEvent={ eventLogger }
  on:radiusEvent={ eventLogger }
>
</Panel>



<style>
  .map {
    width: 100vw;
    min-height: 99vh;
  }
</style>