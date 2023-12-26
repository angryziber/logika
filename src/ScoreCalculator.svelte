<script lang="ts">
  import Score from './Score.svelte'
  import {pins} from './config'
  import confetti from 'https://cdn.skypack.dev/canvas-confetti'

  export let row: string[]
  export let secret: string[]
  export let gameOver = false

  let calculated = false
  let correctPosition = 0
  let correctColor = 0

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
    if (correctPosition == pins) {
      confetti()
      gameOver = true
    }
    calculated = true
  }
</script>

{#if filled(row) && !calculated}
  <button on:click={calculate}>✓</button>
{/if}
{#if calculated}
  <Score {correctPosition} {correctColor}/>
{/if}

<style>
  button {
    font-size: 1.5rem;
    line-height: 0.5;
    width: 100%;
    margin: 0.25rem;
  }
</style>
