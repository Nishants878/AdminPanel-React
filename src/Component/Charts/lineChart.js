import React from 'react';
import classes from './line.module.css';
import {Chart} from "react-chartjs-2";


class linechart extends React.Component{
    constructor(props){
        super(props);
        this.lineCanvas = React.createRef();
    }

    componentDidMount(){
        if(this.props.data!=undefined){
            if(this.lineCanvas.current!=null){
                let LatestHits = this.props.data.latestHits;
                let dataInsideDatasets = [];
                let borderColor = ["#9966FF", "#4BC0C0", "#FF6384"];
                let monthsLabels ;
                Object.keys(LatestHits).map((item,pos)=>{
                    if(item!="months"){
                        const obj = {
                            label: item,
                            data: LatestHits[item],
                            fill: false,
                            borderColor: pos===3?borderColor[2]: borderColor[pos]
                        }
                        dataInsideDatasets.push(obj)
                    }
                    else monthsLabels = LatestHits[item]
                })
               const lineCtx = this.lineCanvas.current.getContext('2d');
               let chart = new Chart(lineCtx, {
                   type: 'line',
                   data: {
                       datasets: dataInsideDatasets,
                       labels: monthsLabels
                   },
                   options: {
                       responsive: true,
                       scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Hits',
                                fontColor: '#fff',
                                fontSize: '15',
                              },
                            ticks: {
                                beginAtZero: true,
                                fontColor: '#fff'
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: '#fff'
                            }
                        }],
                        },
                        legend: {
                            labels: {
                                fontColor: "#fff",
                            },
                            position: 'top',
    
                        },
                        plugins: {
                            datalabels:{
                                display: false,
                            }
                        }
                    }
                   
               })
            }
        }
    }

    render(){
        if(this.lineCanvas.current!=null){
            let LatestHits = this.props.data.latestHits;
            let dataInsideDatasets = [];
            let borderColor = ["#9966FF", "#4BC0C0", "#FF6384"];
            let monthsLabels ;
            Object.keys(LatestHits).map((item,pos)=>{
                if(item!="months"){
                    const obj = {
                        label: item,
                        data: LatestHits[item],
                        fill: false,
                        borderColor: pos===3?borderColor[2]: borderColor[pos]
                    }
                    dataInsideDatasets.push(obj)
                }
                else monthsLabels = LatestHits[item]
            })
           const lineCtx = this.lineCanvas.current.getContext('2d');
           let chart = new Chart(lineCtx, {
               type: 'line',
               data: {
                   datasets: dataInsideDatasets,
                   labels: monthsLabels
               },
               options: {
                   responsive: true,
                   scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Hits',
                            fontColor: '#fff',
                            fontSize: '15',
                          },
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#fff'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#fff'
                        }
                    }],
                    },
                    legend: {
                        labels: {
                            fontColor: "#fff",
                        },
                        position: 'top',

                    },
                    plugins: {
                        datalabels:{
                            display: false,
                        }
                    }
                }
               
           })
        }
        return (
            <div className={classes.canvasesWrapper}>
                <canvas className={classes.canvases} ref={this.lineCanvas} width="100%"></canvas>
            </div>
        )
    }
    
}
export default linechart;