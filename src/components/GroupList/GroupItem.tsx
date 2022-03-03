import React, { FC, useContext, useEffect } from "react";
import classNames from "classnames";
import type { GroupEntity } from "./GroupList"
import { GroupListContext } from "./useGroupList";
import { DeviceEntity } from ".";

export interface GroupItemProps {
    data: GroupEntity
}

export const GroupItem: FC<GroupItemProps> = (props) => {

    const { data } = props

    const { collapse, device_location, device_airway, device_video, device_control } = useContext(GroupListContext)

    const handle_collapse = () => {
        collapse && collapse(data)
    }

    let className = classNames({
        "mmc-group-item": true,
        "mmc-group-item--collapse": data.collapse
    })

    const renderDevice = (data: DeviceEntity) => {

        type Fn = {
            class_name: string,
            prop: keyof DeviceEntity,
            icon_class: string,
            handler?: (data: DeviceEntity) => void
        }

        const fns: Fn[] = [
            {
                class_name: "fn-wrapper",
                prop: "location",
                icon_class: "iconfont mmc-icon-position",
                handler: device_location
            },
            {
                class_name: "fn-wrapper",
                prop: "airway",
                icon_class: "iconfont mmc-icon-guiji",
                handler: device_airway
            },
            {
                class_name: "fn-wrapper",
                prop: "video",
                icon_class: "iconfont mmc-icon-video",
                handler: device_video
            },
            {
                class_name: "fn-wrapper",
                prop: "control",
                icon_class: "iconfont mmc-icon-kongzhi_xianxing",
                handler: device_control
            }
        ]

        return (
            <div key={data.device_h_id} className="mmc-group-item__device-wrapper">
                <div className="mmc-group-item__device-header">
                    <div className="mmc-group-item__device-name">
                        {data.device_name}
                    </div>
                    <div className="mmc-group-item__device-fns-wrapper">
                        {
                            fns.map(item => (
                                <div
                                    onClick={() => item.handler && item.handler(data)}
                                    className={classNames({
                                        [item.class_name]: true,
                                        [`${item.class_name}--${item.prop}`]: Boolean(data[item.prop])
                                    })}
                                >
                                    <div className={`${item.icon_class}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={className}>
            <div className="mmc-group-item__header-wrapper">
                <div className="mmc-group-item__header">
                    <div className="icon" onClick={handle_collapse}>
                        <div className="iconfont mmc-icon-menudown"></div>
                    </div>
                    <div className="name">{data.group_name}</div>
                </div>
            </div>
            <div className="mmc-group-item__children-wrapper">
                {data.children?.map(item => (<GroupItem data={item} key={item.group_id} />))}
                <div className="mmc-group-item__devices-wrapper">
                    {data.devices?.map(item => (renderDevice(item)))}
                </div>
            </div>
        </div>
    )
}