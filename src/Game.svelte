<script lang="ts">
  import {pins, rows} from './config'
  import Pin from './Pin.svelte'
  import Secret from './Secret.svelte'
  import Reset from './Reset.svelte'
  import ScoreCalculator from './ScoreCalculator.svelte'
  import ColorChoices from './ColorChoices.svelte'
  import confetti from 'https://cdn.skypack.dev/canvas-confetti'

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))
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

    {#each board as rows}
      <div class="row">
        {#each rows as color}
          <Pin {color} on:click={() => color = activeColor}/>
        {/each}
      </div>
    {/each}
  </div>

  <div>
    <div class="row mb">
      <Reset/>
    </div>

    <div class="scores">
      {#each board as row}
        <div class="row">
          <ScoreCalculator {row} {secret} on:won={won}/>
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

  .row.mb {
    margin-bottom: 2rem;
  }

  .scores {
    width: calc(5 * 1.5rem);
    border: 1px solid #ccc;
  }
</style>
