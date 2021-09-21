export default function localStorageClear(){
    const lang = localStorage.getItem("lang")
    localStorage.clear()
    localStorage.setItem("lang", lang)
}