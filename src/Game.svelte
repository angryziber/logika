<script lang="ts">
  import {colors, pins, rows, type ScoreType} from './config'
  import Pin from './Pin.svelte'
  import Score from './Score.svelte'
  import confetti from 'https://cdn.skypack.dev/canvas-confetti'
  import Secret from './Secret.svelte'

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))
  let secret: string[]
  let activeColor = ''
  let gameOver = false

  let rowScores: ScoreType[] = Array(rows).fill(undefined)

  function put(r: number, i: number) {
    board[r][i] = activeColor
  }

  function filled(row: string[]) {
    return row.every(p => p)
  }

  function calculateScore(r: number) {
    const row = [...board[r]];
    let correctPosition = 0, correctColor = 0
    const tempSecret = [...secret]
    secret.forEach((c, i) => {
      if (row[i] == c) {
        correctPosition++
        tempSecret[i] = 'x'
        row[i] = 'y'
      }
    })
    row.forEach((c, i) => {
      const j = tempSecret.indexOf(row[i])
      if (j >= 0) {
        correctColor++
        tempSecret[j] = ''
      }
    })
    rowScores[r] = {correctPosition, correctColor}
    if (correctPosition == pins) {
      confetti()
      gameOver = true
    }
  }
</script>

<div class="game">
  <div class="board">
    <div class="row" style="margin-bottom: 2rem">
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

  <div class="scores">
    {#each rowScores as score, r}
      <div class="row">
        {#if filled(board[r]) && !rowScores[r]}
          <button class="ready" on:click={() => calculateScore(r)}>✓</button>
        {/if}
        {#if score}
          <Score {score}/>
        {/if}
      </div>
    {/each}
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

  .scores {
    margin-top: 5rem;
  }

  .row {
    display: flex;
    flex-direction: row;
    height: 3rem;
  }

  .scores {
    width: calc(5 * 1.5rem);
    border: 1px solid #ccc;
  }

  button.ready {
    background: #23ad23;
    color: white;
    font-size: 1.5rem;
    line-height: 0.5;
    width: 100%;
    margin: 0.25rem;
  }

  .colors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
</style>
