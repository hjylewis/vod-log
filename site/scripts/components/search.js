import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import {camelCase} from '../util';
import Catgetories from '../catgetories';

var Caret = React.createClass({
    render: function () {
        return (
            <div className="dropdown-caret">
                <div className="caret-outer"></div>
                <div className="caret-inner"></div>
            </div>
        );
    }
});

var Input = React.createClass({
    getInitialState: function () {
        return {
            query: '',
            display: null,
            focus: false
        };
    },
    handleChange: function (e) {
        this.setState({query: e.target.value});
        this.props.resetResults();
    },
    search: function () {
        if (this.state.query.length > 0) {
            this.setState({display: this.state.query});
            this.props.search(this.state.query);
        }
    },
    clear: function () {
        this.setState({
            query: '',
            display: null,
            focus: false
        });
        this.props.resetResults();
    },
    focus: function () {
        this.setState({
            focus: true
        });
    },
    render: function () {
        var keyPress = function (e) {
            if (e.charCode === 13) {
                this.search();
            }
        }.bind(this);
        return (
            <div className={classNames({
                "input-container": true,
                focus: this.state.focus
            })}>
                <div className="input">
                    <input
                        value={this.state.query}
                        onChange={this.handleChange}
                        onKeyPress={keyPress}
                        onFocus={this.focus}
                        placeholder="Search"
                    >
                    </input>
                </div>

                <div className="input-button">
                    {this.state.query !== this.state.display ?
                        <span className="icon-search" onClick={this.search}></span> :
                        <span className="icon-cross" onClick={this.clear}></span>}
                </div>
            </div>
        );
    }
});

var Result = React.createClass({
    render: function () {
        var link = `/league/${this.props.data.type}/${this.props.data.name.toLowerCase()}`;
        var name = this.props.data.type === "role" ? camelCase(this.props.data.name).replace('Ad', 'AD') : camelCase(this.props.data.name);
        return (
            <Link to={link}>
                <div onClick={this.props.close} className="result">
                    {this.props.data.logo ? <img src={this.props.data.logo}/> : ''}
                    <div className="info">
                        <p>{name}</p>
                        <p className="type">{camelCase(this.props.data.type)}</p>
                    </div>
                </div>
            </Link>

        )
    }
})

var Results = React.createClass({
    render: function () {
        var results = this.props.results.map(function (item) {
            return <Result key={item.name} data={item} close={this.props.close} />
        }.bind(this));

        if (results.length === 0) {
            results = <div className="no-results">No results</div>
        }

        return (
            <div className="results">
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
                'category-search': true,
                open: this.state.results
            })}>
                <Input search={this.search} resetResults={this.resetResults}/>
                { this.state.results ? <Results results={this.state.results} close={this.resetResults}/> : ''}
            </div>
        );
    }
});
