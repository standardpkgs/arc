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
import { Store } from "./rdfun/Store";
import { literal } from "./rdfun/Datafactory";
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
localStorage.iri = 0;

export let urlData;
export let dataset;
export let startNode;
export let favorites;
let url;

const app = new App({
  target: document.getElementById("app"),
  props: {},
});

export function iri() {
  return `node_${++localStorage.iri}`
}

export function createNode(label, graph = x.Data) {
  const s = node(iri())
  return [
    q(s, rdf.type, rdfs.Resource, graph),
    q(s, rdf.label, label, graph)
  ]
}
export function createClass(label = "anon Class", g = x.Schema) {
  const s = node(iri())
  return [q(s, rdf.type, rdfs.Class, g),
    q(s, rdf.label, l(label), g)
  ];
}
export function createRelation(label = "anon Rel", g = x.Schema) {
  const s = node(iri())
  return [
    q(s, rdf.type, rdf.Property, g),
    q(s, rdfs.domain, rdfs.Resource, g),
    q(s, rdfs.range, rdfs.Resource, g),
  ].flat();
}

export function classify(c, subjArray) {
  return subjArray
    .map((s) => [q(s, rdf.type, c, x.Data), createClass(c)])
    .flat();
}
// TODO: literal check for relation
export function addRelation(s, p, o, g = x.Data) {
  return [q(s, p, o, g), createRelation(p)].flat();
}
/**
 * lets this take (s, Array<[p,o]>) as well as (s, p, Array<o>) as args
 * @param args
 * @returns
 */
export function relations(...args) {
  const [s, p, o] = args;
  if (args[1]?.[0]?.length)
    return args[1].map((poArray) => relations(args[0], poArray));
  else if (args[1]?.length)
    return args[1][1].map((oArray) =>
      relations(args[0], args[1][0], oArray)
    );
  else return addRelation(s, p, o);
}

export function mdChild(parent, block, string) {
  return [
    q(parent, x.mdChild, block, x.Markdown),
    q(block, x.mdContent, literal(string), x.Markdown),
    classify(x.Block, [block]),
  ].flat();
}

