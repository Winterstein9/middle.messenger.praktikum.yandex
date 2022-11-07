import EventBus from "./eventBus";

export default class Block {
    static EVENTS = {//объект
      INIT: "init",//свойства объекта EVENTS
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    _element:any = null; //свойства класса Block
    _meta:any = null;
  props: any;
  eventBus: () => EventBus;
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName:string = "div", props = {}) {
      const eventBus = new EventBus();//создания экземпляра EventBus
      this._meta = { //свойство класса Block принимает объект
        tagName,
        props
      };
  
      //props получает 
      this.props = this._makePropsProxy(props); 
  
      this.eventBus = () => eventBus;
  
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus: EventBus) {//регистрация событий
    //EVENTS.INIT -> название события, this.init.bind(this) init ->функция
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
      // Этот небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно не в строку компилировать (или делать это правильно),
      // либо сразу в DOM-элементы возвращать из compile DOM-ноду
      this._element.innerHTML = block;
    }
  
    render() {}
  
    getContent():any {
      return this.element;
    }
  
    _makePropsProxy(props: {}) {
      // Можно и так передать this
      // Такой способ больше не применяется с приходом ES6+
      const self = this;
  
      return new Proxy(props, {
        get(target:any, prop) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop, value) {
          target[prop] = value;
          
          // Запускаем обновление компоненты
          // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
          return true;
        },
        deleteProperty() {
          throw new Error("Нет доступа");
        }
      });
    }
  
    _createDocumentElement(tagName: any) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  
    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }
  }