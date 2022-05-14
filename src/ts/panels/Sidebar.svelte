<script>
  import { color, rw } from "../Helpers";
</script>

<aside
  id="Sidebar"
  class="bg-orange-100 px-5 py-5 flex flex-col gap-5 col-span-15 row-span-full order-2 rounded-md overflow-hidden">
  <header>
    <label class="inline-block" for="test">Graph: &nbsp;</label>
    <select name="test" id="">
      <option value="default">default</option>
      <option value="demos">demos</option>
      <option value="cooking">cooking</option>
    </select>
  </header>
  <details id="Ontologies">
    <summary class="pb-1 cursor-pointer text-xl">📜 Ontologies</summary>
    <ul class="pl-3 list-inside list-disc">
      {#each rw() as w}
        <li>{w}</li>
      {/each}
    </ul>
  </details>
  <details id="Favorites" open>
    <summary class="pb-1 cursor-pointer text-xl">⭐️ Favorites</summary>
    <ul class="pl-3 list-inside list-disc">
      {#each rw() as w}
        <li>{w}</li>
      {/each}
    </ul>
  </details>
  <details id="Classes" open>
    <summary class="pb-1 cursor-pointer text-xl">🗂 Classes</summary>
    <ul class="pl-3 flex flex-wrap gap-1">
      {#each rw(6, 12) as w, i}
        <li
          class={`rounded-xl px-2 ${color()} cursor-pointer inline-block shadow-md capitalize`}>
          {w}
        </li>
      {/each}
    </ul>
  </details>
  <details id="Relationships" open>
    <summary class="pb-1 cursor-pointer text-xl">🔗 Relationships</summary>
    <ul class="pl-3 flex flex-wrap gap-1">
      {#each rw(7, 15, 6) as w, i}
        <li
          class={`px-2 ${color()} cursor-pointer inline-block before:content-["-"] after:content-["->"]`}>
          {w}
        </li>
      {/each}
    </ul>
  </details>
</aside>
