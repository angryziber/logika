<script lang="ts">
  function show() {
    alert(document.getElementById('help').textContent)
  }
</script>

<button class="lg" title="Help" on:click={show}>?</button>

<section id="help" hidden>
Logika - a Soviet-era board game, loosely based on international Mastermind.

The aim is to guess the secret color combination, row by row.

Each guess is given black and white points:
 - Black means that some color is at the same position in the secret.
 - White means that some color exists, but at different position.

Try to guess the secret in as few steps as possible!
</section>
