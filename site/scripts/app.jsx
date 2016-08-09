var GameSummary = React.createClass({
  render: function() {
    return (
        <div className="game-summary">
            Game Summary
        </div>
    );
  }
});

var ProfileSummery = React.createClass({
  render: function() {
    return (
        <div className="profile-summary">
            {[<GameSummary />, <GameSummary />]}
        </div>
    );
  }
});

ReactDOM.render(
  <ProfileSummery />,
  document.getElementById('profile-summary')
);
