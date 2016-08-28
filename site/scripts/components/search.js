import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import {camelCase} from '../util';
import Catgetories from '../catgetories';

var Input = React.createClass({
    getInitialState: function () {
        return {
            query: '',
            display: null,
            focus: false
        };
    },
    handleChange: function (e) {
        var value = e.target.value;
        this.setState({query: value});
        this.props.resetResults();
        setTimeout(() => {
            if (value === this.state.query) {
                this.search();
            }
        }, 1000);
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
    blur: function () {
        this.setState({
            focus: false
        });
        this.props.resetResults();
    },
    componentDidMount: function () {
        this.props.setClear(() => {
            this.setState({
                query: '',
                display: null,
                focus: false
            });
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
                        onBlur={this.blur}
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
            results: null,
            clear: () => {}
        }
    },
    search: function (query) {
        Catgetories.search(query).then(function (results) {
            this.setState({
                results: results
            });
        }.bind(this));
    },
    setClear: function (fn) {
        this.setState({
            clear: fn
        });
    },
    resetResults: function () {
        this.setState({results: null});
    },
    resetAndClear: function () {
        this.state.clear();
        this.resetResults();
    },
    render: function () {
        return (
            <div className={classNames({
                'category-search': true,
                open: this.state.results
            })}>
                <Input search={this.search} resetResults={this.resetResults} setClear={this.setClear}/>
                { this.state.results ? <Results results={this.state.results} close={this.resetAndClear}/> : ''}
            </div>
        );
    }
});
