import React from 'react';
import classNames from 'classnames';
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
        }.bind(this);
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
    render: function () {
        var link;
        if (this.props.data.type === "champion") {
            link = "/league/champion/" + this.props.data.name.toLowerCase();
        } else if (this.props.data.type === "channel") {
            link = "/league/channel/" + this.props.data.name;
        }

        return (
            <div>
                <Link to={link}>

                    <img src={this.props.data.logo}/>
                    <span>{this.props.data.name}</span>
                </Link>

            </div>
        )
    }
})

var Results = React.createClass({
    render: function () {
        var results = this.props.results.map(function (item) {
            return <Result data={item} />
        });

        return (
            <div>
                {results}
            </div>
        );
    }
});



export default React.createClass({
    getInitialState: function () {
        return {
            results: null
        }
    },
    search: function (query) {
        Catgetories.search(query).then(function (results) {
            console.log(results);
            this.setState({
                results: results
            });
        }.bind(this));
    },
    render: function () {
        return (
            <div className={classNames({
                open: this.state.results
            })}>
                <Input search={this.search}/>
                { this.state.results ? <Results results={this.state.results}/> : ''}
            </div>
        );
    }
});
