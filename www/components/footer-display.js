import "./twitter-button";

class FooterDisplay extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const footer = document.createElement("footer");
    style.textContent = `
footer {
  text-align: center;
  font-size: 85%;
  opacity: 0.8;
}
p {
  line-height: 1.5rem;
}
a {
  color: #900000;
}
    `;
    shadow.appendChild(style);
    shadow.appendChild(footer);
    this.render();
  }

  static get observedAttributes() {
    return ["from", "to"];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render();
    }
  }

  render() {
    const from = Number(this.getAttribute("from")) || 2024;
    const to = Number(this.getAttribute("to")) || 2024;
    const fromTo = from === to ? from : `${from}-${to}`;
    this.shadowRoot.querySelector("footer").innerHTML = `
<p>
    ©${fromTo} - <a href="http://cs.tinyiu.com/">cs.tinyiu.com</a> - @soraxas
</p>
<p>
    <twitter-button text="🤖 A cutting-edge robotics project focused on embodied AI, combining real-to-sim technology for enhanced simulation and real-world integration. " url="https://embodx.ai" via="soraxas"></twitter-button>
</p>
    `;
  }
}

customElements.define("footer-display", FooterDisplay);
