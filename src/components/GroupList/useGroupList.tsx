
import { createContext, useState } from "react"
import { DeviceEntity } from "."
import type { GroupEntity } from "./GroupList"

export interface GroupListState {
    list: GroupEntity[],
    collapse?: (data: GroupEntity) => void,
    device_location?: (data: DeviceEntity) => void,
    device_airway?: (data: DeviceEntity) => void,
    device_video?: (data: DeviceEntity) => void,
    device_control?: (data: DeviceEntity) => void,
}

export const useGroupList = (data: GroupEntity[]): GroupListState => {

    const [list, setList] = useState<GroupEntity[]>(data)

    const collapse = (data: GroupEntity) => {
        data.collapse = !data.collapse
        setList([...list])
    }

    const device_location = (data: DeviceEntity) => {
        data.location = !data.location
        setList([...list])
    }

    const device_airway = (data: DeviceEntity) => {
        data.airway = !data.airway
        setList([...list])
    }

    const device_video = (data: DeviceEntity) => {
        data.video = !data.video
        setList([...list])
    }

    const device_control = (data: DeviceEntity) => {
        data.control = !data.control
        setList([...list])
    }

    return {
        list,
        collapse,
        device_location,
        device_airway,
        device_video,
        device_control
    }
}

const initialState = {
    list: []
}

export const GroupListContext = createContext<GroupListState>(initialState)