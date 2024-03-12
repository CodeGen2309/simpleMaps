import { wrap } from 'svelte-spa-router/wrap'

export default {
  '/': wrap({ asyncComponent: () => import('./pages/hello.svelte')}),
  '/tst/': wrap({ asyncComponent: () => import('./pages/tst.svelte')}),
}