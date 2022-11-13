export default class ValidForm{
    un__form:HTMLFormElement|null
    inputs:NodeListOf<Element>|null

    ids: Record<string, RegExp> = {
        first_name: new RegExp("^[A-Za-z0-9_-]{3,16}$"),
        second_name: new RegExp("^[A-Za-z0-9_-]{3,16}$"),
        email: new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$", "i"),
        phone: new RegExp("^[0-9_-]{3,16}$"),
        password: new RegExp("[a-z0-9_-]{3,16}$"),
        login: new RegExp("^[A-Za-z0-9_-]{3,16}$")
    }

    userData: Record<string, string> = {}

    constructor(){
            this.un__form=document.querySelector(".un__form")
            if(this.un__form!==null){
                this.getInputs()
                this.un__form.addEventListener('submit',(e:Event)=>{
                    e.preventDefault()
                    this.validSubmit()
                })
            }
    }

    getInputs(){
        if(this.un__form){
            this.inputs=this.un__form.querySelectorAll('.un__form > input')
            this.validFocus(this.inputs)
            this.validBlur(this.inputs)
            this.validKeyup(this.inputs)
        }
    }

    validSubmit(){
        if(this.inputs!==null&&this.inputs!==undefined){
            this.inputs.forEach((input:HTMLInputElement)=>{
                let result = input.value.match(this.ids[input.name])
                if(result==null){
                    this.addInputError(input)
                    console.log(input.name,"submit: false", input.value)
                }else{
                    this.removeInputError(input)
                    console.log(input.name,"submit: true", input.value)
                    this.userData[input.name]=input.value
                    if(this.inputs?.length==Object.keys(this.userData).length){
                        console.log(this.userData)
                    }
                }
            })
        }
    }

    validFocus(inputs:NodeListOf<Element>|null){
        inputs?.forEach((input)=>{
            input.addEventListener('focus',(e:Event)=>{
              let input:HTMLInputElement=e.target as HTMLInputElement
              let result:string[]|null=input.value.match(this.ids[input.name])
                if(result==null){
                    console.log(input.name,"focus: false", input.value)
                }else{
                    console.log(input.name,"focus: true", input.value)
                }
            })
        })
    }

    validBlur(inputs:NodeListOf<Element>|null){
        inputs?.forEach((input)=>{
            input.addEventListener('blur',(e:Event)=>{
              let input:HTMLInputElement=e.target as HTMLInputElement
              let result:string[]|null=input.value.match(this.ids[input.name])
                if(result==null){
                    console.log(input.name,"blur: false", input.value)
                }else{
                    console.log(input.name,"blur: true", input.value)
                }
            })
        })
    }

    validKeyup(inputs:NodeListOf<Element>|null){
        inputs?.forEach((input)=>{
            input.addEventListener('keyup',(e:Event)=>{
              let input:HTMLInputElement=e.target as HTMLInputElement
              let result:string[]|null=input.value.match(this.ids[input.name])
                if(result==null){
                    this.addInputError(input)
                    console.log(input.name,"blur: false", input.value)
                }else{
                    this.removeInputError(input)
                    console.log(input.name,"blur: true", input.value)
                }
            })
        })
    }

    addInputError(input:HTMLInputElement){
        input.classList.add("error__input")
    }

    removeInputError(input:HTMLInputElement){
        if(input.classList.contains("error__input")){
            input.classList.remove("error__input")
        }
    }

}