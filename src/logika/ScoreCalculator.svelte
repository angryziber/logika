<script lang="ts">
  import Score from './Score.svelte'
  import {pins} from './config'
  import {createEventDispatcher} from 'svelte'
  import {calculateScore} from './score'

  export let row: string[]
  export let secret: string[]

  let score: ReturnType<typeof calculateScore> | undefined

  const dispatch = createEventDispatcher<{won: void}>()

  function calculate() {
    score = calculateScore(row, secret)
    if (score.correctPosition == pins) dispatch('won')
  }
</script>

<div class="score-row" style="width: {pins * 1.5}rem">
  {#if row.every(p => p) && !score}
    <button on:click={calculate}>✓</button>
  {/if}
  {#if score}
    <Score {score}/>
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
