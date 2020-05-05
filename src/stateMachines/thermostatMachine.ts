import {Machine, assign} from 'xstate';

interface ThermostatContext {
    temperature: number; // in celsius
}

interface ThermostatStateSchema {
    states: {
        active: {
            states: {
                warm: {},
                cold: {}
            }
        }
        inactive: {};
    };
}

export enum THERMOSTAT_EVENTS {
    "SET_TEMPERATURE" = "SET_TEMPERATURE",
    "POWER_TOGGLE" = "POWER_TOGGLE"
};

type ISetTemperatureEvent = {
    type: THERMOSTAT_EVENTS.SET_TEMPERATURE;
    temperature: number;
};

type ThermostatEvent =
    | { type: THERMOSTAT_EVENTS.POWER_TOGGLE }
    | ISetTemperatureEvent;

export const thermostatMachine = Machine<ThermostatContext, ThermostatStateSchema, any>({
    id: 'thermostat',
    initial: 'inactive',
    context: {
        temperature: 20,
    },
    states: {
        inactive: {
            on: {
                [THERMOSTAT_EVENTS.POWER_TOGGLE]: 'active'
            }
        },
        active: {
            initial: 'warm',
            states: {
                cold: {},
                warm: {},
            },
            on: {
                [THERMOSTAT_EVENTS.POWER_TOGGLE]: {
                    target: 'inactive',
                },
                [THERMOSTAT_EVENTS.SET_TEMPERATURE]: [
                    {
                        target: '.cold',
                        cond: 'isTemperatureCold',
                        actions: 'assignTemperature',
                    },
                    {
                        target: '.warm',
                        actions: 'assignTemperature',
                    },
                ]
            }
        },
    }
}, {
    actions: {
        assignTemperature: assign({
            temperature: (context: ThermostatContext, event) => event.temperature,
        }),
    },
    guards: {
        isTemperatureCold: (context: ThermostatContext, event) => event.temperature < 18
    },
});
