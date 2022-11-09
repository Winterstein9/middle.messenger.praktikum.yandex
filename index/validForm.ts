export default class ValidForm{
    un__form:HTMLFormElement|null|any
    inputs:NodeListOf<Element>|null|undefined

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
                this.un__form.addEventListener('submit',(e:any)=>{
                    e.preventDefault()
                    this.validSubmit()
                })
            }
    }

    getInputs(){
        this.inputs=this.un__form.querySelectorAll('.un__form > input')
        this.validFocus(this.inputs)
        this.validBlur(this.inputs)
    }

    validSubmit(){
        if(this.inputs!==null&&this.inputs!==undefined){
            this.inputs.forEach((input:HTMLInputElement)=>{
                let result = input.value.match(this.ids[input.name])
                if(result==null){
                    console.log(input.name,"submit: false", input.value)
                }else{
                    console.log(input.name,"submit: true", input.value)
                    this.userData[input.name]=input.value
                    if(this.inputs?.length==Object.keys(this.userData).length){
                        console.log(this.userData)
                    }
                }
            })
        }
    }

    validFocus(inputs:NodeListOf<Element>|null|undefined){
        inputs?.forEach((input)=>{
            input.addEventListener('focus',(e:any)=>{
                let result = e.target.value.match(this.ids[e.target.name])
                if(result==null){
                    console.log(e.target.name,"focus: false", e.target.value)
                }else{
                    console.log(e.target.name,"focus: true", e.target.value)
                }
            })
        })
    }

    validBlur(inputs:NodeListOf<Element>|null|undefined){
        inputs?.forEach((input)=>{
            input.addEventListener('blur',(e:any)=>{
                let result = e.target.value.match(this.ids[e.target.name])
                if(result==null){
                    console.log(e.target.name,"blur: false", e.target.value)
                }else{
                    console.log(e.target.name,"blur: true", e.target.value)
                }
            })
        })
    }
}