<script>
  import Fieldset from "../components/Fieldset.svelte";
  import { node } from "../main";

  export let currentNode;
  export let dataset;
  export let changeNode;

  let inRels, outMentions;

  $: {
    inRels = [...dataset.match(null, null, currentNode)];
  }
</script>

<aside
  class="bg-stone-200 p-6 flex flex-col gap-3 col-span-25 row-span-50 order-5 overflow-auto rounded-md">
  <Fieldset legend="IN Relations">
    <ul class="list-inside list-disc">
      {#each inRels as quad}
        <li>
          <span
            class="cursor-pointer bg-green-300/75"
            on:click={() => changeNode(quad.subject)}
            >{quad.subject.value.split(/\/|#/).at(-1)}</span>
          <span
            on:click={() => changeNode(quad.predicate)}
            class={`px-1 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}>
            {quad.predicate.value.split(/\/|#/).at(-1)}
          </span>
          <span
            class="cursor-pointer bg-green-300/75"
            on:click={() => changeNode(quad.object)}
            >{quad.object.value.split(/\/|#/).at(-1)}</span>
        </li>
      {/each}
    </ul>
  </Fieldset>
  <Fieldset legend="IN Mentions" show={false}>
    <ul class="list-inside list-disc" />
  </Fieldset>
</aside>
