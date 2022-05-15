import App from "./App.svelte";
import "../css/index.css";
import * as H from "./Helpers";
// import "./Effects"
import clownface from "clownface";
import rext from "rdf-ext";
import N3 from "n3";
import namespace from "@rdfjs/namespace";
import fetch from "@rdfjs/fetch";

import { storeStream } from "rdf-store-stream";
import rdfDereferencer from "rdf-dereference";

export const rdf = namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
export const rdfs = namespace("http://www.w3.org/2000/01/rdf-schema#");
export const xsd = namespace("http://www.w3.org/2001/XMLSchema#");
export const owl = namespace("http://www.w3.org/2002/07/owl#");
export const foaf = namespace("http://xmlns.com/foaf/0.1/");
export const skos = namespace("http://www.w3.org/2004/02/skos/core#");
export const dcterms = namespace("http://purl.org/dc/terms/");
export const schema = namespace("http://schema.org/");
export const x = namespace("http://example.org/");
export const {
  namedNode: node,
  literal: l,
  quad: q,
  variable,
} = N3.DataFactory;
const a = rdf.type;

export let urlData;
export let dataset;
export let startNode;
export let favorites;

(async function main() {
  urlData = await (
    await fetch("https://zazuko.github.io/tbbt-ld/dist/tbbt.nq")
  ).dataset();
  console.log("rdf-schema", [...urlData]);

  dataset = new N3.Store();

  const quads = [
    q(x.Home, schema.givenName, l("Home")),
    q(x.Home, rdfs.seeAlso, x.Harry),
    q(x.Harry, a, x.Person),
    q(x.Harry, a, x.Wizard),
    q(x.Harry, schema.givenName, l("Harry Potter")),
    q(x.Harry, x.mother, x.Lily),
    q(x.Harry, x.father, x.James),
    q(x.Harry, x.hobby, x.Quidditch),
    q(x.Harry, x.pet, x.Hedwig),
    q(x.Harry, x.eyeColor, l("green")),
    q(x.Harry, x.hairColor, l("brown")),
    q(x.Harry, x.knows, x.Hermione),
    q(x.Harry, x.knows, x.Ron),
    q(x.Harry, x.md, x.root),
    q(x.root, x.mdContent, l("This. is. Markdown!!!")),
    q(x.root, x.mdChild, x.md1),
    q(x.md1, x.mdContent, l("Wands Harry has used")),
    q(x.md1, x.mdChild, x.md11),
    q(x.md1, x.mdChild, x.md12),
    q(x.md1, x.mdChild, x.md13),
    q(x.md11, x.mdContent, l("His Own")),
    q(x.md12, x.mdContent, l("Malfoys")),
    q(x.md13, x.mdContent, l("Dumbledores")),
    q(x.root, x.mdChild, x.md2),
    q(x.md2, x.mdContent, l("Harrys best Friend is Ron")),
    q(x.Hermione, a, x.Wizard),
    q(x.Hermione, schema.givenName, l("Hermione Granger")),

    q(x.Hermione, a, x.Person),
    q(x.Hermione, x.knows, x.Hermione),
    q(x.Hermione, x.knows, x.Harry),
    q(x.Hermione, x.hobby, x.Reading),
    q(x.Hermione, x.eyeColor, l("brown")),
    q(x.Hermione, x.hairColor, l("brown")),
    q(x.Ron, schema.givenName, l("Ronald Weasley")),

    q(x.Ron, x.knows, x.Hermione),
    q(x.Ron, x.knows, x.Harry),
    q(x.Ron, a, x.Wizard),
    q(x.Ron, a, x.Person),
    q(x.Ron, x.hobby, x.Reading),
    q(x.Ron, x.eyeColor, l("blue")),
    q(x.Ron, x.hairColor, l("red")),
  ];

  let potter = true;
  potter = false
  if (potter) {
    dataset.addQuads(quads);
    startNode = x.Harry;
    favorites = [x.Harry, x.Ron, x.Hermione]
  } else {
    dataset.addQuads([...urlData]);
    startNode = node("http://localhost:8080/data/person/amy-farrah-fowler");
    favorites = [node("http://localhost:8080/data/person/amy-farrah-fowler"), node("http://localhost:8080/data/person/penny")]
  }

  window.dataset = dataset;

  const app = new App({
    target: document.getElementById("app"),
  });
})();
