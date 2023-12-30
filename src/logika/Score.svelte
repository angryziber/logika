<script lang="ts">
  import {calculateScore} from './score'

  export let score: ReturnType<typeof calculateScore>

  function showTitle(e: MouseEvent) {
    alert(e.currentTarget['title'])
  }
</script>

{#each Array(score.correctPosition).fill(0) as _}
  <div class="pin" style="background: #555"
       title="Black: one correct color and position" on:click={showTitle}/>
{/each}
{#each Array(score.correctColor).fill(0) as _}
  <div class="pin" style="background: white"
       title="White: one correct color, but wrong position" on:click={showTitle}/>
{/each}

<style>
  .pin {
    width: 1rem;
    height: 1rem;
    cursor: help;
    border-radius: 50%;
    box-shadow: inset -3px -3px 6px rgba(0,0,0,0.3);
  }
</style>
