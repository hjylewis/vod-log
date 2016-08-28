import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import Catgetories from '../catgetories';

var Input = React.createClass({
    getInitialState: function () {
        return {
            query: '',
            display: null
        };
    },
    handleChange: function (e) {
        this.setState({query: e.target.value});
        this.props.resetResults();
    },
    search: function () {
        this.setState({display: this.state.query});
        this.props.search(this.state.query);
    },
    clear: function () {
        this.setState({
            query: '',
            display: null
        });
        this.props.resetResults();
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
                {this.state.query !== this.state.display ?
                    <button onClick={this.search}>search</button> :
                    <button onClick={this.clear}>clear</button>}
            </div>
        );
    }
});

var Result = React.createClass({
    render: function () {
        var link = `/league/${this.props.data.type}/${this.props.data.name.toLowerCase()}`;

        return (
            <div>
                <Link to={link}>

                    {this.props.data.logo ? <img src={this.props.data.logo}/> : ''}
                    <span>{this.props.data.name}</span>
                </Link>

            </div>
        )
    }
})

var Results = React.createClass({
    render: function () {
        var results = this.props.results.map(function (item) {
            return <Result key={item.name} data={item} />
        });

        if (results.length === 0) {
            results = <span>No results</span>
        }

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
    resetResults: function () {
        this.setState({results: null});
    },
    render: function () {
        return (
            <div className={classNames({
                open: this.state.results
            })}>
                <Input search={this.search} resetResults={this.resetResults}/>
                { this.state.results ? <Results results={this.state.results}/> : ''}
            </div>
        );
    }
});
