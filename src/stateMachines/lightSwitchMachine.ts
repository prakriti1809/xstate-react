import {Machine} from "xstate";

export enum LIGHT_SWITCH {
    "INACTIVE" = "inactive",
    "ACTIVE" = "active",
}

export enum LIGHT_SWITCH_EVENT {
    "TOGGLE" = "TOGGLE",
}

interface LightSwitchStateSchema {
    states: {
        [LIGHT_SWITCH.INACTIVE]: {};
        [LIGHT_SWITCH.ACTIVE]: {};
    };
}

type LightSwitchEvent = { type: LIGHT_SWITCH_EVENT.TOGGLE };

export const lightSwitchMachine = Machine<any, LightSwitchStateSchema, LightSwitchEvent>({
    id: 'lightSwitch',
    initial: LIGHT_SWITCH.INACTIVE,
    states: {
        [LIGHT_SWITCH.INACTIVE]: {
            on: {
                [LIGHT_SWITCH_EVENT.TOGGLE]: LIGHT_SWITCH.ACTIVE
            }
        },
        [LIGHT_SWITCH.ACTIVE]: {
            on: {
                [LIGHT_SWITCH_EVENT.TOGGLE]: LIGHT_SWITCH.INACTIVE
            }
        },
    }
});
