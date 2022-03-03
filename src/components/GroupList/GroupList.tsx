import React, { FC, useContext, useEffect } from "react"
import classNames from "classnames"
import { useGroupList, GroupListContext } from "./useGroupList"
import { GroupItem } from "./GroupItem"

export interface DeviceEntity {
    device_h_id: string,
    device_name: string,
    location?: boolean,
    airway?: boolean,
    video?: boolean,
    control?: boolean
}

export interface GroupEntity {
    group_id: string,
    group_name: string,
    parent_id: string,
    children?: GroupEntity[],
    collapse?: boolean,
    devices?: DeviceEntity[]
}

export interface GroupListProps {
    /** GroupEntity 详情见 Entity desc 部分 */
    data: GroupEntity[],
}

export const GroupList: FC<GroupListProps> = (props) => {

    const className = classNames({
        "mmc-group-list": true
    })

    const initState = useGroupList(props.data)

    return (
        <div className={className}>
            <GroupListContext.Provider value={initState}>
                {
                    initState.list.map(item => <GroupItem data={item} key={item.group_id} />)
                }
            </GroupListContext.Provider>
        </div>
    )
}