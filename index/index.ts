import "./style.styl"
import "./index.styl"
import { idea } from "./idea"


class Navigator{

    nav:HTMLElement
    pages:any[]
    title:HTMLElement|null=document.querySelector("#title")

    constructor(idea:any[]){
        //получение плана сайта
        this.pages=idea
        //формирование на основе плана временнной навигации
        //носителя ссылок nav
        this.nav=document.createElement('nav')
        //класс для тфм
        this.nav.classList.add("in__navigator")
        //создание ссылок
        //извлечение данных для ссылок
        //установка обработчиков
        this.pages.map((link)=>{
            let a:HTMLElement = document.createElement('a')
            a.textContent=link.name
            a.setAttribute("id",link.id)
            //класс для ссылок
            a.classList.add("in__navigator__a")
//назначение события
//a - элемент которому назначается событие
//link.page страница hbs
//link.components компоненты для страница hbs
//link.title - заголовок страницы hbs

          //  console.log("link.data: ",link.data)

            this.addEvent(a, link.page, link.title, link.components, link.data)

            this.nav.appendChild(a)
        })
        //вставка первой страницы
        this.connect(this.pages[0].page, this.pages[0].title, this.pages[0].components, this.pages[0].data)
    }

    //функция вставки представления
    connect(page:any, title:string, components:any[]|undefined=undefined, data:any[]|undefined=undefined){
        //if сделан на случай ошибки null
        if(this.title){
            //если объект заголовка получен - поменять заголовок
            this.title.textContent=title
        }
        //вставить шаблон
        document.body.innerHTML=page()
        //вставить навигацию
        document.body.appendChild(this.nav)

        //если есть компоненты - передать их для обработки компонентам
        if(components){
            this.addComponents(components)
        }
//вставка заранее подготовленных данных
        if(data){
            this.addData(data)
        }
    }

    //сюда передаются элементы нафигации - ссылки
    //element - a , page - шаблон - функция hbs , components компоненты шаблона,
    //title - заголовок, event - событие
    addEvent(element:HTMLElement, page:any, title:string, components:any[]|undefined, data:any[]|undefined, event:string="click"){
        //назначение событий ссылкам навигации
        //при клике по ссылке возникнет событие вставки шаблона через this.connect
        element.addEventListener(event,()=>{
            //передача функции 
            this.connect(page, title, components, data)
        })
    }
//метод обработки массива компонентов
    addComponents(components: any[]){
        //если компонент 1
        if(components.length==1){
            //вставить этот компонент
            document.querySelector(components[0].selector).innerHTML=new components[0].component().add(components[0].args)
        }else{
            //иначе извлекать в массиве
            components.map((component)=>{
                document.querySelector(component.selector).innerHTML+=new component.component().add(component.args)
            })
        }
    }

    addData(data:any[]){//data: { selector: string; data: string }
        if(data.length==1){
            document.querySelector(data[0].selector).innerHTML=data[0].data
        }else{
            data.map((data)=>{
                document.querySelector(data.selector).innerHTML=data.data
            })
        }
    }
}

new Navigator(idea)