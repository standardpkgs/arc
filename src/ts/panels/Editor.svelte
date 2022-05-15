<script>
  import { color, rw } from "../Helpers";
  import { marked } from "marked";
  import { foaf, node, q, rdf, rdfs, schema, x } from "../main";
  import { onMount } from "svelte";
  import MdChild from "../components/MdChild.svelte";

  export let currentNode;
  export let data;
  export let dataset;
  let title;

  let classes;
  let propertys;
  let relations;
  let markdown = node("empty");

  $: {
    console.log(currentNode);
    title = [...dataset?.match(currentNode, schema.givenName, null)]?.[0]
      ?.object.value ?? currentNode.value.split(/\/|#/).at(-1);
    classes = [...dataset.match(currentNode, rdf.type, null)];
    propertys = data.filter(
      (quad) =>
        quad.subject.equals(currentNode) && quad.object.termType == "Literal"
    );
    relations = data.filter(
      (quad) =>
        quad.subject.equals(currentNode) && quad.object.termType == "NamedNode"
    );
    markdown =
      [...dataset.match(currentNode, x.md, null)]?.[0]?.object ?? node("test");
    console.log("markdown", markdown);
  }
  console.log("markdown", markdown);
</script>

<main
  class="bg-neutral-50 col-span-60 row-span-full order-3 rounded-md overflow-auto">
  <div class="h-full px-8 py-5 flex flex-col gap-2">
    <header class="border-2 border-neutral-700 rounded-lg py-2 px-5">
      <h2 class="text-6xl">{title}</h2>
      <div class="text-gray-400">
        {currentNode.value}
      </div>
    </header>
    <ul class="px-0 flex justify-center flex-wrap gap-1">
      {#each classes as w, i}
        <li
          class={`rounded-xl px-2 bg-red-300 cursor-pointer inline-block shadow-md capitalize`}>
          {w.object.value.split(/\/|#/).at(-1)}
        </li>
      {/each}
      <li
        class={`rounded-xl px-2 ${"bg-gray-300"} cursor-pointer inline-block shadow-md capitalize`}>
        + new Class
      </li>
    </ul>
    <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
      <legend class="px-0.5">Properties</legend>
      <ul class="mx-0.5 flex flex-col gap-1">
        {#each propertys as w, i}
          <li class="flex ">
            <span
              on:click={() => (currentNode = w.predicate)}
              class={`px-1 mr-2 bg-orange-200 cursor-pointer before:content-["-"] after:content-["->"]`}>
              {w.predicate.value.split(/\/|#/).at(-1)}
            </span>
            <span class="text-lime-600">{`"${w.object.value}"`}</span>
          </li>
        {/each}
        <li class="flex ">
          <span class={`px-1 mr-2 ${"bg-gray-300"} cursor-pointer`}>
            + new Property
          </span>
        </li>
      </ul>
    </fieldset>
    <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
      <legend class="px-0.5">Relations</legend>
      <ul class="mx-0.5 flex flex-col gap-1">
        {#each relations as w, i}
          <li class="flex ">
            <span
              on:click={() => (currentNode = w.predicate)}
              class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}>
              {w.predicate.value.split(/\/|#/).at(-1)}
            </span>
            <span
              class="cursor-pointer"
              on:click={() => (currentNode = w.object)}
              >{w.object.value.split(/\/|#/).at(-1)}</span>
          </li>
        {/each}
        <li class="flex ">
          <span class={`px-1 mr-2 ${"bg-gray-300"} cursor-pointer`}>
            + new Relation
          </span>
        </li>
      </ul>
    </fieldset>
    <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
      <legend class="px-0.5">Notes</legend>
      <MdChild {...{ dataset, markdown }} />
      <!-- <textarea
        class="w-full"
        name=""
        id=""
        placeholder="type your notes here"
        bind:value />
      {@html marked(value)} -->
    </fieldset>
  </div>
</main>
;
