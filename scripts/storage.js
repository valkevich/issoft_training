let storage = localStorage;

function setItem(name, value) {
    storage.setItem(name, value)
}

function getItem(name) {
    return storage.getItem(name)
}

export { setItem, getItem }

export const SetStorage = (instance) => {
    storage = instance
}
