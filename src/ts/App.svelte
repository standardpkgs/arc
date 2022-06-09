<script>
  import Toolbar from "./panels/Toolbar.svelte";
  import Sidebar from "./panels/Sidebar.svelte";
  import Editor from "./panels/Editor.svelte";
  import Graph from "./panels/Graph.svelte";
  import Mentions from "./panels/Mentions.svelte";
  import Statusbar from "./panels/Statusbar.svelte";
  import { changeGraph, namedNode, rdf, rdfs, x } from "./main";
  import { onMount } from "svelte";
  import { quad } from "./rdfun/Datafactory";

  // global state
  let dataset = [];
  let ciri;
  let favorites = [];
  let graph = "pkg";
  let tabs = [];

  $: {
    ciri = ciri;
    dataset = dataset;
    favorites = favorites;
  }

  onMount(onGraphSelect);

  // FIXME: this is a global update Trigger right now
  function onGraphSelect() {
    changeGraph(graph).then((data) => ([dataset, ciri, favorites] = data));
  }
</script>

{#if [...dataset]?.length}
  <div class="h-screen w-screen p-1 gap-1 bg-neutral-100 grid grid-rows-100">
    <Toolbar bind:ciri {dataset} {tabs} />
    <div
      class="h-full row-span-92 grid gap-1 grid-cols-100 grid-rows-100 grid-flow-row order-2"
    >
      <Sidebar
        bind:ciri
        bind:graph
        {...{ dataset, favorites, onGraphSelect }}
      />
      <Editor bind:ciri {...{ dataset }} />
      <Graph />
      <Mentions bind:ciri {...{ dataset }} />
    </div>
    <Statusbar />
  </div>
{/if}
