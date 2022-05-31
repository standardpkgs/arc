<script>
  import { x } from "../main";

  export let markdown;
  export let dataset;
  export let changeNode;
  let children, content;
  $: {
    children = [...dataset?.match(markdown, x.mdChild, null)].map(
      (quad) => quad.object
    );
    content = [...dataset?.match(markdown, x.mdContent, null)][0]?.object
      ?.value;
  }
</script>

{#if !content}
  {#each children as markdown}
    <svelte:self {...{ dataset, markdown, changeNode }} />
  {/each}
{:else}
  <details class="pl-5">
    <summary
      ><span class='px-1 cursor-pointer hover:content-["◎"]' on:click={() => changeNode(markdown)}>&#x25C9;</span>
      {content ?? "markdown"}</summary>

    {#each children as markdown}
      <svelte:self {...{ dataset, markdown, changeNode }} />
    {/each}
  </details>
{/if}
