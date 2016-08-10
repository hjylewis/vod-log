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

var Logo = React.createClass({
  render: function() {
    return (
        <span className="logo">VOD-LOG</span>
    );
  }
});

var Search = React.createClass({
  render: function() {
    return (
        <span className="search">Search</span>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
        <div className="header">
            <Logo />
            <Search />
        </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
        <div>
            <Header />
            <div className="main">
                <GameLog />
            </div>
        </div>
    );
  }
});



ReactDOM.render(
  <App />,
  document.getElementById('app')
);
