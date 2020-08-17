class HelloWorld extends React.Component {
    render() {
        return <div>
            <h1>Hello World</h1>
            <p>Testing React Component</p>
            </div>;
    }
}

const containerElement = document.getElementById('content');
ReactDOM.render(<HelloWorld />, containerElement);