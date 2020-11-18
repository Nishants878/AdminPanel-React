import React from 'react';
import classes from './bar.module.css';
import {Chart} from "react-chartjs-2";


class barchart extends React.Component{
    constructor(props){
        super(props);
        this.barCanvas = React.createRef();
    }

    componentDidMount(){
        if(this.props.data!=undefined){
            if(this.barCanvas.current!=null){
                const barCtx = this.barCanvas.current.getContext('2d')
                let barChart = new Chart(barCtx, {
                    type: 'horizontalBar',
                    data: {
                        labels: Object.keys(this.props.data.performance),
                        datasets:[{
                            data: Object.values(this.props.data.performance),
                            backgroundColor: Object.keys(this.props.data.performance),
                            showLine: true,
                            label: '# of Hits',
                            hoverBorderWidth: '0px'
                        }],
                    },
                    options: {
                        plugins: {
                            datalabels: {
                                display: false
                            }
                        },
                        legend: {
                            labels: {
                                fontColor: '#fff',
                                text: '#Hits'
                            },
                            text: '#Hits'
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    min: 20,
                                    fontColor: "#fff"
                                }
                            }],
                            yAxes: [{
                                barPercentage: 0.25,
                                ticks: {
                                    fontColor: "#fff"
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Hits',
                                    fontColor: '#fff',
                                    fontSize: '15',
                                },
                            }],
                        },
                        hover: {
                            mode: 'index',
                            intersect: false
                        }
                    }

                })
            }
        }
    }

    render(){

        if(this.barCanvas.current!=null){
            const barCtx = this.barCanvas.current.getContext('2d')
            let barChart = new Chart(barCtx, {
                type: 'horizontalBar',
                data: {
                    labels: Object.keys(this.props.data.performance),
                    datasets:[{
                        data: Object.values(this.props.data.performance),
                        backgroundColor: Object.keys(this.props.data.performance),
                        showLine: true,
                        label: '# of Hits',
                        hoverBorderWidth: '0px'
                    }],
                },
                options: {
                    plugins: {
                        datalabels: {
                            display: false
                        }
                    },
                    legend: {
                        labels: {
                            fontColor: '#fff',
                            text: '#Hits'
                        },
                        text: '#Hits'
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 20,
                                fontColor: "#fff"
                            }
                        }],
                        yAxes: [{
                            barPercentage: 0.25,
                            ticks: {
                                fontColor: "#fff"
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Hits',
                                fontColor: '#fff',
                                fontSize: '15',
                            },
                        }],
                    },
                    hover: {
                        mode: 'index',
                        intersect: false
                    }
                }

            })
        }
      
        return (
            <div className={`${classes.canvasesWrapper}`}>
                <canvas ref={this.barCanvas}></canvas>
            </div>
        )
    }
    
}

export default barchart;