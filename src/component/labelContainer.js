import React, {Component} from 'react';

export default class labelContainer extends Component {
    render() {
        return (
            <section className={'label_container'}>
                <span className={'label'}>
                    {this.props.label}
                </span>
                {
                    this.props.children
                }
            </section>
        );
    }
}
