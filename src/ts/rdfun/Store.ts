import type { NamedNode, Quad, Term } from "./Datafactory";

export class Store {
  size: number;
  #memory: Quad[];
  constructor() {
    this.#memory = [];
  }

  add(quad: Quad) {
    if (!this.has(quad)) this.#memory.push(quad);
    return this;
  }
  delete(quad: Quad) {
    const quadIndex = this.#memory.findIndex((q) => q.equals(quad));
    this.#memory.splice(quadIndex, 1);
    return this;
  }
  has(quad: Quad) {
    return this.#memory.some((q) => q.equals(quad));
  }
  match(
    s: Term | null,
    p?: Term | null,
    o?: Term | null,
    g?: NamedNode | null
  ) {
    const sMatches = s
      ? this.#memory.filter((quad) => quad.subject.equals(s))
      : this.#memory;
    const pMatches = p
      ? sMatches.filter((quad) => quad.predicate.equals(p))
      : sMatches;
    const oMatches = o
      ? pMatches.filter((quad) => quad.object.equals(o))
      : pMatches;
    const gMatches = g
      ? oMatches.filter((quad) => quad.graph.equals(g))
      : oMatches;

    const matchesStore = new Store();
    gMatches.forEach((quad) => matchesStore.add(quad));
    return matchesStore;
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.#memory.length) {
          return {
            value: this.#memory[index++],
            done: false,
          };
        } else {
          return { done: true };
        }
      },
    };
  }

  // non standard
  addQuads(quadArray) {
    quadArray.forEach((quad) => this.add(quad));
    return this;
  }
}
