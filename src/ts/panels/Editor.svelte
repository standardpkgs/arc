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

  let isProperty, isClass, isEntity;

  let classes;
  let allClasses;
  let propertys;
  let relations;
  let markdown = node("empty");
  let subsAndObjs, propSubs, propObjs;
  let classInstances;

  $: {
    console.log(currentNode);
    title =
      [...dataset?.match(currentNode, rdfs.label, null)]?.[0]?.object.value ??
      currentNode.value.split(/\/|#/).at(-1);
    classes = [...dataset.match(currentNode, rdf.type, null)];
    allClasses = [
      ...new Set(
        [...dataset.match(null, rdf.type, null)].map(
          (quad) => quad.object.value
        )
      ),
    ].map(node);
    isClass = allClasses.some((cl) => cl.equals(currentNode));
    classInstances = [...dataset.match(null,rdf.type,currentNode)]
    console.error("is class? ", isClass);
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

    subsAndObjs = [...dataset?.match(null, currentNode, null)];
    isProperty = subsAndObjs?.length;
    if (isProperty) {
      propSubs = [
        ...new Set(subsAndObjs.map((quad) => quad.subject.value)),
      ].map(node);
      propObjs = [...new Set(subsAndObjs.map((quad) => quad.object.value))].map(
        node
      );
    }

    console.log("subs and objs", propSubs, propObjs);
  }
  console.log("markdown", markdown);
</script>

<main
  class="bg-neutral-50 col-span-60 row-span-full order-3 rounded-md overflow-auto">
  <div class="h-full px-8 py-5 flex flex-col gap-2">
    <header class="border-2 border-neutral-700 rounded-lg py-2 px-5">
      <h2 class="text-6xl ">
        <span
          class:bg-red-300={isClass}
          class:bg-sky-200={isProperty}
          class:bg-green-300={!isClass && !isProperty}>{title}</span>
      </h2>
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
      {#if isProperty || isClass}
        <li
          class={`rounded-xl px-2 bg-red-300 cursor-pointer inline-block shadow-md capitalize`}>
          {isProperty ? "Property" : "Class"}
        </li>
      {/if}
      <li
        class={`rounded-xl px-2 ${"bg-gray-300"} cursor-pointer inline-block shadow-md capitalize`}>
        + new Class
      </li>
    </ul>
    <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
      <legend class="px-0.5">Properties</legend>
      <ul class="mx-0.5 flex flex-col gap-1">
        {#each propertys as w, i}
          <li class="flex justify-between">
            <span>
              <span
                on:click={() => (currentNode = w.predicate)}
                class={`px-1 mr-2 bg-orange-200 cursor-pointer before:content-["-"] after:content-["->"]`}>
                {w.predicate.value.split(/\/|#/).at(-1)}
              </span>
              <span class="text-lime-600">{`"${w.object.value}"`}</span>
            </span>
            <select name="" id="">
              <option value="Text" default>Text</option>
              <option value="Number">Number</option>
              <option value="Date">Date</option>
            </select>
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
          <li class="flex justify-between">
            <span>
              <span
                on:click={() => (currentNode = w.predicate)}
                class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}>
                {w.predicate.value.split(/\/|#/).at(-1)}
              </span>
              <span
                class="cursor-pointer bg-green-300/75"
                on:click={() => (currentNode = w.object)}
                >{w.object.value.split(/\/|#/).at(-1)}</span>
            </span>
            <select name="" id="">
              <option value="Node" default>Node</option>
              {#each allClasses as quad}
                <option value={quad.value.split(/\/|#/).at(-1)} default
                  >{quad.value.split(/\/|#/).at(-1)}</option>
              {/each}
            </select>
          </li>
        {/each}
        <li class="flex ">
          <span class={`px-1 mr-2 ${"bg-gray-300"} cursor-pointer`}>
            + new Relation
          </span>
        </li>
      </ul>
    </fieldset>
    {#if isClass}
    <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
      <legend class="px-0.5">Instances of this Class</legend>
      <ul class="mx-0.5  gap-1 list-inside list-disc ">

      </ul>
    </fieldset>
    {/if}
    {#if isProperty}
      <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
        <legend class="px-0.5">Triples</legend>
        <ul class="mx-0.5  gap-1 list-inside list-disc ">
          {#each subsAndObjs as quad}
            <li>
              <span
                on:click={() => (currentNode = quad.subject)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}>
                {quad.subject.value.split(/\//).at(-1)}
              </span>
              <span
                on:click={() => (currentNode = quad.predicate)}
                class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}>
                {quad.predicate.value.split(/\//).at(-1)}
              </span>
              <span
                on:click={() => (currentNode = quad.object)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}>
                {quad.object.value.split(/\//).at(-1)}
              </span>
            </li>
          {/each}
        </ul>
      </fieldset>
      <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
        <legend class="px-0.5">Subjects</legend>
        <ul class="mx-0.5  gap-1 list-inside list-disc ">
          {#each propSubs as w}
            <li>
              <span
                on:click={() => (currentNode = w)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}>
                {w.value.split(/\//).at(-1)}
              </span>
            </li>
          {/each}
        </ul>
      </fieldset>
      <fieldset class="border-2 border-neutral-700 rounded-lg py-2 px-3">
        <legend class="px-0.5">Objects</legend>
        <ul class="mx-0.5 gap-1 list-inside list-disc ">
          {#each propObjs as w}
            <li>
              <span
                on:click={() => (currentNode = w)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}>
                {w.value.split(/\//).at(-1)}
              </span>
            </li>
          {/each}
        </ul>
      </fieldset>
    {/if}
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
