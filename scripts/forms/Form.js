export class Form {

    constructor(form) {
        this.form = form;
    }

    cleanForm() {
        this.form.childNodes.forEach((children) => {
            if (children.nodeName === 'INPUT') {
                children.value = '';
            }
        })
    }

    validate() {
        this.form.childNodes.forEach((children) => {
            if (children.nodeName === 'INPUT') {
                if (children.validity.patternMismatch) {
                    children.nextElementSibling.textContent = `${children.getAttribute('data-error')}`;
                } else {
                    children.nextElementSibling.textContent = '';
                }
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }
}




