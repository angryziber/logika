<script lang="ts">
  import type {ScoreType} from './config'

  export let score: ScoreType

  function showTitle(e: MouseEvent) {
    alert(e.currentTarget['title'])
  }
</script>

{#each Array(score.correctPosition).fill(0) as _}
  <div class="score" style="color: black" title="Blak: one correct color and position" on:click={showTitle}>⬤</div>
{/each}
{#each Array(score.correctColor).fill(0) as _}
  <div class="score" style="color: white" title="White: one correct color, but wrong position" on:click={showTitle}>⬤</div>
{/each}

<style>
  .score {
    border-color: transparent;
    font-size: 0.75rem;
    width: 1.5rem;
    line-height: 3rem;
    cursor: help;
  }
</style>
