export const PlayerType = {
  Human: {
    ID: 'human',
    LABEL: 'Human',
  },
  RandomCPU: {
    ID: 'rand',
    LABEL: 'Random CPU',
  },
  SmartCPU: {
    ID: 'cpu',
    LABEL: 'Smart CPU',
  },
  getLabel: function(id) {
    if (id === 'human') return 'Human';
    if (id === 'rand') return 'Random CPU';
    if (id === 'cpu') return 'Smart CPU';
  },
}

export const Player = {
  X: {
    VAL: 1,
    LABEL: 'X'
  },
  O: {
    VAL: -1,
    LABEL: 'O',
  }
}

export const CPU_DELAY = 1000;
