import React from 'React';
import classNames from 'classNames';
import { Link } from 'react-router';

import Catgetories from '../catgetories';

var Input = React.createClass({
    getInitialState: function () {
        return {
            query: ''
        };
    },
    handleChange: function (e) {
        this.setState({query: e.target.value});
    },
    search: function () {
        this.props.search(this.state.query);
    },
    render: function () {
        var keyPress = function (e) {
            if (e.charCode === 13) {
                this.search();
            }
        };
        return (
            <div>
                <input
                    value={this.state.query}
                    onChange={this.handleChange}
                    onKeyPress={keyPress}
                >
                </input>
                <button onClick={this.search}></button>
            </div>
        );
    }
});

var Result = React.createClass({
    rendor: function () {
        var link;
        if (this.props.data.type === "champion") {
            link = "/league/champion/" + this.props.data.name.toLowerCase();
        } else if (this.props.data.type === "channel") {
            link = "/league/channel/" + this.props.data.channelID;
        }

        return (
            <Link to={link}>
                <div>
                    <img src={this.props.data.logo}/>
                    <span>{this.props.data.name}</span>
                </div>
            </Link>
        )
    }
})

var Results = React.createClass({
    rendor: function () {
        var results = this.props.results.map(function (item) {
            <Result data={item} />
        });

        return (
            {results}
        )
    }
});



var CategorySearch = React.createClass({
    getInitialState: function () {
        return {
            results: null
        }
    },
    search: function (query) {
        Catgetories.search(query).then(function (results) {
            this.setState({
                results: results
            });
        });
    },
    render: function () {
        <div className={classNames({
            open: this.state.results
        })}>
            <Input search={}/>
            <Results results={this.state.results}/>
        </div>
    }
});
