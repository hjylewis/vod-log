var ChampionImage = React.createClass({
    render: function () {
        return (
            <img className="champion-image" src={this.props.image}></img>
        )
    }
});

var SummonerSpells = React.createClass({
    render: function () {
        return (
            <div className="summoner-spells">
                <div className={this.props.spell1}/>
                <div className={this.props.spell2}/>
            </div>
        )
    }
});

var KeystoneImage = React.createClass({
    render: function () {
        return (
            <img className="keystone-image" src={this.props.image}></img>
        )
    }
});

var Items = React.createClass({
    render: function () {
        var items = this.props.items.map(function (item, i) {
            return (
                <img src={item} key={i}></img>
            )
        })
        var lastItem = items.pop();
        return (
            <div className="items">
                <span className="main-items">{items}</span>
                <span className="last-item">{lastItem}</span>
            </div>
        )
    }
});

var IconStrip = React.createClass({
    render: function () {
        return (
            <div className="icon-strip">
                <SummonerSpells spell1={this.props.player.spell1} spell2={this.props.player.spell2} />
                <KeystoneImage image={this.props.player.keystone.image} />
                <Items items={this.props.player.stats.items} />
            </div>
        )
    }
});

var GameSummary = React.createClass({
    onClick: function () {
        var url = this.props.data.video_url;

        // Open in new tab
        var win = window.open(url, '_blank');
        win.focus();
    },
    render: function() {
        var match_data = this.props.data.match_data;
        var player_data = match_data.player_data;

        var kda = `${player_data.stats.kills}/${player_data.stats.deaths}/${player_data.stats.assists}`;
        var duration = moment.duration(match_data.duration, 'seconds');
        var durationStr = duration.minutes() + "m " + duration.seconds() + "s";
        var creation = moment(match_data.creation).fromNow();
        var patch = /^[0-9]+\.[0-9]+/.exec(match_data.matchVersion);
        var lane = player_data.lane;
        if (lane === "BOTTOM") {
            lane = player_data.role.replace('DUO_', '');
        }
        lane = lane.charAt(0).toUpperCase() + lane.substr(1).toLowerCase();

        var outcome = match_data.win ? 'win' : 'loss';
        var classes = `game-summary ${outcome}`;
        return (
            <div onClick={this.onClick} className={classes}>
                <div className="summary-image">
                    <ChampionImage image={player_data.champion.image} />
                </div>
                <IconStrip player={player_data}/>
                <div className="summary-detail">
                    <p>Lane: {lane}</p>
                    <p>KDA: {kda}</p>
                    <p>Duration: {durationStr}</p>
                    <p>Creation: {creation}</p>
                    <p>Patch: {patch}</p>
                </div>
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
                <GameSummary key={summary.id} data={summary}/>
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
