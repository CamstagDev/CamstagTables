class CamstagTables {
    //import the file footers.js
    #table = document.createElement(`table`);
    #thead = document.createElement(`thead`);
    #tbody = document.createElement(`tbody`);
    #tfoot = document.createElement(`tfoot`);
    #rowsPerPage = 10;
    #currentPage = 1;
    #parent = null;
    #headers = [];
    #order = [];
    #data = [];
    #errors = {
        config: {
            configType: `Config must be an object`,
        },
        headers: {
            headersType: `Headers must be an array`,
            headersEmpty: `Headers array is empty`,
            headersElementType: `Header elements must be all strings`,
            headersElementEmpty: `Header element is empty`,
        },
        order: {
            orderType: `Order must be an array`,
            orderElementType: `Order elements must be all objects`,
            orderElementEmpty: `Order element is empty`,
            orderElementObjectNamePropery: `Order element object must have a property name`,
            orderElementObjectNameValue: `Order element object name property must be a string`,
            orderElementObjectDirectionPropery: `Order element object must have a property direction`,
            orderElementObjectDirectionValue: `Order element object direction property must be asc or desc`,
        },
        currentPage: {
            currentPageType: `Current page must be a number`,
            currentPageMin: `Current page must be greater than 0`,
        },
        rowsPerPage: {
            rowsPerPageType: `Rows per page must be a number`,
            rowsPerPageMin: `Rows per page must be greater than 0`,
        },
        data: {
            dataType: `Data must be an array`,
            dataElementType: `Data elements must be all objects`,
        },
        parent: {
            parentType: `Parent must be an element`,
        },
    };
    constructor(config) {
        if (config) {
            this.setConfig(config);
        }
    }

    /* Setters */
    setConfig(config) {
        try {
            if (typeof config !== `object`) {
                throw new Error(this.#errors.config.configType);
            }
        } catch (error) {
            console.error(error);
        }
        if (config.hasOwnProperty(`headers`)) {
            this.setHeaders(config.headers);
        }
        if (config.hasOwnProperty(`order`)) {
            this.setOrder(config.order);
        }
        if (config.hasOwnProperty(`currentPage`)) {
            this.setCurrentPage(config.currentPage);
        }
        if (config.hasOwnProperty(`rowsPerPage`)) {
            this.setRowsPerPage(config.rowsPerPage);
        }
        if (config.hasOwnProperty(`data`)) {
            this.setData(config.data);
        }
    }
    setHeaders(headers) {
        try {
            if (!Array.isArray(headers)) {
                throw new Error(this.#errors.headers.headersType);
            }
            if (headers.length === 0) {
                throw new Error(this.#errors.headers.headersEmpty);
            }
            headers.forEach((element) => {
                if (typeof element === `string`) {
                    if (element.length === 0) {
                        throw new Error(this.#errors.headers.headersElementEmpty);
                    }
                } else {
                    throw new Error(this.#errors.headers.headersElementType);
                }
            });
        } catch (error) {
            console.error(error);
            return false;
        }
        this.#headers = headers;
        return headers;
    }
    setOrder(order) {
        try {
            if (!Array.isArray(order)) {
                throw new Error(this.#errors.order.orderType);
            }
            order.forEach((element) => {
                if (typeof element === `object`) {
                    if (Object.keys(element).length === 0) {
                        throw new Error(this.#errors.order.orderElementEmpty);
                    }
                    if (!element.hasOwnProperty(`name`)) {
                        throw new Error(this.#errors.order.orderElementObjectNamePropery);
                    }
                    if (typeof element.name !== `string`) {
                        throw new Error(this.#errors.order.orderElementObjectNameValue);
                    }
                    if (!element.hasOwnProperty(`direction`)) {
                        throw new Error(this.#errors.order.orderElementObjectDirectionPropery);
                    }
                    if (element.direction !== `asc` && element.direction !== `desc`) {
                        throw new Error(this.#errors.order.orderElementObjectDirectionValue);
                    }
                } else {
                    throw new Error(this.#errors.order.orderElementType);
                }
            });
        } catch (error) {
            console.error(error);
            return false;
        }
        this.#order = order;
        return order;
    }
    setCurrentPage(currentPage) {
        try {
            if (typeof currentPage !== `number`) {
                throw new Error(this.#errors.currentPage.currentPageType);
            }
            if (currentPage < 1) {
                throw new Error(this.#errors.currentPage.currentPageMin);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
        this.#currentPage = currentPage;
        return currentPage;
    }
    setRowsPerPage(rowsPerPage) {
        try {
            if (typeof rowsPerPage !== `number`) {
                throw new Error(this.#errors.rowsPerPage.rowsPerPageType);
            }
            if (rowsPerPage < 1) {
                throw new Error(this.#errors.rowsPerPage.rowsPerPageMin);
            }
        } catch (error) {
            console.error(error);
        }
        this.#rowsPerPage = rowsPerPage;
        return rowsPerPage;
    }
    setData(data) {
        try {
            if (!Array.isArray(data)) {
                throw new Error(this.#errors.data.dataType);
            }
            data.forEach((element) => {
                if (typeof element !== `object`) {
                    throw new Error(this.#errors.data.dataElementType);
                }
            });
        } catch (error) {
            console.error(error);
        }
        this.#data = data;
        return data;
    }
    setParent(parent) {
        try {
            if (!(parent instanceof Element)) {
                throw new Error(this.#errors.parent.parentType);
            }
        } catch (error) {
            console.error(error);
        }
        this.#parent = parent;
        return this.#parent;
    }

    /* Getters */
    headers() {
        return this.#headers;
    }
    order() {
        return this.#order;
    }
    currentPage() {
        return this.#currentPage;
    }
    rowsPerPage() {
        return this.#rowsPerPage;
    }
    data() {
        return this.#data;
    }

    /* Methods */
    drawTable() {
        this.#drawTable();
        return this.#table;
    }
    #drawTable() {
        this.#table.innerHTML = ``;
        this.#table.setAttribute(`class`, `camstagtable`);
        this.#table.appendChild(this.#thead);
        this.#table.appendChild(this.#tbody);
        this.#drawHeader();
        this.#drawBody();
        this.#drawFooter();
        if (this.#parent) {
            this.#parent.innerHTML = ``;
            this.#parent.appendChild(this.#table);
        }
    }
    #drawHeader() {
        this.#thead.innerHTML = ``;
        let tr = document.createElement(`tr`);
        this.#headers.forEach((element) => {
            let th = document.createElement(`th`);
            th.innerHTML = element;
            tr.appendChild(th);
        });
        this.#thead.appendChild(tr);
    }
    #drawBody() {
        this.#tbody.innerHTML = ``;
        let start = (this.#currentPage - 1) * this.#rowsPerPage;
        let end = start + this.#rowsPerPage;
        let data = this.#data.slice(start, end);
        data.forEach((element) => {
            let tr = document.createElement(`tr`);
            this.#headers.forEach((header) => {
                let td = document.createElement(`td`);
                if (element.hasOwnProperty(header)) {
                    td.innerHTML = element[header];
                }
                tr.appendChild(td);
            });
            this.#tbody.appendChild(tr);
        });
    }
    #drawFooter() {
        const recordsPerPageSelector = this.createElementRecordsPerPageSelector();
        const pageChanger = this.createElementPageChanger();
        const footer = this.createElementFooter();

        const footerContainer = footer.querySelector("div");
        const pageSelector = recordsPerPageSelector.querySelector("select");
        const currentPage = pageChanger.querySelector("div span");

        footer.querySelector("tr td").setAttribute(`colspan`, this.#headers.length);

        pageChanger.querySelector(".arrow.left").addEventListener(`click`, () => {
            if (this.#currentPage > 1) {
                nextPage.disabled = this.#currentPage * this.#rowsPerPage >= this.#data.length;
                previousPage.disabled = this.#currentPage === 1;
                this.setCurrentPage(this.#currentPage - 1);
                this.#drawBody();
                currentPage.innerText = `${this.#currentPage}`;
            }
        });
        pageChanger.querySelector(".arrow.right").addEventListener(`click`, () => {
            if (this.#currentPage * this.#rowsPerPage < this.#data.length) {
                this.setCurrentPage(this.#currentPage + 1);
                this.#drawBody();
                nextPage.disabled = this.#currentPage * this.#rowsPerPage >= this.#data.length;
                previousPage.disabled = this.#currentPage === 1;
                currentPage.innerText = `${this.#currentPage}`;
            }
        });

        pageSelector.addEventListener(`change`, (event) => {
            this.setRowsPerPage(parseInt(event.target.value));
            this.#drawBody();
        });

        currentPage.innerText = `${currentPage.innerHTML} ${this.#currentPage}`;
        footerContainer.appendChild(recordsPerPageSelector);
        footerContainer.appendChild(pageChanger);
        this.#tfoot = footer;
        this.#table.appendChild(this.#tfoot);
    }

    changePage() {

    }

    /* Create Header Elements */
    createElementHeader() {
        let thead = document.createElement(`thead`);
        let tr = document.createElement(`tr`);
        let th = document.createElement(`th`);

        tr.appendChild(th);
        thead.appendChild(tr);
        return thead;
    }

    /* Create Footer Elements */
    createElementFooter() {
        let tfoot = document.createElement(`tfoot`);
        let div = document.createElement(`div`);
        let tr = document.createElement(`tr`);
        let td = document.createElement(`td`);

        td.appendChild(div);
        tr.appendChild(td);
        tfoot.appendChild(tr);
        return tfoot;
    }
    createElementRecordsPerPageSelector(options = [10, 20, 50, 100]) {
        let option = document.createElement(`option`);
        let select = document.createElement(`select`);
        let span = document.createElement(`span`);
        let div = document.createElement(`div`);

        select.setAttribute(`class`, `recordsPerPageSelector`);
        span.innerText = `Rows per page: `;
        div.appendChild(span);

        options.forEach((element) => {
            option = document.createElement(`option`);
            option.innerText = element;
            option.value = element;
            select.appendChild(option);
        });
        div.appendChild(select);
        return div;
    }
    createElementPageChanger() {
        let button, span;
        let div = document.createElement(`div`);

        button = document.createElement(`button`);
        button.innerText = ``;
        button.setAttribute(`class`, `arrow left`);
        div.appendChild(button);

        span = document.createElement(`span`);
        span.setAttribute(`class`, `pageNumber`);
        div.appendChild(span);

        button = document.createElement(`button`);
        button.innerText = ``;
        button.setAttribute(`class`, `arrow right`);
        div.appendChild(button);

        return div;
    }
}
