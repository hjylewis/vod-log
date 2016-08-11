
var game_data = data;
console.log(data);


var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <div className="main">
                    <GameLog data={game_data}/>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
