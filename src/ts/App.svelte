<script>
  import Toolbar from "./panels/Toolbar.svelte";
  import Sidebar from "./panels/Sidebar.svelte";
  import Editor from "./panels/Editor.svelte";
  import Graph from "./panels/Graph.svelte";
  import Mentions from "./panels/Mentions.svelte";
  import Statusbar from "./panels/Statusbar.svelte";
  import { changeGraph, l, node, rdf, rdfs, x } from "./main";
  import { onMount } from "svelte";

  let dataset = [];
  let currentNode = rdfs.Class;
  let classes, propertys;
  let favs = [""];
  let graph = "harry potter";

  onMount(onGraphSelect);

  function changeNode(node) {
    currentNode = node;
  }
  function onGraphSelect() {
    changeGraph(graph).then((data) => {
      [dataset, currentNode, favs] = data;
    });
  }
  $: {
    currentNode;
    classes = [
      ...new Set(
        [...dataset]
          .filter((quad) => quad.predicate.equals(rdf.type))
          .map((quad) => quad.object.value)
      ),
    ].map(node);

    propertys = [
      ...new Set([...dataset].map((quad) => quad.predicate.value)),
    ].map(node);
    console.log("refresh", [...dataset].length);
  }
</script>

{#if [...dataset]?.length}
  <div class="h-screen w-screen p-1 gap-1 bg-neutral-100 grid grid-rows-100">
    <Toolbar {dataset} />
    <div
      class="h-full row-span-92 grid gap-1 grid-cols-100 grid-rows-100 grid-flow-row order-2">
      <Sidebar
        bind:currentNode
        bind:graph
        {...{ dataset, propertys, classes, favs, onGraphSelect }} />
      <Editor bind:currentNode {...{ dataset, changeNode }} />
      <Graph />
      <Mentions bind:currentNode {...{ dataset, changeNode }} />
    </div>
    <Statusbar />
  </div>
{/if}
