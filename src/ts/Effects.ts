// @ontologies
import * as as from "@ontologies/as"
import * as dcelems from "@ontologies/dcelems"
import * as dcterms from "@ontologies/dcterms"
import * as dctype from "@ontologies/dctype"
import * as foaf from "@ontologies/foaf"
import * as ld from "@ontologies/ld"
import * as owl from "@ontologies/owl"
import * as prov from "@ontologies/prov"
import * as rdf from "@ontologies/rdf"
import * as rdfs from "@ontologies/rdfs"
import * as schema from "@ontologies/schema"
import * as shacl from "@ontologies/shacl"
import * as skos from "@ontologies/skos"
import * as xsd from "@ontologies/xsd"
// rdfjs
import N3 from "n3"
import type { Sparql } from "./vite-env"
import clownface from "clownface"
// import rdfetch from "@rdfjs/fetch"
// import namespace from "@rdfjs/namespace"

// import fetch from '@rdfjs/fetch'

const label = 'http://www.w3.org/2000/01/rdf-schema#label'

export const sparql: Sparql = new Comunica.QueryEngine()
export const store = new N3.Store()

const { namedNode: node, literal, quad } = N3.DataFactory

main()

//==============================================================================
//#region I/O

async function main() {
  await initRDF()
  console.log(store.getQuads())
}

async function initRDF() {
  const currentURI = localStorage.currentURI ?? "http://example.org/Omes"
  if (localStorage.turtle) {
    getStoredTurtle()
  } else {
    await sparql.queryVoid(
      `
      PREFIX : <http://example.org/>
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      PREFIX rdf: <http://www.w3.org/2000/01/rdf-schema/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>
      INSERT DATA
      { 
        :Person a rdfs:Class .

        :Omes   rdfs:label "Omes Baltes" ;
                a :Person ;
                foaf:givenName "Omes" ;
                foaf:familyName "Baltes" ;

      }`,
      {
        sources: [store],
      }
    )
  }
}

async function getStoredTurtle() {}

async function parseStoredTurtle() {}

async function writeTurtleToStorage() {}

//#endregion
//==============================================================================

export async function renameNode({ old, now }) {}

export async function renameProperty({ old, now }) {}

async function addClass({ label }) {}

async function addProperty({ label }) {}

let generatorID = localStorage.generatorID || 0
