import {observable} from "mobx";

export default class AppStore {
    
    @observable
    data = {
        "title": "Test",
        "author": "Malik Aliyev",
        "age": "22"
    }

    constructor() {
        window.data = this.data;
    }
}