import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
	
	this._loading = document.body.querySelector('.progress')
	this.load();
	
	this.emit(Application.events.READY);
  }
  _startLoading() {
	this._loading.style = 'display: block;';
  }
  _stopLoading() {
	  this.loading.style = 'display: none;';
  }
  async _load(url = " https://swapi.boom.dev/api/planets") {
	  this.startLoading();
	  
		let request = await fetch(url);
		let jsonform = await request.json();
		jsonform.results.forEach(planet => this._create(planet.name, planet.terrain, planet.population))
			if (jsonform.next !== null) {
				await this._load(jsonform.next)
			}
	  this.stopLoading();
  }
  _create(name, terrain, population) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = this._render({
      name,
      terrain,
      population
    });
  }
    document.body.querySelector(".main").appendChild(box);

    
  

  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
