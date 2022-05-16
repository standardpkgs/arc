<script>
  export let legend;
  let show = true;
</script>

<fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
  <legend on:click={() => (show = !show)} class="px-0.5 cursor-pointer">{legend}</legend>
  {#if show}
    <slot />
  {/if}
</fieldset>
