<script>
  import { createEventDispatcher } from "svelte";

  let emit = createEventDispatcher();
</script>


<div class="tools">
  <button on:click={ () => emit('testEvent') }>Test1</button>
  <button on:click={ () => emit('testEvent') }>Test2</button>
  <button on:click={ () => emit('testEvent') }>Test3</button>
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