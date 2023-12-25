<script lang="ts">
  import confetti from 'https://cdn.skypack.dev/canvas-confetti';

  const pins = 5
  const rows = 12

  const colors = ['cyan', 'lightgreen', 'pink', 'red', 'white', 'black', 'yellow', 'orange']
  let activeColor = ''

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))

  function put(r: number, i: number) {
    board[r][i] = activeColor
  }

  let secret = Array(pins).fill(0).map(() => colors[Math.ceil(Math.random() * colors.length) - 1])

  let rowScores = Array(rows).fill(undefined)

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
    if (correctPosition == pins) confetti()
  }
</script>

<main>
  <h1>Logika / Mastermind</h1>

  <div class="game">
    <div class="pin-samples">
      {#each colors as color}
        <div class="pin" class:active={activeColor == color}
             style="color: {color}"
             on:click={() => activeColor = color}>⬤</div>
      {/each}
    </div>

    <div class="board">
      {#each board as rows, r}
        <div class="row">
          {#each rows as p, i}
            <div class="pin" style="color: {board[r][i]}"
                 on:click={() => put(r, i)}>{p ? '⬤' : '\u00a0'}</div>
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
              <div class="pin" style="color: black" title="One correct color and position">⬤</div>
            {/each}
            {#each Array(score.correctColor).fill(0) as _}
              <div class="pin" style="color: white" title="One correct color, but wrong position">⬤</div>
            {/each}
          {:else}
            <div class="pin"/>
          {/if}
        </div>
      {/each}
    </div>
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

  .row {
    display: flex;
    flex-direction: row;
    height: 3rem;
  }

  .pin {
    border: 1px solid rgba(128, 128, 128, 0.35);
    width: 3rem;
    line-height: 3rem;
    cursor: pointer;
  }

  .pin:hover {
    background: rgba(128, 128, 128, 0.49);
  }

  .pin.active {
    border-color: black;
  }

  .scores .pin {
    border-color: transparent;
    font-size: 0.75rem;
  }

  button.ready {
    background: #23ad23;
    color: white;
    font-size: 1.5rem;
    line-height: 0.5;
  }
</style>
