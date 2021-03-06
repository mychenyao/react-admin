import React, {Component} from 'react';
import echarts from 'echarts'
import './style.css'
import { connect } from 'dva'

class Order extends Component {
    componentDidMount() {
        let myChart = echarts.init(this.refs.main)
        var data = [];

        for (var i = 0; i <= 360; i++) {
                var t = i / 180 * Math.PI;
                var r = Math.sin(2 * t) * Math.cos(2 * t)
                data.push([r, i])
        }
       let option = {
            title: {
                text: '极坐标双数值轴'
            },
            legend: {
                data: ['line']
            },
            polar: {
                center: ['50%', '54%']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            angleAxis: {
                type: 'value',
                startAngle: 0
            },
            radiusAxis: {
                min: 0
            },
            series: [{
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data
            }],
            animationDuration: 2000
        }
        myChart.setOption(option)
    }
    render() {
        return (
            <div>
               <div className={'echarts_main'} ref='main'>
               </div>
            </div>
        );
    }
}

export default connect(({ order }) => ({
    order
  }))(Order);