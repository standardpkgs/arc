<script>
import { getLabelTriple } from "../RDFapi";

  export let ciri;
  let isClass = false;
  let isProperty = false;

  $: labelTriple = getLabelTriple(ciri);
  $: title = labelTriple.object.value;
</script>

<textarea
  on:input={(e) => {
    labelTriple.object.value = e.target.value;
    ciri = ciri;
  }}
  rows={title.split("\n")?.length ?? 1}
  class:bg-red-300={isClass}
  class:bg-sky-200={isProperty}
  class:bg-green-300={!isClass && !isProperty}
  class={"px-2 w-full overflow-hidden rounded-xl" +
    (isProperty ? `before:content-["-"] after:content-["->"]` : "")}
  >{title}</textarea
>
