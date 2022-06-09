<script>
  import MdChild from "../components/MdChild.svelte";
  import Fieldset from "../components/Fieldset.svelte";
  import Title from "../components/Title.svelte";
  import { namedNode, quad } from "../rdfun/Datafactory";
  import { rdf, x } from "../main";
  import { createClass, getLabel, getLabelTriple } from "../RDFapi";

  export let ciri;
  export let dataset;
  let nestLevel = 0;
  let maxNest = 0;
  $: {
    maxNest = (() => {
      if ([...dataset]?.length > 500) return 1;
      if ([...dataset]?.length < 400) return 2;
      if ([...dataset]?.length < 300) return 3;
      if ([...dataset]?.length < 200) return 4;
      if ([...dataset]?.length < 100) return 5;
    })();
  }

  let relations = [];
  let markdown = namedNode("empty");

  $: classes = [...dataset.match(ciri, rdf.type)];
  $: allClasses = [
    ...new Set(
      [...dataset.match(null, rdf.type, null)].map((quad) => quad.object.value)
    ),
  ].map(namedNode);
  $: isClass = allClasses.some((cl) => cl.equals(ciri));
  $: classInstances = [
    ...new Set(
      [...dataset.match(null, rdf.type, ciri)].map((quad) => quad.subject.value)
    ),
  ].map(namedNode);
  $: propertys = [...dataset.match(ciri, null, null)].filter(
    (quad) => quad.object.termType == "Literal"
  );

  $: relations = [...dataset.match(ciri, null, null)].filter(
    (quad) => quad.object.termType == "NamedNode"
  );

  $: markdown =
    [...dataset.match(ciri, x.md, null)]?.[0]?.object ?? namedNode("test");

  $: subsAndObjs = [...dataset?.match(null, ciri, null)];
  $: isProperty = subsAndObjs?.length;
  $: children = [...dataset.match(ciri, x.mdChild, null)];
  $: propSubs = isProperty
    ? [...new Set(subsAndObjs.map((quad) => quad.subject.value))].map(namedNode)
    : null;
  $: propObjs = isProperty
    ? [...new Set(subsAndObjs.map((quad) => quad.object.value))].map(namedNode)
    : null;
</script>

<main
  class="bg-neutral-50 col-span-60 row-span-full order-3 rounded-md overflow-auto"
>
  <div
    class="h-full px-8 {nestLevel == 0 ? 'py-5' : 'py-2'} flex flex-col gap-2"
  >
    {#if nestLevel == 0}
      <h2 class="text-6xl">
        <Title bind:ciri />
      </h2>
    {/if}
    <ul class="px-0 flex justify-center flex-wrap gap-1">
      {#each classes as w, i}
        <li
          on:click={() => (ciri = w.object)}
          class={`rounded-xl px-2 bg-red-300 cursor-pointer inline-block shadow-md capitalize`}
        >
          {getLabel(w.object)}
        </li>
      {/each}
      <li
        class={`rounded-xl px-2 ${"bg-gray-300"} cursor-pointer inline-block shadow-md capitalize`}
        on:click={() => {
          // TODO: check if class exists
          const label = prompt("label of the new Class?");
          const classIRI = createClass(label);
          dataset.addQuads([quad(ciri, rdf.type, classIRI, x.Data)]);
          ciri = ciri;
        }}
      >
        + new Class
      </li>
    </ul>
    <Fieldset legend="Properties">
      <ul class="mx-0.5 flex flex-col gap-1">
        {#each propertys as w, i}
          <li class="flex justify-between">
            <span>
              <span
                on:click={() => (ciri = w.predicate)}
                class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-[">"]`}
              >
                {w.predicate.value.split(/\/|#/).at(-1)}
              </span>
              <span class="text-purple-500">{`"${w.object.value}"`}</span>
            </span>
            <select name="" id="">
              <option value="Text" default>Text</option>
              <option value="Number">Number</option>
              <option value="Date">Date</option>
            </select>
          </li>
        {/each}
      </ul>
    </Fieldset>
    <Fieldset legend="Relations">
      <ul class="mx-0.5 list-inside list-disc">
        {#each relations as w, i}
          {#if !w.predicate.value.includes("http://www.w3.org/1999/02/22-rdf-syntax-ns#type") && !w.predicate.value.includes("/md") && !w.predicate.value.includes("/mdChild")}
            <li class="my-0.5">
              <div class="inline-block justify-between">
                <span class="flex align-top">
                  <span
                    on:click={() => (ciri = w.predicate)}
                    class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}
                  >
                    {w.predicate.value.split(/\/|#/).at(-1)}
                  </span>
                  <span>
                    <details class="inline">
                      <summary>
                        <span
                          class="cursor-pointer bg-green-300/75"
                          on:click={() => (ciri = w.object)}
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
              </div>
            </li>
          {/if}
        {/each}
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
                    on:click={() => (ciri = instance)}
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
                on:click={() => (ciri = quad.subject)}
                class={`px-1 mr-2 cursor-pointer bg-green-300/75`}
              >
                {quad.subject.value.split(/\//).at(-1)}
              </span>
              <span
                on:click={() => (ciri = quad.predicate)}
                class={`px-1 mr-2 bg-sky-200 cursor-pointer before:content-["-"] after:content-["->"]`}
              >
                {quad.predicate.value.split(/\//).at(-1)}
              </span>
              <span
                on:click={() => (ciri = quad.object)}
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
                on:click={() => (ciri = w)}
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
                on:click={() => (ciri = w)}
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

        <MdChild bind:ciri {...{ dataset, markdown: ciri }} />
        <!-- {/each} -->
      </Fieldset>
    {:else}
      <Fieldset legend="Notes">
        <MdChild bind:ciri {...{ dataset, markdown }} />
      </Fieldset>
    {/if}
  </div>
</main>
