<script>
  import { createEventDispatcher } from "svelte";

  let rotateAngle, viewAngle
  let emit = createEventDispatcher();
</script>


<div class="tools">
  <input type="range"
    on:input={ () => emit('rotateEvent', { rotateAngle }) }
    bind:value = { rotateAngle }
  >

  <input type="range"
    on:input={ () => emit('viewAngle', { radius: viewAngle }) }
    bind:value = { viewAngle }
  >
</div>


<style>
  .tools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;

    position: absolute;
    left: 20px; bottom: 20px;

    width: 400px;
    height: 200px;
    background: white;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, .4);
  }
</style>