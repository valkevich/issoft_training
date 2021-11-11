export class Form {

    constructor(form) {
        this.form = form;
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




