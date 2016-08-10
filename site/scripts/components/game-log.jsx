var GameSummary = React.createClass({
  render: function() {
    return (
        <div className="game-summary">
            Game Summary
        </div>
    );
  }
});

var GameLogHead = React.createClass({
  render: function() {
    return (
        <div className="game-log-head">
            Log head
        </div>
    );
  }
});

var GameLog = React.createClass({
  render: function() {
    return (
        <div className="game-log">
            <GameLogHead />
            <div className="game-log-body">
                {[<GameSummary />, <GameSummary />]}
            </div>
        </div>
    );
  }
});
