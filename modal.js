
const textModal = document.querySelector("#textModal")
const modal = document.querySelector(".modal")

export const RemoveModal = () => {
    modal.style.display = "none"
}


export const ShowModal = (text) => {
    modal.style.display = "flex"
    textModal.innerText = text
}

