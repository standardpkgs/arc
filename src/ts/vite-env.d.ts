/// <reference types="svelte" />
/// <reference types="vite/client" />

import { QueryEngine } from "@comunica/query-sparql";
import type { Store } from "./rdfun/Store";

type Sparql = QueryEngine;

declare global {
  var dataset: Store;
}
