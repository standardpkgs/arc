// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// const label = {};
// const knows = {
//   type: "Property",
//   label: "knows"
// };

// const Harry = new Map();
// const Ron = new Map();
// const Luna = new Map();

// Harry.set(label, ['Harry Potter']);
// Harry.set(knows, [Ron]);

// Ron.set(label, ['Ronald Weasly']);
// Ron.set(knows, [Harry]);

// console.log(Ron.entries);

class Store {
  nodes = {};
  constructor() {}

  add(s, p, o) {
    const [s_uri, s_label] = s;
    const [p_uri, p_label] = p;
    const [o_uri, o_label] = typeof o == 'string' ? [o] : o;
    if (!this.nodes[s_uri]) this.nodes[s_uri] = {};
    if (!this.nodes[p_uri]) this.nodes[p_uri] = {};
    if (typeof o != 'string' && !this.nodes[o_uri]) this.nodes[o_uri] = {};

    

    if (!this.nodes[s_uri][p_uri]) this.nodes[s_uri][p_uri] = [];
    this.nodes[s_uri][p_uri].push(o_uri);
  }
}

const store = new Store();
store.add(['Harry'], ['knows'], ['Ron']);
store.add(['Ron'], ['knows'], ['Harry']);
store.add(['Ron'], ['knows'], ['Luna']);
