<script lang="ts">
  import {createEventDispatcher} from 'svelte'

  export let color: string
  export let emptySymbol = '\u00A0'
  export let active = false
  export let draggable = false

  const dispatch = createEventDispatcher<{click: void}>()
  const click = () => dispatch('click')
</script>

<div class="pin" class:active
     style={draggable ? 'cursor: move' : ''} draggable={draggable}
     on:pointerdown={click}
     on:drop|stopPropagation={click} on:dragenter|preventDefault on:dragover|preventDefault>
  <div class="hole" class:filled={!!color} style="background: {color}">
    {#if !color}{emptySymbol}{/if}
  </div>
</div>

<style>
  .pin {
    user-select: none;
    height: 3rem;
    width: 3rem;
    position: relative;
  }

  .pin:hover {
    background: #cdcdcd;
  }

  .pin.active {
    background: #ccc;
    border-color: black;
    position: relative;
    z-index: 1;
  }

  .hole {
    font-size: 1.5rem;
    line-height: 1.4;
    cursor: pointer;
    position: absolute;
    inset: 15%;
    border: 1px solid gray;
    border-radius: 50%;
    box-shadow: inset 5px 5px 10px rgba(0,0,0,0.3);
  }

  .hole.filled {
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3);
  }
</style>
