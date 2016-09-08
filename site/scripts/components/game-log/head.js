import React from 'react';
import classNames from 'classnames';
import {camelCase} from '../../util.js';
import DefaultImg from '../defaultImg';
import EmailSignup from '../emailSignup';

var GameLogHead = React.createClass({
    getInitialState: function () {
        return {expanded: false};
    },
    expandToggle: function () {
        this.setState({expanded: !this.state.expanded});
    },
    render: function() {
        var classes = classNames(this.props.type, {
            "game-log-head": true,
            "empty": this.props.empty
        });
        var accounts = (this.props.headData.accounts || []).map(function (account, index) {
            return (
                <li key={index}>{account}</li>
            )
        });
        var shortAccounts;
        if (accounts.length > 4) {
            shortAccounts = accounts.slice(0,3);
            shortAccounts.push(<a key="4" onClick={this.expandToggle}>...</a>);
            accounts.push(<a key={accounts.length} onClick={this.expandToggle}><em>(less)</em></a>);
        }

        var logo;
        if (this.props.headData.logo) {
            logo = <img className="logo" src={this.props.headData.logo} />;
        } else if (this.props.type === "channel") {
            logo = <DefaultImg />;
        } else {
            logo = null;
        }

        var name = this.props.headData.displayName || (this.props.headData.name ? camelCase(this.props.headData.name).replace('Ad', 'AD') : '');
        var nameElement = this.props.headData.url ? <a href={this.props.headData.url} target="_blank" rel="nofollow">{name}</a> : <span className="stripped">{name}</span>;
        var accountInfo = function () {
            if (accounts.length > 0 ) {
                return (
                    <span>
                        <div className="accounts">
                            <h3 className="accounts-header">Accounts</h3>
                            <ul>
                                {shortAccounts && !this.state.expanded ? shortAccounts : accounts}
                            </ul>
                        </div>
                        <a className="suggestion" href="/suggestion"><em>Missing information?</em></a>
                    </span>
                )
            } else {
                return null;
            }
        }.bind(this);
        return (
            <div className={classes}>
                {logo}
                <div className={classNames({
                    info: true,
                    'no-logo': logo === null
                })}>
                    <h1>{nameElement}</h1>
                    <span className="champion-title">{camelCase(this.props.headData.championTitle)}</span>
                    {accountInfo()}
                    <EmailSignup />
                </div>
            </div>
        );
    }
});

export default GameLogHead
