<script>
  import { color, rw } from "../Helpers";
  import { favorites } from "../main";

  export let propertys;
  export let classes;
  export let data;
  export let dataset;
  export let currentNode;
</script>

<aside
  id="Sidebar"
  class="bg-neutral-200 px-5 py-5 flex flex-col gap-5 col-span-15 row-span-full order-2 rounded-md overflow-auto">
  <header>
    <label class="inline-block" for="test">Graph: &nbsp;</label>
    <select name="test" id="">
      <option value="default">default</option>
      <option value="demos">demos</option>
      <option value="cooking">cooking</option>
    </select>
  </header>
  <details id="Ontologies">
    <summary class="pb-1 cursor-pointer text-xl">📜 Ontologies</summary>
    <ul class="pl-3 list-inside list-disc">
      <li>{"rdf"}</li>
      <li>{"rdfs"}</li>
      <li>{"foaf"}</li>
      <li>{"schema"}</li>
    </ul>
  </details>
  <details id="Sets">
    <summary class="pb-1 cursor-pointer text-xl"
      >🗄 Sets <span class="bg-neutral-300 rounded-full px-1.5 ml-4">+</span
      ></summary>
    <ul class="pl-3 list-inside list-disc">
      <li class={`px-2 cursor-pointer `}>Humans</li>
    </ul>
  </details>
  <details id="Favorites" open>
    <summary class="pb-1 cursor-pointer text-xl">⭐️ Favorites</summary>
    <ul class="pl-3 list-inside list-disc">
      {#each favorites as w}
        <li class="cursor-pointer" on:click={() => (currentNode = w)}>
          {w.value.split("/").at(-1)}
        </li>
      {/each}
    </ul>
  </details>
  <details id="Classes" open>
    <summary class="pb-1 cursor-pointer text-xl">🗂 Classes</summary>
    <ul class="pl-3 flex flex-wrap gap-1">
      {#each classes as w, i}
        <li
          on:click={() => (currentNode = w)}
          class={`rounded-xl px-2 bg-red-300 cursor-pointer inline-block shadow-md capitalize`}>
          {w.value.split("/").at(-1)}
        </li>
      {/each}
    </ul>
  </details>
  <details id="Relationships" open>
    <summary class="pb-1 cursor-pointer text-xl">🔗 Relationships</summary>
    <ul class="pl-3 flex flex-wrap gap-1">
      {#each propertys as w, i}
        <li
          on:click={() => (currentNode = w)}
          class={`px-2 bg-sky-200 cursor-pointer inline-block before:content-["-"] after:content-["->"]`}>
          {w.value.split(/\/|#/).at(-1)}
        </li>
      {/each}
    </ul>
  </details>
</aside>
