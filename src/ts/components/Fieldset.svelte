<script>
  export let legend;
  export let show = true;
</script>

<fieldset class="border-2 border-neutral-300 rounded-lg py-2 px-3">
  <legend on:click={() => (show = !show)} class="px-0.5 cursor-pointer">
    <span class="opacity-50">{show ? "▼" : "▶"}</span>
    {legend}
    <span class="px-2 rounded-lg bg-slate-300"> + </span>
  </legend>
  {#if show}
    <slot />
  {/if}
</fieldset>
