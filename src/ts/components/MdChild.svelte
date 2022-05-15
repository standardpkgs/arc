<script>
  import { x } from "../main";

  export let markdown;
  export let dataset;
  let children, content;
  $: {
    children = [...dataset?.match(markdown, x.mdChild, null)].map(
      (quad) => quad.object
    );
    content = [...dataset?.match(markdown, x.mdContent, null)][0]?.object
      ?.value;
  }
</script>

<details class="pl-5">
  <summary>{content ?? "markdown"}</summary>
  {#each children as markdown}
    <svelte:self {...{ dataset, markdown }} />
  {/each}
</details>
