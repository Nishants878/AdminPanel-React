import React from 'react';
import classes from './dashboard.module.css';
import {Chart} from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import {connect} from 'react-redux';
import PieChart from '../../Component/Charts/pieChart';
import LineChart from '../../Component/Charts/lineChart';
import BarChart from '../../Component/Charts/barChart';

class dashboard extends React.Component{
    constructor(props){
        super(props);
        this.barCanvas = React.createRef();
    }


    handleClassSpan(){

    }

    render(){
        let propT = this.props.allData.dasbhoardPage
        let torenderNotification = [];
        let toRenderOrderList = [];
        if(propT!=undefined){
            for(let i=0; i<3; i++){
            let newArr = propT.notifications.map(item=>{
                return(
                    <div className={classes.testDiv}>
                        <img src={item.pic} className={classes.image}/>
                        <div className={classes.descDiv}>
                            <p className={classes.desc}>{item.message}</p>
                            <p className={classes.time}>{item.time} ago.</p>
                        </div>
                    </div>
                )
            })
            torenderNotification.push(...newArr)
            }

            toRenderOrderList = propT.orders.map(item=>{
                return (
                    <tr>
                        <td className={classes.orderNo}>{`#${item.orderNo}`}</td>
                        <td className={classes.status}><p className={`${classes.spanPara} ${classes[item.status]}`}></p>{item.status}</td>
                        <td className={classes.oper}>{item.operators}</td>
                        <td className={classes.location}>{item.location}</td>
                        <td className={classes.distance}>{item.distance}</td>
                        <td className={classes.data}>{item.startDate}</td>
                        <td className={classes.est}>{item.deliveryDate}</td>
                    </tr>
                )
            })

        }

        return(
            <div className={classes.mainDiv}>
                <div className={classes.lineChartWrapper}>
                    <h3 className={classes.chartH3}>Latest Hits</h3>
                    <LineChart data={this.props.allData.dasbhoardPage}/>
                </div>
                <div className={classes.barChartWrapper}>
                    <h3 className={classes.chartH3}>Performance</h3>
                    <BarChart data={this.props.allData.dasbhoardPage}/>
                </div>
                <div className={classes.chartWrapper}>
                    <h3 className={classes.chartH3}>Storage Information</h3>
                    <PieChart data={this.props.allData.dasbhoardPage}/>
                </div>
                <div className={classes.chartWrapper}>
                    <h3>Notification Lists</h3>
                    <div className={classes.notificationDivWrapper}>
                        <div className={classes.notificationDiv}>
                            {torenderNotification}
                        </div>
                    </div>
                </div>
                <div className={classes.orderListmainWrapper}>
                    <h3>Order List</h3>
                    <div className={classes.orderTableDiv}>
                    <table className={classes.mainTable} cellSpacing="0">
                        <tr className={classes.headingRow}>
                            <th>order no.</th>
                            <th>status</th>
                            <th>operators</th>
                            <th>location</th>
                            <th>distance</th>
                            <th>start data</th>
                            <th>est delivery date</th>
                        </tr>
                        {/* <tr>
                            <td className={classes.orderNo}>#122349</td>
                            <td className={classes.status}><p className={classes.colorSpan}></p>Moving</td>
                            <td className={classes.oper}>Oliver Trag</td>
                            <td className={classes.location}>London, UK</td>
                            <td className={classes.distance}>485 Km</td>
                            <td className={classes.data}>16:00, 12 NOV 2018</td>
                            <td className={classes.est}>08:00, 18 NOV 2018</td>
                        </tr> */}
                        {toRenderOrderList}
                    </table>
                    </div>
                </div>
            </div>
        );
        }
}

let getData = (globalStore)=>{
    return{
        allData: globalStore.wholeData.projectData
    }
}

export default connect(getData)(dashboard);