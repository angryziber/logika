<script lang="ts">
  import {colors, pins, rows} from './config'
  import Pin from './Pin.svelte'
  import Secret from './Secret.svelte'
  import Reset from './Reset.svelte'
  import ScoreCalculator from './ScoreCalculator.svelte'

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))
  let secret: string[]
  let activeColor = ''
  let gameOver = false

  function put(r: number, i: number) {
    board[r][i] = activeColor
  }
</script>

<div class="game">
  <div class="board">
    <div class="row mb">
      <Secret bind:secret reveal={gameOver}/>
    </div>

    {#each board as rows, r}
      <div class="row">
        {#each rows as color, i}
          <Pin {color} on:click={() => put(r, i)}/>
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
          <ScoreCalculator {row} {secret} bind:gameOver/>
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="colors">
  {#each colors as color}
    <Pin {color} active={activeColor === color} on:click={() => activeColor = color} draggable/>
  {/each}
</div>

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

  .colors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
</style>
