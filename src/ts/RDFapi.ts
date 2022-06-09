import { rdf, rdfs, x } from "./main";
import { literal, namedNode, quad } from "./rdfun/Datafactory";

export function attachClass(s, o) {
  return [quad(s, rdf.type, o), createNode(s), createClass(o)];
}
export function attachRelation(s, p, o) {
  return [quad(s, p, o), createNode(s), createRelation(p), createNode(o)];
}

export function createIri() {
  return namedNode(`http://example.org/node_${++localStorage.nodeIndex}`);
}
export function createLabelTriple(namedNode, label = namedNode.value) {
  const labelTriple = quad(namedNode, rdfs.label, literal(label));
  dataset.addQuads([labelTriple]);
  return labelTriple;
}

export function getLabelTriple(namedNode) {
  const labelTriple = [...dataset].find(
    (quad) =>
      quad.subject.equals(namedNode) && quad.predicate.equals(rdfs.label)
  );
  return labelTriple ?? createLabelTriple(namedNode);
}

export function getLabel(namedNode) {
  return getLabelTriple(namedNode).object.value
}

export function createNode(label, graph = x.Data) {
  const node = createIri();
  const labelTriple = quad(node, rdfs.label, literal(label), graph);
  const nodeQuad = quad(node, rdf.type, x.Node);
  dataset.addQuads([labelTriple, nodeQuad]);
  return node;
}
export function createClass(
  label = "untitled Class",
  iri = namedNode(createIri()),
  graph = x.Schema
) {
  const labelTriple = quad(iri, rdfs.label, literal(label), graph);
  dataset.addQuads([quad(iri, rdf.type, rdfs.Class, graph), labelTriple]);
  return labelTriple;
}
export function createRelation(
  label = "untitled Rel",
  domain = rdfs.Resource,
  range = rdfs.Resource,
  iri = namedNode(createIri()),
  graph = x.Schema
) {
  const labelTriple = quad(iri, rdfs.label, literal(label), graph);
  dataset.addQuads([
    quad(iri, rdf.type, rdf.Property, graph),
    quad(iri, rdfs.domain, domain, graph),
    quad(iri, rdfs.range, range, graph),
    labelTriple,
  ]);
  return labelTriple;
}

// TODO: literal check for relation
export function addRelation(s, p, o, g = x.Data) {
  return [quad(s, p, o, g), createRelation(p)].flat();
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
    return args[1][1].map((oArray) => relations(args[0], args[1][0], oArray));
  else return addRelation(s, p, o);
}

export function classify(c, subjArray) {
  return subjArray
    .map((s) => [quad(s, rdf.type, c, x.Data), createClass(c)])
    .flat();
}
