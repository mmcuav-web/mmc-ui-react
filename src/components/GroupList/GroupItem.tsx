import React, { FC } from "react";
import classNames from "classnames";
import type { GroupEntity } from "./GroupList"

export interface GroupItemProps {
    data: GroupEntity
}

export const GroupItem: FC<GroupItemProps> = (props) => {

    const className = classNames({
        "mmc-group-item": true
    })

    const { data } = props

    return (
        <div className={className}>
            <div className="mmc-group-item__header-wrapper">
                <div className="mmc-group-item__header">
                    <div className="icon"></div>
                    <div className="name">{data.group_name}</div>
                </div>
            </div>
            <div className="mmc-group-item__children-wrapper">
                {data.children?.map(item => (<GroupItem data={item} key={item.group_id} />))}
            </div>
        </div>
    )
}