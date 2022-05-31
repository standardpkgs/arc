export const namedNode = (value) => new NamedNode(value);
export const blankNode = (value?) => new BlankNode(value);
export const literal = (value, langOrDataType?) =>
  new Literal(value, langOrDataType);
export const variable = (value) => new Variable(value);
export const defaultGraph = () => new DefaultGraph();
export const quad = (s, p, o, g?) => new Quad(s, p, o, g);

export class NamedNode {
  termType: string;
  value: string;
  constructor(value: string) {
    this.termType = "NamedNode";
    this.value = value;
  }

  equals(other: Term) {
    if (
      typeof this === typeof other &&
      this.termType === other.termType &&
      this.value === other.value
    ) {
      return true;
    }
    return false;
  }
}
export class BlankNode {
  termType: string;
  value: string;
  constructor(value?: string) {
    this.termType = "BlankNode";
    this.value = value;
  }

  equals(other: Term) {
    if (
      typeof this === typeof other &&
      this.termType === other.termType &&
      this.value === other.value
    ) {
      return true;
    }
    return false;
  }
}
export class Literal {
  termType: string;
  value: string;
  language: string;
  datatype: NamedNode;
  constructor(value: string, langOrDataType?: string | NamedNode) {
    this.termType = "Literal";
    this.value = value;
    if (typeof langOrDataType == "string") this.language = langOrDataType;
    else this.datatype = langOrDataType;
  }
  // TODO: fix copy pasta
  equals(other: Term) {
    if (
      typeof this === typeof other &&
      this.termType === other.termType &&
      this.value === other.value
    ) {
      return true;
    }
    return false;
  }
}
export class Variable {
  termType: string;
  value: string;
  constructor(value: string) {
    this.termType = "Variable";
    this.value = value;
  }

  equals(other: Term) {
    if (
      typeof this === typeof other &&
      this.termType === other.termType &&
      this.value === other.value
    ) {
      return true;
    }
    return false;
  }
}
export class DefaultGraph {
  termType: string;
  value: string;
  constructor() {
    this.termType = "DefaultGraph";
    this.value = "";
  }

  equals(other: Term) {
    if (
      typeof this === typeof other &&
      this.termType === other.termType &&
      this.value === other.value
    ) {
      return true;
    }
    return false;
  }
}
export class Term {
  termType: string;
  value: string;
  constructor() {}

  equals(other: Term): boolean {
    throw new Error("equals() not implemented");
  }
}

export class Quad {
  subject: Term;
  predicate: Term;
  object: Term;
  graph: Term;
  constructor(s, p, o, g?) {
    this.subject = s;
    this.predicate = p;
    this.object = o;
    this.graph = g;
  }
  equals(other: Quad) {
    if (
      typeof this === typeof other &&
      this.subject.equals(other.subject) &&
      this.predicate.equals(other.predicate) &&
      this.object.equals(other.object) &&
      this.graph.equals(other.graph)
    ) {
      return true;
    }
    return false;
  }
}
