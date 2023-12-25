<script lang="ts">
  const pins = 5
  const rows = 12

  const colors = ['cyan', 'lightgreen', 'pink', 'red', 'white', 'black', 'yellow', 'orange']
  let activeColor = ''

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))

  function put(r: number, i: number) {
    board[r][i] = activeColor
  }

  let secret = Array(pins).fill(0).map(() => colors[Math.ceil(Math.random() * colors.length) - 1])

  let rowScores = Array(pins).fill('')

  $: board.forEach((row, r) => {
    if (filled(row)) calculateScore(row, r)
  })

  function filled(row: string[]) {
    return row.every(p => p)
  }

  function calculateScore(row: string[], r: number) {
    let correctPosition = 0, correctColor = 0
    const tempSecret = [...secret]
    for (let i = 0; i < pins; i++) {
      if (row[i] == tempSecret[i]) {
        correctPosition++
        tempSecret[i] = 'x'
      } else {
        const j = tempSecret.indexOf(row[i])
        if (j >= 0) {
          correctColor++
          tempSecret[j] = 'x'
        }
      }
    }
    rowScores[r] = {correctPosition, correctColor}
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
      {secret}
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
      {#each rowScores as score}
        <div class="row">
          {JSON.stringify(score)}
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
    line-height: 3rem;
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
  }
</style>
