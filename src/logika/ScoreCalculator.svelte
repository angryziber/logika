<script lang="ts">
  import Score from './Score.svelte'
  import {pins} from './config'
  import {createEventDispatcher} from 'svelte'

  export let row: string[]
  export let secret: string[]
  export let calculated = false

  let correctPosition = 0
  let correctColor = 0

  const dispatch = createEventDispatcher<{won: void}>()

  function calculate() {
    const visited = new Set()
    row.forEach((c, i) => {
      if (c == secret[i]) {
        correctPosition++
        visited.add(i)
      }
    })
    row.forEach((c, i) => {
      if (visited.has(i)) return
      const j = secret.indexOf(c)
      if (j >= 0 && !visited.has(j)) {
        correctColor++
        visited.add(j)
      }
    })
    calculated = true
    if (correctPosition == pins) dispatch('won')
  }
</script>

<div class="score-row" style="width: {pins * 1.5}rem">
  {#if row.every(p => p) && !calculated}
    <button on:click={calculate}>✓</button>
  {/if}
  {#if calculated}
    <Score {correctPosition} {correctColor}/>
  {/if}
</div>

<style>
  .score-row {
    display: flex;
    place-items: center;
    gap: 0.5rem;
    margin: 0.5rem;
  }

  button {
    font-size: 1.5rem;
    width: 100%;
    height: 100%;
    padding-left: 40%;
  }
</style>
