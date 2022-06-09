import App from "./App.svelte";
import "../css/index.css";
import namespace from "@rdfjs/namespace";
import { storeStream } from "rdf-store-stream";
import rdfDereferencer from "rdf-dereference";
import { Store } from "./rdfun/Store";
import { namedNode, literal, quad, variable } from "./rdfun/Datafactory";
import { createClass, createNode, createRelation } from "./RDFapi";

export const rdf = namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
export const rdfs = namespace("http://www.w3.org/2000/01/rdf-schema#");
export const xsd = namespace("http://www.w3.org/2001/XMLSchema#");
export const owl = namespace("http://www.w3.org/2002/07/owl#");
export const foaf = namespace("http://xmlns.com/foaf/0.1/");
export const skos = namespace("http://www.w3.org/2004/02/skos/core#");
export const dcterms = namespace("http://purl.org/dc/terms/");
export const schema = namespace("http://schema.org/");
export const x = namespace("http://example.org/");

localStorage.nodeIndex = 0;
let url;

const app = new App({
  target: document.getElementById("app"),
  props: {},
});

export async function changeGraph(graph) {
  const dataset = new Store();
  window.dataset = dataset;

  createRelation("type", rdfs.Resource, rdfs.Class, rdf.type);
  createRelation("label", rdfs.Resource, rdfs.label, rdfs.label);
  createClass("Node", x.Node);

  if (graph == "pkg") {
    const home = createNode("Home");
    return [dataset, home, [home]];
  }
  if (graph == "rubenworks") {
    url = "https://www.rubensworks.net/#me";
    const { data } = await rdfDereferencer.dereference(
      url
      // "https://dbpedia.org/page/Inception"
      // "https://www.rubensworks.net/#me"
      // "https://zazuko.github.io/tbbt-ld/dist/tbbt.nq"
    );
    const urlData = await storeStream(data);
    const startNode = namedNode("https://www.rubensworks.net/#me");
    dataset.addQuads([...urlData]);
    return [dataset, startNode, [startNode]];
  }
  if (graph == "+ enter url") {
    url =
      prompt("please enter a RDF Resource URI") ??
      "https://www.rubensworks.net/#me";
    const { data } = await rdfDereferencer.dereference(url);
    const urlData = await storeStream(data);
    const startNode = rdfs.Class;
    dataset.addQuads([...urlData]);
    return [dataset, startNode, [startNode]];
  }
  return null;
}
