import React from 'react';
import { useMachine } from '@xstate/react';
import Switch from 'react-switch';
import {lightSwitchMachine, LIGHT_SWITCH_EVENT, LIGHT_SWITCH} from '../stateMachines/lightSwitchMachine';

export const LightSwitch = () => {
  const [state, send] = useMachine(lightSwitchMachine);

  return (
    <Switch
      onChange={() => send({ type: LIGHT_SWITCH_EVENT.TOGGLE })}
      checked={state.matches(LIGHT_SWITCH.ACTIVE)}
      aria-label='Toggle me'
    />
  );
};
