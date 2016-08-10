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
        var data = this.props.data;
        var log = Object.keys(data).map(function (matchID) {
            var summary = data[matchID]
            return (
                <GameSummary key={summary.id}/>
            )
        })
        return (
            <div className="game-log">
                <GameLogHead />
                <div className="game-log-body">
                    {log}
                </div>
            </div>
        );
    }
});
