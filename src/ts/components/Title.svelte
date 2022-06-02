<script>
  export let title;
  let isClass = false;
  let isProperty = false;
</script>

<textarea
on:input="{(e) => (title = e.target.value)}"
  rows={title.split("\n")?.length ?? 1}
  cols={[...title].length}
  class:bg-red-300={isClass}
  class:bg-sky-200={isProperty}
  class:bg-green-300={!isClass && !isProperty}
  class={"overflow-hidden rounded-xl" +
    (isProperty ? `before:content-["-"] after:content-["->"]` : "")}
  >{title}</textarea
>
