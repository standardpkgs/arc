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
      ><span class={`px-1 cursor-pointer`} on:click={() => changeNode(markdown)}
        >&#x25C9;</span
      >
      <textarea
        class="all relative top-1.5"
        cols={[...content].length}
        on:input="{(e) => (content = e.target.value)}"

        rows={content.split("\n")?.length ?? 1}
        >{content ?? "markdown"}</textarea
      >
    </summary>

    {#each children as markdown}
      <svelte:self {...{ dataset, markdown, changeNode }} />
    {/each}
  </details>
{/if}
