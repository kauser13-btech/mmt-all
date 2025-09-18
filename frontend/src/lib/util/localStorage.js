"use client";
const localStorage = {
     setItem(name, value){
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(name,(value));
        }
    },

     getItem(name){
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem(name);
        }
        return null;
    }

}

export default localStorage;