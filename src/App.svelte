<script lang="ts">
  const pins = 5
  const rows = 12

  const colors = ['cyan', 'lightgreen', 'pink', 'red', 'white', 'black', 'yellow', 'orange']
  let activeColor = ''

  let board = Array(rows).fill(0).map(() => Array(pins).fill(''))

  function put(r: number, i: number) {
    board[r][i] = activeColor
  }

  let secret = Array(pins).fill(0).map(() => colors[Math.ceil(Math.random() * colors.length) + 1])
</script>

<main>
  <h1>Logika / Mastermind</h1>
  {secret}

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
      {#each Array(rows).fill(0) as r}
        <div class="row">
          {#each Array(pins).fill(0) as i}
            <div class="pin">o</div>
          {/each}
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
