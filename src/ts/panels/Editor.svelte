<script>
  import { color, rw } from "../Helpers";
  import { marked } from "marked";
  import {
    classify,
    createClass,
    foaf,
    node,
    q,
    rdf,
    rdfs,
    schema,
    x,
  } from "../main";
  import { onMount } from "svelte";
  import MdChild from "../components/MdChild.svelte";
  import RdfDereferencer from "rdf-dereference";
  import { storeStream } from "rdf-store-stream";
  import Fieldset from "../components/Fieldset.svelte";
  import App from "../App.svelte";
  import { log } from "util";
  import {} from "os";
  import Title from "../components/Title.svelte";

  export let currentNode;
  export let dataset;
  export let nestLevel = 0;
  export let changeNode;
  let maxNest = 0;
  let title;
  let children = [];
  $: {
    maxNest = (() => {
      if ([...dataset]?.length > 500) return 1;
      if ([...dataset]?.length < 400) return 2;
      if ([...dataset]?.length < 300) return 3;
      if ([...dataset]?.length < 200) return 4;
      if ([...dataset]?.length < 100) return 5;
    })();
  }

  let isProperty, isClass, isEntity;

  let classes;
  let allClasses;
  let propertys;
  let relations = [];
  let markdown = node("empty");
  let subsAndObjs, propSubs, propObjs;
  let classInstances;

  title =
    [...dataset?.match(currentNode, rdf.label, null)]?.[0]?.object.value ??
    currentNode.value.split(/\/|#/).at(-1);
  $: {
    classes = [...dataset.match(currentNode, rdf.type, null)];
    allClasses = [
      ...new Set(
        [...dataset.match(null, rdf.type, null)].map(
          (quad) => quad.object.value
        )
      ),
    ].map(node);
    isClass = allClasses.some((cl) => cl.equals(currentNode));
    classInstances = [
      ...new Set(
        [...dataset.match(null, rdf.type, currentNode)].map(
          (quad) => quad.subject.value
        )
      ),
    ].map(node);
    propertys = [...dataset.match(currentNode, null, null)].filter(
      (quad) => quad.object.termType == "Literal"
    );

    relations = [...dataset.match(currentNode, null, null)].filter(
      (quad) => quad.object.termType == "NamedNode"
    );

    markdown =
      [...dataset.match(currentNode, x.md, null)]?.[0]?.object ?? node("test");

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
    children = [...dataset.match(currentNode, x.mdChild, null)];
    // console.error(children)
  }
</script>

<main
  class="bg-neutral-50 col-span-60 row-span-full order-3 rounded-md overflow-auto"
>
  <div
    class="h-full px-8 {nestLevel == 0 ? 'py-5' : 'py-2'} flex flex-col gap-2"
  >
    {#if nestLevel == 0}
      <header class="border-2 border-neutral-700 rounded-lg py-2 px-5">
        <h2 class="text-6xl ">
          <Title bind:title />
        </h2>
        <div class="text-gray-400">
          {currentNode.value}
        </div>
      </header>
    {/if}
    <ul class="px-0 flex justify-center flex-wrap gap-1">
      {#each classes as w, i}
        <li
          on:click={() => changeNode(w.object)}
          class={`rounded-xl px-2 bg-red-300 cursor-pointer inline-block shadow-md capitalize`}
        >
          {w.object.value.split(/\/|#/).at(-1)}
        </li>
      {/each}
      <li
        class={`rounded-xl px-2 ${"bg-gray-300"} cursor-pointer inline-block shadow-md capitalize`}
        on:click={() => {
          const classQuads = createClass();
          const classNode = classQuads[0].subject;
          dataset.addQuads(classQuads);
          dataset.addQuads([q(currentNode, rdf.type, classNode, x.Data)]);
          changeNode(currentNode);
        }}
      >
        + new Class
      </li>
    </ul>
    <Fieldset legend="Attributes">
      <ul class="mx-0.5 flex flex-col gap-1">
        {#each propertys as w, i}
          <li class="flex justify-between">
            <span>
              <span
                on:click={() => changeNode(w.predicate)}
                class={`px-1 mr-2 bg-orange-200 cursor-pointer before:content-["-"] after:content-["->"]`}
              >
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
    </Fieldset>
    <Fieldset legend="Relations">
      <ul class="mx-0.5 flex flex-col gap-1">
        {#each relations as w, i}
          <li class="flex justify-between">
            <span class="flex align-top">
              {"+ "}
              <span
                on:click={() => changeNode(w.predicate)}
                class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}
              >
                {w.predicate.value.split(/\/|#/).at(-1)}
              </span>
              <span>
                <details class="inline">
                  <summary>
                    <span
                      class="cursor-pointer bg-green-300/75"
                      on:click={() => changeNode(w.object)}
                      >{w.object.value.split(/\/|#/).at(-1)}</span
                    >
                  </summary>
                  {#if nestLevel < maxNest}
                    <svelte:self
                      {...{
                        currentNode: w.object,
                        dataset,
                        nestLevel: ++nestLevel,
                      }}
                    />
                  {/if}
                </details>
              </span>
            </span>
            <select name="" id="">
              <option value="node" default>Node</option>
              {#each allClasses as quad}
                <option value={quad.value.split(/\/|#/).at(-1)}
                  >{quad.value.split(/\/|#/).at(-1)}</option
                >
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
    </Fieldset>
    {#if isClass}
      <Fieldset legend="Instances of this Class">
        <ul class="mx-0.5  gap-1 ">
          {#each classInstances as instance}
            <li>
              <details class="inline">
                <summary>
                  <span
                    class="cursor-pointer bg-green-300/75"
                    on:click={() => changeNode(instance)}
                    >{instance.value.split(/\//).at(-1)}</span
                  >
                </summary>
                {#if nestLevel < maxNest}
                  <svelte:self
                    {...{
                      currentNode: instance,
                      dataset,
                      nestLevel: ++nestLevel,
                    }}
                  />
                {/if}
              </details>
            </li>
          {/each}
        </ul>
      </Fieldset>
    {/if}
    {#if isProperty}
      <Fieldset legend="Triples">
        <ul class="mx-0.5  gap-1 list-inside list-disc ">
          {#each subsAndObjs as quad}
            <li>
              <span
                on:click={() => changeNode(quad.subject)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}
              >
                {quad.subject.value.split(/\//).at(-1)}
              </span>
              <span
                on:click={() => changeNode(quad.predicate)}
                class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}
              >
                {quad.predicate.value.split(/\//).at(-1)}
              </span>
              <span
                on:click={() => changeNode(quad.object)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}
              >
                {quad.object.value.split(/\//).at(-1)}
              </span>
            </li>
          {/each}
        </ul>
      </Fieldset>
      <Fieldset legend="Subjects">
        <ul class="mx-0.5  gap-1 list-inside list-disc ">
          {#each propSubs as w}
            <li>
              <span
                on:click={() => changeNode(w)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}
              >
                {w.value.split(/\//).at(-1)}
              </span>
            </li>
          {/each}
        </ul>
      </Fieldset>
      <Fieldset legend="Objects">
        <ul class="mx-0.5 gap-1 list-inside list-disc ">
          {#each propObjs as w}
            <li>
              <span
                on:click={() => changeNode(w)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}
              >
                {w.value.split(/\//).at(-1)}
              </span>
            </li>
          {/each}
        </ul>
      </Fieldset>
    {/if}
    {#if classes.some((quad) => quad.object.equals(x.Block))}
      <Fieldset legend="Notes">
        <!-- {#each children as childQuad} -->

        <MdChild {...{ dataset, markdown: currentNode, changeNode }} />
        <!-- {/each} -->
      </Fieldset>
    {:else}
      <Fieldset legend="Notes">
        <MdChild {...{ dataset, markdown, changeNode }} />
      </Fieldset>
    {/if}
  </div>
</main>
