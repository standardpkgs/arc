<script>
  import N3 from "n3";
import { x } from "../main";
  export let dataset

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

  let turtle;
  function downloadGraphs() {
    logttl(x.Data)
    logttl(x.Vocab)
  }
  function logttl(graph) {
    const writer = new N3.Writer();
    writer.addQuads([...dataset.match(null,null,null, graph)]);
    writer.end((error, result) => {
      turtle = result;
      download("graph.ttl", turtle)
    });
  }
</script>

<header
  class="bg-blue-300 px-5 flex justify-between place-items-center col-span-full row-span-5 order-1 rounded-md">
  <div>👀 View Filters</div>
  <div>Toolbar</div>
  <button on:click={downloadGraphs} >💾 Download .ttl</button>
</header>
