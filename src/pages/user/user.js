import React, {Component} from 'react'
import styles from './style.less'

export default class User extends Component {
    render() {
        return (
            <section>
                user
                <div className={styles.name}>
                    name
                </div>
            </section>
        );
    }
}
