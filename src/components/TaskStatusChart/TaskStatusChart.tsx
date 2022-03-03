import React, { FC, useEffect, useRef } from "react"
import classNames from "classnames"
import { Chart } from '@antv/g2';

export type ChartType = "Line" | "Bar" | "Pie"

export interface AxisXCfg {
    fontSize?: number,
    fontColor?: string,
    axisColor?: string,
    barColor?: string
}

export interface AxisYCfg {
    fontSize?: number,
    fontColor?: string,
    axisColor?: string
}

export interface TaskStatusEntity {
    label: string,
    status?: number,
    value: number
}

export interface TaskStatusChartProps {
    /** TaskStatusEntity 详情见 Entity desc 部分 */
    data: TaskStatusEntity[];
    /** 统计图类型 */
    type?: Exclude<ChartType, "Pie">;
    /** 高度 */
    height?: number;
    /** x 轴配置, AxisXCfg 详情见 Entity desc 部分 */
    axisXCfg?: AxisXCfg;
    /** x 轴配置, AxisYCfg 详情见 Entity desc 部分 */
    axisYCfg?: AxisYCfg;
}

export const TaskStatusChart: FC<TaskStatusChartProps> = (props) => {

    const { data, type, height, axisXCfg, axisYCfg } = props
    const containerRef = useRef<HTMLDivElement>(null)

    const className = classNames({
        "mmc-task-status-chart": true
    })

    /**
     * 渲染列表
     * @returns Chart
     */
    const renderChart = (): Chart => {

        const _data = data.map(item => ({ key: item.label, value: item.value }))
        const _type = type || "Line"

        const chart = new Chart({
            container: containerRef.current as HTMLDivElement,
            autoFit: true,
            height: height || 300
        });

        chart.data(_data);

        chart.axis("key", {
            label: {
                style: {
                    fill: axisXCfg?.fontColor,
                    fontSize: axisXCfg?.fontSize,
                    textAlign: "center",
                }
            },
            tickLine: null,
            line: {
                style: {
                    stroke: axisXCfg?.axisColor,
                },
            },
        });

        chart.axis("value", {
            label: {
                style: {
                    fill: axisYCfg?.fontColor,
                    fontSize: axisYCfg?.fontSize
                }
            },
            line: {
                style: {
                    stroke: axisXCfg?.axisColor
                },
            },
        });

        if (_type === "Line") {
            chart.scale({
                key: {
                    range: [0, 1],
                },
                value: {
                    min: 0,
                    nice: true,
                },
            });
            chart.line().position('key*value').label('value');
        } else if (_type === "Bar") {
            chart.scale('value', {
                nice: true,
            });
            // l(0) 0:#068CFF 1:#8F10FF'
            chart.interval().color(axisXCfg?.barColor || "#068CFF").position('key*value');
        }

        chart.render();

        return chart;
    }

    useEffect(() => {
        renderChart()
    }, [])

    return (
        <div className={className} ref={containerRef}></div>
    )
}