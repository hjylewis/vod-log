var GameSummary = React.createClass({
  render: function() {
    return (
        <div className="game-summary">
            Game Summary
        </div>
    );
  }
});

var GameLog = React.createClass({
  render: function() {
    return (
        <div className="game-log">
            {[<GameSummary />, <GameSummary />]}
        </div>
    );
  }
});

ReactDOM.render(
  <GameLog />,
  document.getElementById('game-log')
);
