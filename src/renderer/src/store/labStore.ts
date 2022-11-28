import { defineStore } from 'pinia'
// import { IpcMain } from 'electron'
export interface Light {
    id: number
    name: string
    room: string
    automationBase: number
    automationGroup: number
    automationId: number
    automationType: string
}
export interface Blind {
    id: number
    name: string
    room: string
    automationBase: number
    automationGroup: number
    automationId: number
    automationType: string
}
export interface Projector {
    id: number
    name: string
    room: string
    automationType: string
    ipAddress: string
}
export interface Source {
    id: number
    name: string
    room: string
    automationType: string
    ipAddress: string
    label?: { labelName: string }
}
// source will contain labels as well

export interface LedRing {
    id: number
    name: string
    room: string
    automationBase: number
    automationGroup: number
    automationId: number
    associatedStation: number
    automationType: string
}
export const useLabStore = defineStore('Lab', {
    state: () => ({
        lights: [] as Light[],
        blinds: [] as Blind[],
        projectors: [] as Projector[],
        sources: [] as Source[],
        ledRings: [] as LedRing[],
        room: [] as string[]
    }),

    getters: {
        //doubleCount: (state) => state.count * 2,
    },
    actions: {
        addNewLight() {
            let newLight = {
                id: this.lights.length,
                name: '',
                room: '',
                automationBase: 0,
                automationGroup: 0,
                automationId: 0,
                automationType: 'cbus'
            }
            this.lights.push(newLight)
            // window.api.tryActivate()
        },
        addNewProjector() {
            let newProjector = {
                id: this.projectors.length + 201,
                name: '',
                room: '',
                automationType: 'cbus',
                ipAddress: ''
            }
            this.projectors.push(newProjector)
        },
        // unused due to directly writing json file with fs
        // downloadJSON() {
        //     this.lights['name'] = 'Lights'
        //     const data = JSON.stringify(this.lights)
        //     console.log(data)
        //     try {
        //         const blob = new Blob([data], { type: 'text/plain' })
        //         const e = document.createEvent('MouseEvents')
        //         const a = document.createElement('a')
        //         a.download = 'test123.json'
        //         a.href = window.URL.createObjectURL(blob)
        //         a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        //         e.initEvent('click', true, true)
        //         // let evt = new Event('click', { bubbles: true, cancelable: false })
        //         a.dispatchEvent(e)
        //     } catch (err) {
        //         // console.log(err)
        //         alert('failed to write out')
        //     }
        // },
        writeOutLight() {
            let LightObj = new Object()
            LightObj['name'] = 'lights'
            LightObj['objects'] = this.lights
            let strLightObj = JSON.stringify(LightObj)
            console.log(strLightObj)
            window.api.exportLight(strLightObj)
        },
        writeOutProjector() {
            let ProjectorObj = new Object()
            ProjectorObj['name'] = 'Projectors'
            ProjectorObj['objects'] = this.projectors
            let strProjectorObj = JSON.stringify(ProjectorObj)
            console.log(strProjectorObj)
            window.api.exportLight(strProjectorObj)
        }
    }
})
