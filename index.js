const tags = {
    input: document.querySelector('.input'),
    ul: document.querySelector('ul'),
    checkbox: document.querySelector('#flexSwitchCheckChecked'),
    addButton: document.querySelector('.btn'),
    readonly: true,
    allTags: [],
    init () {
        const getTagsFromLocalStorage = localStorage.getItem("tags")
        if(getTagsFromLocalStorage){
            allTags = getTagsFromLocalStorage.split(",")
            allTags.map((tag)=> {
                this.ul.insertAdjacentHTML('beforeend', tags.createTag(tag))
            }
        )}else{
            allTags = []
        }
        this.checkbox.addEventListener('change', () => {
            this.readonlyMode()
        })
    },
    // Получение списка тегов
    get tagsArray(){
        return allTags
    },
    // Установка нового списка тегов
    set tagsArray(newTagsArray){
        allTags = newTagsArray
        this.addToLocalStorage(allTags)
    },
    // Добавление нового тега
    setTag(newTag){
        allTags.push(newTag)
        this.addToLocalStorage(allTags)
    },
    // Удаление тега
    removeTag(remTag){
        const parentRemTag = remTag.parentNode
        const ulTag = parentRemTag.parentNode
        const tagIndex = Array.prototype.indexOf.call(parentRemTag.parentElement.children, parentRemTag)
        ulTag.removeChild(parentRemTag)
        allTags.splice(tagIndex, 1)
        this.addToLocalStorage(allTags)
    },
    // Добавление тегов в LocalStorage
    addToLocalStorage(items, tags = "tags"){
        localStorage.setItem(tags, items)
    },
    // Получение значения тега из инпута
    getInputValue() {
        if(this.input.value !== ''){
            this.setTag(this.input.value)
            this.ul.insertAdjacentHTML('beforeend', tags.createTag(this.input.value))
            this.input.value = ""
        }
    },
    // Режим только для чтения
    readonlyMode(){
        this.readonly = !this.readonly
        const closeButtons = document.querySelectorAll('.btn-close')
        closeButtons.forEach(but => but.classList.toggle('d-none'))
        if(this.readonly){
            this.addButton.removeAttribute('disabled')
        }else{ 
            this.addButton.setAttribute('disabled', true)
        }
    },

    createTag(tagValue){
        return `<li class="list-group-item">
                    <span>${tagValue}</span>
                    <button type="button" class="btn-close" onclick="tags.removeTag(this)" aria-label="Close"></button>
                </li>`
    }
}
document.addEventListener("DOMContentLoaded", tags.init())