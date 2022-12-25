import EventBus from "./eventBus";

export default class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    _element:any = null;
    _meta:any = null;
    props: any;
    eventBus: () => EventBus;
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

    constructor(tagName:string = "div", props = {}) { //constructor
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };
  
      this.props = this._makePropsProxy(props);
      
      this.eventBus = () => eventBus;
  
      this._registerEvents(eventBus);
      
      eventBus.emit(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus: EventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  
    init() {
      this._createResources();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  
    _componentDidMount() {
      this.componentDidMount();
    }
  
    componentDidMount(_oldProps?: undefined) {}
      dispatchComponentDidMount() {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
      }
  
    _componentDidUpdate(oldProps: any, newProps: any) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._render();
    }
  
    componentDidUpdate(_oldProps: any, _newProps: any) {
      return true;
    }
  
    setProps = (nextProps: any) => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
    };
  
    get element() {
      return this._element;
    }
  
    _render() {
      const block = this.render();
      this._element.innerHTML = block;
    }
  
    render() {}
  
    getContent():any {
      return this.element;
    }
  
    _makePropsProxy(props: {}) {
      const self = this;
  
      return new Proxy(props, {
        get(target:any, prop) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop, value) {
          target[prop] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
          return true;
        },
        deleteProperty() {
          throw new Error("Нет доступа");
        }
      });
    }
  
    _createDocumentElement(tagName: any) {
      return document.createElement(tagName);
    }
  
    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }
  }