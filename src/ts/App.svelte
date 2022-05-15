<script>
  import Toolbar from "./panels/Toolbar.svelte";
  import Sidebar from "./panels/Sidebar.svelte";
  import Editor from "./panels/Editor.svelte";
  import Graph from "./panels/Graph.svelte";
  import Mentions from "./panels/Mentions.svelte";
  import Statusbar from "./panels/Statusbar.svelte";
  import { dataset, l, node, rdf, rdfs, x, startNode } from "./main";

  let currentNode = startNode;
  let favs = [""]
  console.log(currentNode);

  const data = [...dataset];
  const classes = [...new Set([...dataset].filter(quad => quad.predicate.equals(rdf.type)).map(quad => quad.object.value))].map(node)
  const propertys = [...new Set(data.map(quad => quad.predicate.value))].map(node)

  console.log("data", data)
  console.log(classes)
  console.log(propertys)
</script>

<div class="h-screen w-screen p-1 gap-1 bg-neutral-100 grid grid-rows-100">
  <Toolbar />
  <div
    class="h-full row-span-92 grid gap-1 grid-cols-100 grid-rows-100 grid-flow-row order-2">
    <Sidebar bind:currentNode {...{data, dataset, propertys, classes, favs}} />
    <Editor bind:currentNode {...{data, dataset}} />
    <Graph />
    <Mentions />
  </div>
  <Statusbar />
</div>
