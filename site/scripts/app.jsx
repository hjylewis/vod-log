
var game_data = data.dev.store.matches;
var first_ten = Object.keys(game_data).splice(0,10);
var new_game_data = {};
first_ten.forEach(function (key) {
    new_game_data[key] = game_data[key];
});
game_data = new_game_data;
console.log(game_data);


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
