<script>
  import N3 from "n3";
  import { createNode } from "../RDFapi";

  export let dataset;
  export let ciri;
  export let tabs;

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/turtle;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  function downloadTTL() {
    const writer = new N3.Writer();
    writer.addQuads([...dataset.match()]);
    writer.end((error, result) => {
      download("graph.ttl", result);
    });
  }
</script>

<header
  class="bg-blue-300 px-5 grid grid-cols-3 place-items-center col-span-full row-span-5 order-1 rounded-md"
>
  <div class="justify-self-start">👀 View Filters</div>
  <div
    class="border align-self-center border-red-200 rounded-lg px-2 bg-slate-300"
  >
    {ciri.value}
  </div>

  <div class="justify-self-end">
    <button
      class="border border-red-200 rounded-lg px-2 bg-slate-300"
      on:click={() => (ciri = createNode("new Node"))}>+ new Node</button
    >
    <button on:click={downloadTTL}>💾 Save</button>
    <button on:click={downloadTTL}>⬇️ Download .ttl</button>
  </div>
</header>
