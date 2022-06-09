<script>
  import { rdf, rdfs, x } from "../main";
  import { createNode, getLabel, getLabelTriple } from "../RDFapi";
  import { namedNode } from "../rdfun/Datafactory";

  export let dataset;
  export let ciri;
  export let onGraphSelect;
  export let graph;
  export let favorites;
  $: classes = [...dataset]
    .filter((quad) => {
      quad.object.equals?.(rdfs.Class);
    })
    .map((quad) => quad.subject)
    .map(getLabelTriple);

  $: propertys = [...new Set([...dataset].map((quad) => quad.predicate.value))]
    .map(namedNode)
    .map(getLabelTriple);
</script>

<aside
  id="Sidebar"
  class="bg-neutral-200 px-5 py-5 flex flex-col gap-5 col-span-15 row-span-full order-2 rounded-md overflow-auto"
>
  <header>
    <label class="inline-block" for="graph-select">Graph: </label>
    <select
      name="graph-select"
      id=""
      bind:value={graph}
      on:change={onGraphSelect}
    >
      <option value="pkg">pkg</option>
      <option value="rubenworks">rubenworks</option>
      <option value="+ enter url">+ enter url</option>
    </select>
  </header>
  <details id="Ontologies">
    <summary class="pb-1 cursor-pointer text-xl">📜 Ontologies</summary>
    <ul class="pl-3 list-inside list-disc">
      <li>rdf</li>
      <li>rdfs</li>
      <li>foaf</li>
      <li>schema</li>
    </ul>
  </details>
  <details id="Sets">
    <summary class="pb-1 cursor-pointer text-xl"
      >🗄 Sets <span class="bg-neutral-300 rounded-full px-1.5 ml-4">+</span
      ></summary
    >
    <ul class="pl-3 list-inside list-disc">
      <li class={`px-2 cursor-pointer `}>Nodes</li>
    </ul>
  </details>
  <details id="Favorites" open>
    <summary class="pb-1 cursor-pointer text-xl">⭐️ Favorites</summary>
    <ul class="pl-3 list-inside list-disc">
      {#each favorites as fav}
        <li class="cursor-pointer " on:click={() => (ciri = fav)}>
          <span class="bg-green-300/75">
            {getLabel(fav)}
          </span>
        </li>
      {/each}
    </ul>
  </details>
  <details id="Classes" open>
    <summary class="pb-1 cursor-pointer text-xl">🗂 Classes</summary>
    <ul class="pl-3 flex flex-wrap gap-1">
      {#each classes as classLabelTriple, i}
        <li
          on:click={() => (ciri = classLabelTriple.subject)}
          class={`rounded-xl px-2 bg-red-300 cursor-pointer inline-block shadow-md capitalize`}
        >
          {classLabelTriple.object.value}
        </li>
      {/each}
    </ul>
  </details>
  <details id="Relationships" open>
    <summary class="pb-1 cursor-pointer text-xl">🔗 Relationships</summary>
    <ul class="pl-3 flex flex-wrap gap-1">
      {#each propertys as propLabelTriple, i}
        <li
          on:click={() => (ciri = propLabelTriple.subject)}
          class={`px-2 bg-sky-200 cursor-pointer inline-block before:content-["-"] after:content-["->"]`}
        >
          {propLabelTriple.object.value}
        </li>
      {/each}
    </ul>
  </details>
  <button
    on:click={() => {
      ciri = createNode("untitled");
    }}
    class="border rounded-lg border-green-500">New Node</button
  >
</aside>
