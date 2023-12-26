<script lang="ts">
  import {createEventDispatcher} from 'svelte'

  export let color: string
  export let emptySymbol = '\u00A0'
  export let active = false
  export let draggable = false

  const dispatch = createEventDispatcher<{click: void}>()
  const click = () => dispatch('click')
</script>

<div class="pin" class:active draggable={draggable} style={draggable ? 'cursor: move' : ''}
     on:pointerdown={click}
     on:drop|stopPropagation={click} on:dragenter|preventDefault on:dragover|preventDefault>
  <div class="inner" class:filled={!!color} style="background: {color}" {...$$restProps}>
    {#if !color}{emptySymbol}{/if}
  </div>
</div>

<style>
  .pin {
    user-select: none;
    height: 3rem;
    width: 3rem;
    position: relative;
    background: transparent;
  }

  .inner {
    font-size: 1.5rem;
    line-height: 1.4;
    position: absolute;
    inset: 15%;
    border-radius: 50%;
    box-shadow: inset 5px 5px 10px rgba(0,0,0,0.3);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .inner.filled {
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3);
  }

  .active .inner, .inner:active {
    outline: 2px solid black;
    outline-offset: 2px;
  }
</style>
