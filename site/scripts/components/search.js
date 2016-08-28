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
        this.props.showResults();
    },
    componentDidMount: function () {
        this.props.setClear(() => {
            this.setState({
                query: '',
                display: null,
                focus: false
            });
        });

        this.props.setBlur(() => {
            this.setState({
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
            <div className={classNames({
                results: true,
                dropdown: true,
                hide: this.props.hide
            })}>
                {results}
            </div>
        );
    }
});



export default React.createClass({
    getInitialState: function () {
        return {
            results: null,
            hide: true,
            clear: null,
            blur: null
        }
    },
    componentDidMount: function () {
        window.addEventListener('mousedown', this.pageClick, false);
    },
    pageClick: function (e) {
        if (this.mouseIsDownOnSearch) {
            return;
        }

        this.hideResults();
        if (this.state.blur) this.state.blur();
    },
    search: function (query) {
        Catgetories.search(query).then(function (results) {
            this.setState({
                hide: false,
                results: results
            });
        }.bind(this));
    },
    // Clear function clears input
    setClear: function (fn) {
        this.setState({
            clear: fn
        });
    },
    // Blur function reduces search input
    setBlur: function (fn) {
        this.setState({
            blur: fn
        });
    },
    // Hides results
    resetResults: function () {
        this.setState({
            results: null,
            hide: true
        });
    },
    // Clears input AND Hides Results
    resetAndClear: function () {
        if (this.state.clear) this.state.clear();
        this.resetResults();
    },
    hideResults: function () {
        this.setState({ hide: true });
    },
    showResults: function () {
        this.setState({ hide: false });
    },
    onMouseDown: function () {
        this.mouseIsDownOnSearch = true;
    },
    onMouseUp: function () {
        this.mouseIsDownOnSearch = false;
    },
    render: function () {
        return (
            <div className={classNames({
                    'category-search': true,
                    open: this.state.results
                })}
                ref="categorySearch"
                onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}
            >
                <Input
                    search={this.search}
                    resetResults={this.resetResults}
                    showResults={this.showResults}
                    hideResults={this.hideResults}
                    setClear={this.setClear}
                    setBlur={this.setBlur}
                />
                { this.state.results ? <Results results={this.state.results} hide={this.state.hide} close={this.resetAndClear}/> : ''}
            </div>
        );
    }
});
