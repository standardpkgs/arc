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
let hi;

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
let url;

const app = new App({
  target: document.getElementById("app"),
  props: {},
});

window.app = app;

export async function changeGraph(graph) {
  if (graph == "harry potter") {
    const dataset = new N3.Store();

    function createClass(node) {
      return [q(node, rdf.type, rdfs.Class), nanode(node)].flat();
    }
    function createRelation(node) {
      return [
        q(node, rdf.type, rdf.Property),
        q(node, rdfs.domain, x.Node),
        q(node, rdfs.range, x.Node),
      ];
    }
    function nanode(node) {
      return [q(node, rdf.type, x.Node)];
    }
    function type(s, o) {
      return [q(s, rdf.type, o), nanode(s), createClass(o)].flat();
    }
    function triple(s, p, o) {
      return [q(s, p, o), nanode(s), createRelation(p), nanode(o)].flat();
    }

    const nodes = [
      nanode(x.Harry),
      nanode(x.Ronald),
      nanode(x.Hermione),
      nanode(x.Dobby),
      nanode(x.Draco),
      nanode(x.Albus),
      nanode(x.Severus),
      nanode(x.Lily),
      nanode(x.James),
      nanode(x.Petunia),
      nanode(x.Dudley),
      nanode(x.Vernon),
      nanode(x.Hedwig),
      nanode(x.Voldemort),
    ].flat();

    const types = [
      type(x.Dobby, x.Creature),
      type(x.Dobby, x.Houseelf),
      type(x.Hedwig, x.Animal),

      type(x.Petunia, x.Person),
      type(x.Dudley, x.Person),
      type(x.Vernon, x.Person),
      type(x.Petunia, x.Muggle),
      type(x.Dudley, x.Muggle),
      type(x.Vernon, x.Muggle),

      type(x.Harry, x.Person),
      type(x.Ronald, x.Person),
      type(x.Hermione, x.Person),
      type(x.Draco, x.Person),
      type(x.Albus, x.Person),
      type(x.Severus, x.Person),
      type(x.Lily, x.Person),
      type(x.James, x.Person),
      type(x.Voldemort, x.Person),

      type(x.Harry, x.Wizard),
      type(x.Ronald, x.Wizard),
      type(x.Hermione, x.Wizard),
      type(x.Draco, x.Wizard),
      type(x.Albus, x.Wizard),
      type(x.Severus, x.Wizard),
      type(x.Lily, x.Wizard),
      type(x.James, x.Wizard),
      type(x.Voldemort, x.Wizard),

      type(x.Albus, x.Teacher),
      type(x.Severus, x.Teacher),


    ].flat();

    const triples = [

    ].flat();

    // console.error(nodes)

    dataset.addQuads([nodes, types, triples].flat());
    const startNode = x.Harry;
    const favs = [x.Harry, x.Ronald, x.Hermione];
    return [dataset, startNode, favs];
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
    const startNode = node("https://www.rubensworks.net/#me");
    const dataset = new N3.Store();
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
    const dataset = new N3.Store();
    dataset.addQuads([...urlData]);
    return [dataset, startNode, [startNode]];
  }
  return null;
}