export async function changeGraph(graph) {
  if (graph == "harry potter") {
    const dataset = new Store();
    window.dataset = dataset;

    const Apfelstrudel = x.Apfelstrudel;
    const Apple = x.Apple;
    const Austria = x.Austria;
    const Belgium = x.Belgium;
    const Bread = x.Bread;
    const Brownie = x.Brownie;
    const Burger = x.Burger;
    const Butter = x.Butter;
    const Cabbage = x.Cabbage;
    const Cheese = x.Cheese;
    const China = x.China;
    const Chocolate = x.Chocolate;
    const Country = x.Country;
    const Cream = x.Cream;
    const Dessert = x.Dessert;
    const Dim_Sum = x.Dim_Sum;
    const Dish = x.Dish;
    const Dough = x.Dough;
    const Egg = x.Egg;
    const Filo = x.Filo;
    const Fish = x.Fish;
    const Flour = x.Flour;
    const Food = x.Food;
    const France = x.France;
    const Garlic = x.Garlic;
    const Germany = x.Germany;
    const Green_Beans = x.Green_Beans;
    const Ice_Cream = x.Ice_Cream;
    const Italy = x.Italy;
    const Japan = x.Japan;
    const Jiaozi = x.Jiaozi;
    const Ketchup = x.Ketchup;
    const Lard = x.Lard;
    const Lettuce = x.Lettuce;
    const Meal = x.Meal;
    const Meat = x.Meat;
    const Mexico = x.Mexico;
    const Milk = x.Milk;
    const Onion = x.Onion;
    const Paella = x.Paella;
    const Pizza = x.Pizza;
    const Fries = x.Fries;
    const Potato = x.Potato;
    const Rice = x.Rice;
    const Saffron = x.Saffron;
    const Cinnamon = x.Cinnamon;
    const Salt = x.Salt;
    const Sauce = x.Sauce;
    const Soy = x.Soy;
    const Soy_Sauce = x.Soy_Sauce;
    const Spain = x.Spain;
    const Spice = x.Spice;
    const Sugar = x.Sugar;
    const Sushi = x.Sushi;
    const Switzerland = x.Switzerland;
    const Taco = x.Taco;
    const Tomato = x.Tomato;
    const Tomato_Sauce = x.Tomato_Sauce;
    const Tortilla = x.Tortilla;
    const USA = x.USA;
    const Vanilla = x.Vanilla;
    const Vegetable = x.Vegetable;
    const Wasabi = x.Wasabi;
    const Cocoa = x.Cocoa;

    const origin = x.origin;
    const ingredient = x.ingredient;

    const types = [
      classify(Food, [
        Cinnamon,
        Apfelstrudel,
        Apple,
        Bread,
        Brownie,
        Burger,
        Butter,
        Cabbage,
        Cheese,
        Chocolate,
        Cream,
        Dim_Sum,
        Jiaozi,
        Fries,
        Dough,
        Egg,
        Filo,
        Fish,
        Flour,
        Garlic,
        Green_Beans,
        Ice_Cream,
        Ketchup,
        Lard,
        Lettuce,
        Meat,
        Milk,
        Onion,
        Paella,
        Pizza,
        Potato,
        Rice,
        Saffron,
        Salt,
        Sauce,
        Soy_Sauce,
        Soy,
        Sugar,
        Sushi,
        Taco,
        Tomato_Sauce,
        Tomato,
        Tortilla,
        Vanilla,
        Wasabi,
      ]),
      classify(Dish, [
        Pizza,
        Sushi,
        Burger,
        Taco,
        Jiaozi,
        Fries,
        Dim_Sum,
        Paella,
        Ice_Cream,
        Brownie,
        Apfelstrudel,
      ]),
      classify(Meal, [
        Pizza,
        Sushi,
        Burger,
        Jiaozi,
        Fries,
        Taco,
        Dim_Sum,
        Paella,
      ]),
      classify(Dessert, [Ice_Cream, Brownie, Apfelstrudel, Chocolate]),
      classify(Vegetable, [Tomato, Potato, Lettuce, Cabbage]),
      classify(Spice, [Saffron, Vanilla, Cinnamon]),
      classify(Country, [
        Italy,
        Japan,
        USA,
        Germany,
        Belgium,
        France,
        Mexico,
        China,
        Spain,
        Switzerland,
        Austria,
      ]),
    ].flat(3);

    const triples = [
      relations(Pizza, [
        [origin, [Italy]],
        [ingredient, [Dough, Tomato_Sauce, Cheese]],
      ]),
      relations(Sushi, [
        [origin, [Japan]],
        [ingredient, [Rice, Fish, Wasabi]],
      ]),
      relations(Burger, [
        [origin, [USA, Germany]],
        [ingredient, [Meat, Bread, Lettuce, Tomato, Sauce]],
      ]),
      relations(Fries, [
        [origin, [Belgium, France]],
        [ingredient, [Potato, Ketchup]],
      ]),
      relations(Taco, [
        [origin, [Mexico]],
        [ingredient, [Tortilla, Meat, Onion]],
      ]),
      relations(Tortilla, [
        [origin, [Mexico]],
        [ingredient, [Flour, Salt, Lard]],
      ]),
      relations(Jiaozi, [
        [origin, [China]],
        [ingredient, [Dough, Meat, Cabbage, Garlic, Soy_Sauce]],
      ]),
      relations(Soy_Sauce, [[ingredient, [Soy, Salt, Flour]]]),
      relations(Paella, [
        [origin, [Spain]],
        [ingredient, [Rice, Meat, Saffron, Tomato, Green_Beans]],
      ]),
      relations(Ice_Cream, [
        [origin, [Italy, China]],
        [ingredient, [Cream, Milk, Egg, Sugar, Vanilla]],
      ]),
      relations(Brownie, [
        [origin, [USA]],
        [ingredient, [Chocolate, Butter, Egg, Flour, Sugar]],
      ]),
      relations(Apfelstrudel, [
        [origin, [Switzerland, Austria]],
        [ingredient, [Apple, Cinnamon, Filo, Butter, Egg]],
      ]),
      relations(Chocolate, [[ingredient, [Cocoa, Butter, Sugar, Milk]]]),
    ].flat(3);

    const markdown = [
      // markdown
      relations(Pizza, x.md, x.PizzaMD),

      mdChild(x.PizzaMD, x.PizzaMD1, "Pizza is probably the most popular food in the world."),
      mdChild(x.PizzaMD, x.PizzaMD2, "famous Pizza variations:"),
      mdChild(x.PizzaMD2, x.PizzaMD21, "Hawai"),
      mdChild(x.PizzaMD21, x.PizzaMD211, "Toppings:"),
      mdChild(x.PizzaMD211, x.PizzaMD2111, "Ham"),
      mdChild(x.PizzaMD211, x.PizzaMD2112, "Ananas"),

      mdChild(x.PizzaMD2, x.PizzaMD22, "Caprese"),
      mdChild(x.PizzaMD22, x.PizzaMD221, "Toppings:"),
      mdChild(x.PizzaMD221, x.PizzaMD2211, "Tomato"),
      mdChild(x.PizzaMD221, x.PizzaMD2212, "Basil"),
      mdChild(x.PizzaMD221, x.PizzaMD2213, "Mozarella"),

      relations(Ice_Cream, x.md, x.IceMd),
      mdChild(x.IceMd, x.IceMd1, "Most people like Ice Cream"),
      mdChild(x.IceMd, x.IceMd2, "variants:"),
      relations(x.IceMd2, x.mdChild, x.PizzaMD2112),

    ].flat(3);

    dataset.addQuads([types, triples, markdown].flat());
    const startNode = Pizza;
    const favs = [Pizza, Sushi, Fries];
    console.log([...dataset.match(null, null, null, x.Vocab)]);
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
    const dataset = new Store();
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
    const dataset = new Store();
    dataset.addQuads([...urlData]);
    return [dataset, startNode, [startNode]];
  }
  return null;
}
