import { q, rdf, rdfs, x } from "./main";
import N3 from "n3";
const store = new N3.Store();
export function createClass(node) {
  return [q(node, rdf.type, rdfs.Class), createNode(node)];
}
export function createRelation(node) {
  return [q(node, rdf.type, rdf.Property), q(node, rdfs.domain, x.Node), q(node, rdfs.range, x.Node)];
}
export function createNode(node) {
  return [q(node, rdf.type, x.Node)];
}
export function attachClass(s, o) {
  return [q(s, rdf.type, o), createNode(s), createClass(o)];
}
export function attachRelation(s, p, o) {
  return [q(s, p, o), createNode(s), createRelation(p), createNode(o)];
}
