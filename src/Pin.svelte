<script lang="ts">
  import {createEventDispatcher} from 'svelte'

  export let color: string
  export let emptySymbol = '\u00A0'
  export let active = false
  export let draggable = false

  const dispatch = createEventDispatcher<{click: void}>()
  const click = () => dispatch('click')
</script>

<div class="pin" class:active>
  <div class="inner" class:filled={!!color}
       style="background: {color}; {draggable ? 'cursor: move' : ''}"
       on:pointerdown={click} draggable={draggable}
       on:drop|stopPropagation={click} on:dragenter|preventDefault on:dragover|preventDefault
       {...$$restProps}>
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
    cursor: pointer;
    position: absolute;
    inset: 15%;
    border-radius: 50%;
    box-shadow: inset 5px 5px 10px rgba(0,0,0,0.3);
  }

  .inner.filled {
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3);
  }

  .active .inner {
    outline: 2px solid black;
    outline-offset: 2px;
  }
</style>
