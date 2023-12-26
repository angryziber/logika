<script lang="ts">
  import {colors, pins} from './config'
  import Pin from './Pin.svelte'

  export let secret: string[] = Array(pins).fill(0).map(() => colors[Math.ceil(Math.random() * colors.length) - 1])
  export let reveal = false

  let secretReveal = Array(pins).fill(false)
  $: if (reveal) secretReveal = secretReveal.fill(true)
</script>

{#each secret as c, i}
  <Pin color={secretReveal[i] ? c : ''} emptySymbol="?"
       on:click={() => secretReveal[i] = !secretReveal[i]}/>
{/each}
