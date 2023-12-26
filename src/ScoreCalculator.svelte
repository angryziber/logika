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

  function filled(row: string[]) {
    return row.every(p => p)
  }

  function calculate() {
    const tempRow = [...row]
    const tempSecret = [...secret]
    secret.forEach((c, i) => {
      if (tempRow[i] == c) {
        correctPosition++
        tempSecret[i] = 'x'
        tempRow[i] = 'y'
      }
    })
    tempRow.forEach((c, i) => {
      const j = tempSecret.indexOf(tempRow[i])
      if (j >= 0) {
        correctColor++
        tempSecret[j] = ''
      }
    })

    calculated = true
    if (correctPosition == pins) dispatch('won')
  }
</script>

<div class="score-row">
  {#if filled(row) && !calculated}
    <button on:click={calculate}>✓</button>
  {/if}
  {#if calculated}
    <Score {correctPosition} {correctColor}/>
  {/if}
</div>

<style>
  .score-row {
    width: calc(5 * 1.5rem);
    display: flex;
    place-items: center;
    gap: 0.5rem;
    margin: 0.5rem;
  }

  button {
    font-size: 1.5rem;
    line-height: 0.5;
    width: 100%;
    margin: 0.25rem;
  }
</style>
