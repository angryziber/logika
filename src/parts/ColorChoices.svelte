<script lang="ts">
  import {colors} from '../config'
  import Pin from './Pin.svelte'

  export let activeColor = ''
</script>

<div class="colors">
  {#each colors as color}
    <Pin {color} active={activeColor === color} on:click={() => activeColor = color} draggable/>
  {/each}
</div>

<style>
  .colors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
</style>
