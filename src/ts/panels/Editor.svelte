<script>
  import { color, rw } from "../Helpers";
  import { marked } from "marked";
  let words = rw();
  let value = "Enter Text here"
  let input = true
  $: console.log(value)
</script>

<main
  class="bg-neutral-50 col-span-60 row-span-full order-3 rounded-md overflow-auto">
  <div class="h-full px-8 py-5 flex flex-col gap-2">
    <header class="border-2 border-neutral-700 rounded-lg py-2 px-5">
      <h2 class="text-6xl">Omes Baltes</h2>
      <div class="text-gray-400">
        https://example.org/da39a3ee5e6b4b0d3255bfef95601890afd80709
      </div>
    </header>
    <ul class="px-0 flex justify-center flex-wrap gap-1">
      {#each rw(2, 5, 10) as w, i}
        <li
          class={`rounded-xl px-2 ${color()} cursor-pointer inline-block shadow-md capitalize`}>
          {w}
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
        {#each rw(3, 5) as w, i}
          <li class="flex ">
            <span
              class={`px-1 mr-2 ${color()} cursor-pointer before:content-["-"] after:content-["->"]`}>
              {w}
            </span>
            <span>{rw()}</span>
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
        {#each rw() as w, i}
          <li class="flex ">
            <span
              class={`px-1 mr-2 ${color()} cursor-pointer before:content-["-"] after:content-["->"]`}>
              {w}
            </span>
            <span>{rw()}</span>
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
      {#if input}
      <textarea name="" id="" cols="30" rows="10" bind:value />
      {:else}
        {@html marked(value)}
      {/if}
      {value}
    </fieldset>
  </div>
</main>
;
