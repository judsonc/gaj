import React from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
//icones
import ActionGrade from 'material-ui/svg-icons/action/grade';

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open})

    handleClose = () => this.setState({open: false})

    render() {
        return (
            <div>
                <AppBar
                    title="Garçom a jato"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <List>
                        <Link to={'/'}>
                            <ListItem primaryText="Introdução" leftIcon={<ActionGrade />} onTouchTap={this.handleClose} />
                        </Link>
                        <Link to={'/video2'}>
                            <ListItem primaryText="Benefícios" leftIcon={<ActionGrade />} onTouchTap={this.handleClose} />
                        </Link>
                    </List>
                </Drawer>
                {this.props.children}
            </div>
        )
    }
}
