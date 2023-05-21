class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '0'
        };
    }


    handleNum = (e) => {
        const num = e.target.textContent;
        const { display } = this.state;

        if (display === '0') {
            this.setState({ display: num });
        } else {
            this.setState({ display: display + num })
        }
    }

    handleReset = () => {
        this.setState({ display: '0' })
    }

    handleOperator = (e) => {
        const operator = e.target.textContent;
        const { display } = this.state;

        if (display !== '0') {
            this.setState({ display: display + ' ' + operator + ' ' });

            const update = display.split(' ').join('');
            const beforeLastChar = update.charAt(update.length - 2);
            const lastChar = update.charAt(update.length - 1);
            const beforeLastCharIsOperator = /[+\-*/]/.test(beforeLastChar);
            const lastCharIsOperator = /[+\-*/]/.test(lastChar);

            if (
                (lastCharIsOperator && operator !== '-') ||
                (beforeLastCharIsOperator && lastCharIsOperator)
            ) {
                if (beforeLastCharIsOperator) {
                    const updated = `${update.substring(0, update.length - 2)} ${operator} `;
                    this.setState({ display: updated });
                } else {
                    this.setState({ display: `${update.substring(0, update.length - 1)} ${operator} ` });
                }
            } else {
                this.setState({ display: `${update} ${operator} ` });
            }
        }
    };
    handleEqual = () => {
        const { display } = this.state;
        const result = eval(display).toString();
        this.setState({ display: result })
    }
    handleDecimal = () => {
        const { display } = this.state;
        const arr = display.split(' ');
        const lastElem = arr.at(-1);
        if (!lastElem.includes('.')) {
            this.setState({ display: display + '.' })
        }
    }


    render() {
        const { display } = this.state;

        return (
            <div className="App">
                <div id="display">{display}</div>
                <div onClick={this.handleReset} id="clear">AC</div>
                <div onClick={this.handleOperator} id="divide">/</div>
                <div onClick={this.handleOperator} id="multiply">*</div>
                <div onClick={this.handleNum} id="seven">7</div>
                <div onClick={this.handleNum} id="eight">8</div>
                <div onClick={this.handleNum} id="nine">9</div>
                <div onClick={this.handleOperator} id="subtract">-</div>
                <div onClick={this.handleNum} id="four">4</div>
                <div onClick={this.handleNum} id="five">5</div>
                <div onClick={this.handleNum} id="six">6</div>
                <div onClick={this.handleOperator} id="add">+</div>
                <div onClick={this.handleNum} id="one">1</div>
                <div onClick={this.handleNum} id="two">2</div>
                <div onClick={this.handleNum} id="three">3</div>
                <div onClick={this.handleEqual} id="equals">=</div>
                <div onClick={this.handleNum} id="zero">0</div>
                <div onClick={this.handleDecimal} id="decimal">.</div>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));