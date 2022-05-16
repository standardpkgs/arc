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
      type(x.Voldemort, x.Deatheater),

      type(x.Albus, x.Teacher),
      type(x.Severus, x.Teacher),


    ].flat();

    const triples = [
      triple(x.Harry, x.hobby, x.Quidditch),
      triple(x.Ronald, x.hobby, x.Quidditch),
      triple(x.Draco, x.hobby, x.Quidditch),
      triple(x.James, x.hobby, x.Quidditch),
      triple(x.Hermione, x.hobby, x.Knitting),

      triple(x.Harry, x.friends, x.Hermione),
      triple(x.Harry, x.friends, x.Ronald),
      triple(x.Harry, x.friends, x.Dobby),

      triple(x.Harry, x.pet, x.Hedwig),
      triple(x.Harry, x.friends, null),

      triple(x.Ronald, x.friends, x.Hermione),
      triple(x.Ronald, x.friends, x.Harry),

      triple(x.Hermione, x.firends, x.Harry),
      triple(x.Hermione, x.friends, x.Ronald),

      triple(x.Harry, x.father, x.James),
      triple(x.Harry, x.mother, x.Lily),

      triple(x.Harry, x.related, x.Petunia),
      triple(x.Harry, x.related, x.Vernon),
      triple(x.Harry, x.related, x.Dudley),



      triple(x.Harry, rdfs.label, l("Harry Potter")),
      triple(x.Harry, foaf.givenName, l("Harry")),
      triple(x.Harry, foaf.familyName, l("Potter")),
      triple(x.Harry, x.hairColor, l("brown")),
      triple(x.Ronald, rdfs.label, l("Ronald Weasley")),
      triple(x.Ronald, foaf.givenName, l("Ronald")),
      triple(x.Ronald, foaf.familyName, l("Weasley")),
      triple(x.Ronald, x.hairColor, l("red")),
      triple(x.Hermione, rdfs.label, l("Hermione Granger")),
      triple(x.Hermione, foaf.givenName, l("Hermione")),
      triple(x.Hermione, foaf.familyName, l("Granger")),
      triple(x.Hermione, x.hairColor, l("brown")),
      triple(x.Dobby, rdfs.label, l("Dobby")),
      triple(x.Dobby, foaf.givenName, l("Dobby")),
      triple(x.Dobby, foaf.familyName, l("Free Elf")),
      triple(x.Dobby, x.hairColor, l("none")),
      triple(x.Draco, rdfs.label, l("Draco Malfoy")),
      triple(x.Draco, foaf.givenName, l("Draco")),
      triple(x.Draco, foaf.familyName, l("Malfoy")),
      triple(x.Draco, x.hairColor, l("blonde")),
      triple(x.Albus, rdfs.label, l("Albus Dumbledore")),
      triple(x.Albus, foaf.givenName, l("Albus")),
      triple(x.Albus, foaf.familyName, l("Dumbledore")),
      triple(x.Albus, x.hairColor, l("silver")),
      triple(x.Severus, rdfs.label, l("Severus Snape")),
      triple(x.Severus, foaf.givenName, l("Severus")),
      triple(x.Severus, foaf.familyName, l("Snape")),
      triple(x.Severus, x.hairColor, l("black")),
      triple(x.Lily, rdfs.label, l("Lily Potter")),
      triple(x.Lily, foaf.givenName, l("Lily")),
      triple(x.Lily, foaf.familyName, l("Potter")),
      triple(x.Lily, x.hairColor, l("red")),
      triple(x.James, rdfs.label, l("James Potter")),
      triple(x.James, foaf.givenName, l("James")),
      triple(x.James, foaf.familyName, l("Potter")),
      triple(x.James, x.hairColor, l("brown")),
      triple(x.Petunia, rdfs.label, l("Petunia Dursley")),
      triple(x.Petunia, foaf.givenName, l("Petunia")),
      triple(x.Petunia, foaf.familyName, l("Dursley")),
      triple(x.Petunia, x.hairColor, l("brown")),
      triple(x.Dudley, rdfs.label, l("Dudley Dursley")),
      triple(x.Dudley, foaf.givenName, l("Dudley")),
      triple(x.Dudley, foaf.familyName, l("Dursley")),
      triple(x.Dudley, x.hairColor, l("brown")),
      triple(x.Vernon, rdfs.label, l("Vernon Dursley")),
      triple(x.Vernon, foaf.givenName, l("Vernon")),
      triple(x.Vernon, foaf.familyName, l("Dursley")),
      triple(x.Vernon, x.hairColor, l("brown")),
      triple(x.Hedwig, rdfs.label, l("Hedwig")),
      triple(x.Hedwig, foaf.givenName, l("Hedwig")),
      triple(x.Hedwig, x.hairColor, l("white")),
      triple(x.Voldemort, rdfs.label, l("Lord Voldemort")),
      triple(x.Voldemort, foaf.givenName, l("Tom")),
      triple(x.Voldemort, foaf.familyName, l("Riddle")),
      triple(x.Voldemort, x.hairColor, l("brown")),
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
