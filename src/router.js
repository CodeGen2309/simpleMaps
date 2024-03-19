import { wrap } from 'svelte-spa-router/wrap'

export default {
  '/': wrap({ asyncComponent: () => import('./pages/map.svelte')}),
}