import React, { FC } from "react"
import classNames from "classnames"
import { GroupItem } from "./GroupItem"

export interface GroupEntity {
    group_id: string,
    group_name: string,
    parent_id: string,
    children?: GroupEntity[]
}

export interface GroupListProps {
    data: GroupEntity[],
}

export const GroupList: FC<GroupListProps> = (props) => {

    const className = classNames({
        "mmc-group-list": true
    })

    const { data } = props

    return (
        <div className={className}>
            {data.map(item => (<GroupItem data={item} key={item.group_id} />))}
        </div>
    )
}