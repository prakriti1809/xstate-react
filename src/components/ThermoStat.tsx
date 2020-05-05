import React from 'react';
import {useMachine} from '@xstate/react';
import {THERMOSTAT_EVENTS, thermostatMachine} from "../stateMachines/thermostatMachine";

export const Thermostat = () => {
    const [state, send] = useMachine(thermostatMachine);

    console.log('state', state);
    return (
        <input onChange={e => void send({
            type: THERMOSTAT_EVENTS.SET_TEMPERATURE,
            temperature: e.target.value
        })}
               placeholder="Set the temperature."
        />
    )
};
