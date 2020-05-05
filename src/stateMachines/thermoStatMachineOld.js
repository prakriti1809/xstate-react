import { Machine, assign } from 'xstate';


// with custom guards

const thermostatMachine = Machine(
  {
    id: 'thermostat',
    initial: 'inactive',
    context: {
      temperature: 20,
    },
    states: {
      inactive: {
        on: {
          POWER_TOGGLE: 'active'
        }
      },
      active: {
        initial: 'warm',
        states: {
          freezing: {},
          cold: {},
          warm: {},
          hot: {},
        },
        on: {
          POWER_TOGGLE: {
            target: 'inactive',
          },
          SET_TEMPERATURE: [
            {
              target: '.freezing',
              cond: {
                type: 'isTemperatureBelow',
                temperatureThreshold: 0,
              },
              actions: 'assignTemperature',
            },
            {
              target: '.cold',
              cond: {
                type: 'isTemperatureBelow',
                temperatureThreshold: 18,
              },
              actions: 'assignTemperature',
            },
            {
              target: '.warm',
              cond: {
                type: 'isTemperatureBelow',
                temperatureThreshold: 30,
              },
              actions: 'assignTemperature',
            },
            {
              target: '.hot',
              actions: 'assignTemperature',
            },
          ]
        }
      },
    }
  },
  /**
   * Configuration object
   */
  {
    actions: {
      assignTemperature: assign({
        temperature: (context, event) => event.temperature,
      }),
    },
    guards: {
      isTemperatureBelow: (context, event, stateGuard) => event.temperature < stateGuard.cond.temperatureThreshold
    }
  }
);
