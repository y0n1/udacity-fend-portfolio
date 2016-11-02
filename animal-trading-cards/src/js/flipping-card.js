'use strict';

class FlippingCard extends HTMLElement {

  constructor() {
    super();
  }

  static get SIDES() {
    return {
      FRONT: 1,
      BACK: 2,
    };
  }

  flip() {
    const scale = (500 + 200) / 500;

    const visibleSide = [
      {transform: `translateZ(-200px) rotateY(0deg) scale(${scale})`},
      {transform: `translateZ(-100px) rotateY(0deg) scale(${scale})`, offset: 0.15},
      {transform: `translateZ(-100px) rotateY(180deg) scale(${scale})`, offset: 0.65},
      {transform: `translateZ(-200px) rotateY(180deg) scale(${scale})`},
    ];

    const concealedSide = [
      {transform: `translateZ(-200px) rotateY(180deg) scale(${scale})`},
      {transform: `translateZ(-100px) rotateY(180deg) scale(${scale})`, offset: 0.15},
      {transform: `translateZ(-100px) rotateY(360deg) scale(${scale})`, offset: 0.65},
      {transform: `translateZ(-200px) rotateY(360deg) scale(${scale})`},
    ];

    const timing = {
      duration: 700,
      iteration: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
    };

    switch (this._side) {
      case FlippingCard.SIDES.FRONT:
        this._front.animate(visibleSide, timing);
        this._back.animate(concealedSide, timing);
        this._side = FlippingCard.SIDES.BACK;
        break;
      case FlippingCard.SIDES.BACK:
        this._front.animate(concealedSide, timing);
        this._back.animate(visibleSide, timing);
        this._side = FlippingCard.SIDES.FRONT;
        break;
      
      default:
        throw new Error('Unknown side');
    }
  }

  /**
   * The behavior you define occurs when the element is registered.
   * @memberOf FlippingCard
   */
  createdCallback() {
    this._side = FlippingCard.SIDES.FRONT;
    this._front = this.querySelector('.frontside');
    this._back = this.querySelector('.backside');
    this._buttons = this.querySelectorAll('button');
  }
  
  /**
   * The behavior occurs when the element is inserted into the DOM.
   * @memberOf FlippingCard
   */
  attachedCallback() {
    Array.from(this._buttons)
      .forEach((button) => {
        button.addEventListener('click', () => {this.flip()});
      }, this);
  }

  /**
   * The behavior occurs when the element is removed from the DOM.
   * @memberOf FlippingCard
   */
  detachedCallback() {}

  /**
   * The behavior occurs when an attribute of the element is added, changed, or removed
   * 
   * @param {any} name
   * @param {any} oldValue
   * @param {any} newValue
   * 
   * @memberOf FlippingCard
   */
  // attributeChangedCallback (name, oldValue, newValue) {}
}

document.registerElement('flipping-card', FlippingCard);
