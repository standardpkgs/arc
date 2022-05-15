//==============================================================================
//#region I/O
import rdfDereferencer from "rdf-dereference";
(async function main() {
  const { data } = await rdfDereferencer.dereference(
    "http://dbpedia.org/page/12_Monkeys"
  );
  data
    .on("data", (quad) => console.log(quad))
    .on("error", (error) => console.error(error))
    .on("end", () => console.log("All done!"));
})();

async function initRDF() {}

async function getStoredTurtle() {}

async function parseStoredTurtle() {}

async function writeTurtleToStorage() {}

//#endregion
//==============================================================================

export async function renameNode({ old, now }) {}

export async function renameProperty({ old, now }) {}

async function addClass({ label }) {}

async function addProperty({ label }) {}

let generatorID = localStorage.generatorID || 0;
