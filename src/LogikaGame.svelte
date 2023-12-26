<script lang="ts">
  import {colors, pins, rows} from './config'
  import confetti from 'https://cdn.skypack.dev/canvas-confetti'
  import Pin from './Pin.svelte'

  let activeColor = ''

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))

  let secret = Array(pins).fill(0).map(() => colors[Math.ceil(Math.random() * colors.length) - 1])
  let secretReveal = Array(pins).fill(false)

  let rowScores = Array(rows).fill(undefined)

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
      secretReveal = secretReveal.fill(true)
    }
  }
</script>

<main>
  <h1>Logika / Mastermind</h1>

  <div class="game">
    <div class="board">
      <div class="row" style="margin-bottom: 2rem">
        {#each secret as c, i}
          <Pin color={secretReveal[i] ? c : ''} symbol={secretReveal[i] ? '⬤' : '?'}
               on:pointerdown={() => secretReveal[i] = !secretReveal[i]}/>
        {/each}
      </div>

      {#each board as rows, r}
        <div class="row">
          {#each rows as color, i}
            <Pin {color} symbol={color ? '⬤' : '\u00a0'}
                 on:drop={() => put(r, i)}
                 on:pointerdown={() => put(r, i)}/>
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
            {#each Array(score.correctPosition).fill(0) as _}
              <div class="score" style="color: black; cursor: help" title="One correct color and position">⬤</div>
            {/each}
            {#each Array(score.correctColor).fill(0) as _}
              <div class="score" style="color: white; cursor: help" title="One correct color, but wrong position">⬤</div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="colors">
    {#each colors as color}
      <Pin {color} active={activeColor === color} on:pointerdown={() => activeColor = color} draggable/>
    {/each}
  </div>
</main>

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

  .score {
    border-color: transparent;
    font-size: 0.75rem;
    width: 1.5rem;
    line-height: 3rem;
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
