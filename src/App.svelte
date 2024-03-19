<script>
  import Router from "svelte-spa-router"
  import routes from './router'
</script>

<main>
  <Router {routes}></Router>
</main>

<style>
  body {
    margin: 0; padding: 0;
  }


  .main {
    width: 100%; height: 100%;
  }
</style>
