
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
