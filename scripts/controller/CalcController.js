class CalcController {

	constructor() {
		this._operation = [];

		this._locale = "pt-BR";

		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");

		this._currentDate;

		this.initialize();
		this.initButtonsEvents();

	}

	initialize() {
		this.setDisplayDateTime();

		setInterval(() => {
			this.setDisplayDateTime();
		}, 1000)
	}

	// Funções de Eventos e Clicks

	clearAll() {
		this._operation = [];
	}

	clearEntry() {
		this._operation.pop();
	}

	getLastOperation() {
		return this._operation[this._operation.length - 1];
	}

	setLastOperation(value) {
		this._operation[this._operation.length - 1] = value;
	}

	isOperation(value) {
		return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
	}

	pushOperation(value) {
		this._operation.push(value);

		if (this._operation.length > 3) {

			this.calc();

		} 
	}
	calc() {
		let last = this._operation.pop();

		let result = eval(this._operation.join(""));
		
		this._operation = [result, last];

		this.setLastNumberToDisplay();
	}

	setLastNumberToDisplay() {
		let lastNumber;

		for (let i = this._operation.length - 1; i >= 0; i--) {
			if (!this.isOperation(this._operation[i])) {
				lastNumber = this._operation[i];
				break;
			}
		}

		this.displayCalc = lastNumber;
	}

	addOperation(value) {
		if (isNaN(this.getLastOperation())) {

			if (this.isOperation(value)) {

				this.setLastOperation(value);

			} else {
				this.pushOperation(value);

				this.setLastNumberToDisplay();
			} 

		} else {

			if (this.isOperation(value)) {
				
				this.pushOperation(value);	

			} else {

				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(newValue);

				this.setLastNumberToDisplay();
			}
		}

	}

	setError() {
		this.displayCalc = "Error";
	}

	execBtn(value) {
		switch (value) {
			case "ac":
				this.clearAll();
				break;
			case "ce":
				this.clearEntry();
				break;
			case "soma":
				this.addOperation("+");
				break;
			case "subtracao":
				this.addOperation("-");
				break;
			case "divisao":
				this.addOperation("/");
				break;
			case "multiplicacao":
				this.addOperation("*");
				break;
			case "porcento":
				this.addOperation("%");
				break;
			case "igual":
				
				break;
			case "ponto":
				this.addOperation(".");
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				this.addOperation(parseInt(value));
				break;
			default:
				this.setError();
				break;
		}
	}

	addEventListenerall(element, events, fn) {
		events.split(" ").forEach(event => {
			element.addEventListener(event, fn, false);
		})
	}

	initButtonsEvents() {
		let buttons = document.querySelectorAll("#buttons > g, #parts > g");
		buttons.forEach((btn, index) => {
			this.addEventListenerall(btn, "click drag", e => {
				let btnText = btn.className.baseVal.replace("btn-", "");
				this.execBtn(btnText);
			});
			this.addEventListenerall(btn, "mouseover mouseup mousedown", e => {
				btn.style.cursor = "pointer";
			})
		});
	}

	// Funcções de Hora e Data
		setDisplayDateTime() {
			this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
				day: "2-digit",
				month: "long",
				year: "numeric"
			});
			this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
		}

		get displayTime() {
			return this._timeEl.innerHTML;
		}

		set displayTime(value) {
			this._timeEl.innerHTML = value;	
		}

		get displayDate() {
			return this._dateEl.innerHTML;
		}

		set displayDate(value) {
			this._dateEl.innerHTML = value;
		}

		get displayCalc() {
			return this._displayCalcEl.innerHTML;
		}

		set displayCalc(value) {
			this._displayCalcEl.innerHTML = value;
		}

		get currentDate() {
			return new Date;
		}

		set currentDate(value) {
			this._currentDate = value;
		}
}