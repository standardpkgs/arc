<script>
  export let title;
  let isClass = false;
  let isProperty = false;
</script>

<textarea
on:input="{(e) => (title = e.target.value)}"
  rows={title.split("\n")?.length ?? 1}
  cols={title.length + 2 - title.split(" ").length  ?? 1}
  class:bg-red-300={isClass}
  class:bg-sky-200={isProperty}
  class:bg-green-300={!isClass && !isProperty}
  class={"px-2 overflow-hidden rounded-xl" +
    (isProperty ? `before:content-["-"] after:content-["->"]` : "")}
  >{title}</textarea
>
