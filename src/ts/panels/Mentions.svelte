<script>
  import Fieldset from "../components/Fieldset.svelte";

  export let ciri;
  export let dataset;

  let inRels, outMentions;

  $: {
    inRels = [...dataset.match(null, null, ciri)];
  }
</script>

<aside
  class="bg-stone-200 p-6 flex flex-col gap-3 col-span-25 row-span-50 order-5 overflow-auto rounded-md"
>
  <Fieldset legend="IN Relations">
    <ul class="list-inside list-disc">
      {#each inRels as quad}
        <li>
          <span
            class="cursor-pointer bg-green-300/75"
            on:click={() => (ciri = quad.subject)}
            >{quad.subject.value.split(/\/|#/).at(-1)}</span
          >
          <span
            on:click={() => (ciri = quad.predicate)}
            class={`px-1 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}
          >
            {quad.predicate.value.split(/\/|#/).at(-1)}
          </span>
          <span
            class="cursor-pointer bg-green-300/75"
            on:click={() => (ciri = quad.object)}
            >{quad.object.value.split(/\/|#/).at(-1)}</span
          >
        </li>
      {/each}
    </ul>
  </Fieldset>
  <Fieldset legend="IN Mentions" show={false}>
    <ul class="list-inside list-disc" />
  </Fieldset>
</aside>
