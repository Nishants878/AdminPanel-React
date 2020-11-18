import React from 'react';
import classes from './pieChart.module.css';
import {Chart} from "react-chartjs-2";

class piechart extends React.Component{
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount(){
        if(this.props.data!=undefined){
            if(this.canvasRef.current!=null){
                let storage = this.props.data.storage;
                let data = Object.values(storage).map(item=>{
                    return item
                })
                let labels = Object.keys(storage).map((item,pos)=>{
                    return item.charAt(0).toUpperCase() + item.slice(1,) + " Storage" + ` ${data[pos]}(GB)`
                })
                let ctx = this.canvasRef.current.getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: data,
                            backgroundColor: ['#A8D582', '#4ED6B8', '#F7604D']
                        }],
                        labels: labels
                    },
                    options: {
                        responsive: true,
                        legend: {
                            labels: {
                                fontColor: "#fff",
                            },
                            position: 'top',
                        },
                        plugins: {
                            datalabels: {
                                color: '#fff'  ,
                                anchor: 'end',
                                align: 'start',
                                offset: -20,
                                borderWidth: 2,
                                borderColor: '#fff',
                                borderRadius: 25,
                                backgroundColor: (context)=>{
                                    return context.dataset.backgroundColor;
                                },
                                font: {
                                    weight: 'bold',
                                    size: '10'
                                },
                                formatter: (value) =>{
                                    return value + ' GB'
                                }
                            }
                        }
                    }
                })
        }
        }
    }

    render(){
        if(this.canvasRef.current!=null){
                let storage = this.props.data.storage;
                let data = Object.values(storage).map(item=>{
                    return item
                })
                let labels = Object.keys(storage).map((item,pos)=>{
                    return item.charAt(0).toUpperCase() + item.slice(1,) + " Storage" + ` ${data[pos]}(GB)`
                })
                let ctx = this.canvasRef.current.getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: data,
                            backgroundColor: ['#A8D582', '#4ED6B8', '#F7604D']
                        }],
                        labels: labels
                    },
                    options: {
                        responsive: true,
                        legend: {
                            labels: {
                                fontColor: "#fff",
                            },
                            position: 'top',
                        },
                        plugins: {
                            datalabels: {
                                color: '#fff'  ,
                                anchor: 'end',
                                align: 'start',
                                offset: -20,
                                borderWidth: 2,
                                borderColor: '#fff',
                                borderRadius: 25,
                                backgroundColor: (context)=>{
                                    return context.dataset.backgroundColor;
                                },
                                font: {
                                    weight: 'bold',
                                    size: '10'
                                },
                                formatter: (value) =>{
                                    return value + ' GB'
                                }
                            }
                        }
                    }
                })
        }
        return (
            <div className={classes.canvasesWrapper}>
                <canvas ref={this.canvasRef}></canvas>
            </div>
        )
    }
    
}

export default piechart;