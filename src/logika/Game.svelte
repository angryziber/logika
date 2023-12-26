<script lang="ts">
  import {pins, rows} from './config'
  import confetti from 'https://cdn.skypack.dev/canvas-confetti'
  import Pin from './Pin.svelte'
  import Secret from './Secret.svelte'
  import Help from './Help.svelte'
  import Reset from './Reset.svelte'
  import ScoreCalculator from './ScoreCalculator.svelte'
  import ColorChoices from './ColorChoices.svelte'

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))
  let rowsCalculated: boolean[] = []
  let secret: string[]
  let activeColor = ''
  let gameOver = false

  function won() {
    gameOver = true
    confetti()
  }
</script>

<div class="game">
  <div class="board">
    <div class="row mb">
      <Secret bind:secret reveal={gameOver}/>
    </div>

    {#each board as rows, i}
      <div class="row">
        {#each rows as color}
          <Pin {color} on:click={() => {if (!rowsCalculated[i]) color = activeColor}}/>
        {/each}
      </div>
    {/each}
  </div>

  <div>
    <div class="row mb" style="gap: 1rem">
      <Help/>
      <Reset/>
    </div>

    <div class="scores">
      {#each board as row, i}
        <div class="row">
          <ScoreCalculator {row} {secret} bind:calculated={rowsCalculated[i]} on:won={won}/>
        </div>
      {/each}
    </div>
  </div>
</div>

<ColorChoices bind:activeColor/>

<style>
  .game {
    display: flex;
    gap: 2rem;
  }

  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    height: 3rem;
  }

  .mb {
    margin-bottom: 2rem;
  }

  .scores {
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }
</style>
