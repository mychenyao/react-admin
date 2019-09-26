import React, {Component} from 'react';
// import './style.css
import { connect } from 'dva'

class Pay extends Component {

    render() {
        return (
            <section>
                <p className='class_name_chen'> 财务</p>
                <p className='class_name_chen'> 财务</p>
                <p className='class_name_chen'> 财务</p>
                <p className='class_name_chen'> 财务</p>
                <p className='class_name_chen'> 财务</p>
                <p className='class_name_chen'> 财务</p>


                <p className='class_name_chen'> 财务</p>
                <p className='class_name_chen'> 财务</p>
                <p className='class_name_chen'> 财务</p>    <p className='class_name_chen'> 财务</p>

                <p className='class_name_chen'> 财务</p>
                    <p className='class_name_chen'> 财务</p>
                    <p className='class_name_chen'> 财务</p>
                    <p className='class_name_chen'> 财务</p>
                    <p className='class_name_chen'> 财务</p>
                    <p className='class_name_chen'> 财务</p>

                        <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p> 


                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务</p>
                            <p className='class_name_chen'> 财务33</p>

            </section>
        );
    }
}
export default connect(({ pay }) => ({
    pay
  }))(Pay);