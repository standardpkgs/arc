<script>
  import Toolbar from "./panels/Toolbar.svelte";
  import Sidebar from "./panels/Sidebar.svelte";
  import Editor from "./panels/Editor.svelte";
  import Graph from "./panels/Graph.svelte";
  import Mentions from "./panels/Mentions.svelte";
  import Statusbar from "./panels/Statusbar.svelte";
</script>

<div class="h-screen w-screen p-1 gap-1 bg-neutral-100 grid grid-rows-100">
  <Toolbar />
  <div
    class="h-full row-span-92 grid gap-1 grid-cols-100 grid-rows-100 grid-flow-row order-2">
    <Sidebar />
    <Editor />
    <Graph />
    <Mentions />
  </div>
  <Statusbar />
</div>
