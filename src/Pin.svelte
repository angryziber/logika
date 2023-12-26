<script lang="ts">
  export let color: string
  export let emptySymbol = '\u00A0'
  export let active = false
  export let draggable = false
</script>

<div class="pin" class:active
     style="color: {color}; {draggable ? 'cursor: move' : ''}" draggable={draggable}
     on:pointerdown on:dragenter|preventDefault on:dragover|preventDefault on:drop
>{color ? '⬤' : emptySymbol}</div>

<style>
  .pin {
    user-select: none;
    border: 1px solid #ccc;
    margin: -1px 0 0 -1px;
    width: 3rem;
    line-height: 2.8rem;
    padding-bottom: 0.2rem;
    font-size: 1.5rem;
  }

  .pin:hover {
    background: #cdcdcd;
    cursor: pointer;
  }

  .pin.active {
    background: #ccc;
    border-color: black;
    position: relative;
    z-index: 1;
  }
</style>
