const lamps = [
  {
    id: 1,
    name: 'Living Room Lamp',
    state: false,
    color: '#FF0000',
    brightness: 100
  },
  {
    id: 2,
    name: 'Bedroom Lamp',
    state: true,
    color: '#00FF00',
    brightness: 75
  },
  {
    id: 3,
    name: 'Kitchen Light',
    state: false,
    color: '#0000FF',
    brightness: 50
  },
  {
    id: 4,
    name: 'Bathroom Light',
    state: true,
    color: '#FFFF00',
    brightness: 80
  },
  {
    id: 5,
    name: 'Hallway Light',
    state: false,
    color: '#FF00FF',
    brightness: 60
  },
  {
    id: 6,
    name: 'Garage Light',
    state: true,
    color: '#00FFFF',
    brightness: 90
  },
  {
    id: 7,
    name: 'Porch Light',
    state: false,
    color: '#FFFFFF',
    brightness: 40
  },
  {
    id: 8,
    name: 'Office Lamp',
    state: true,
    color: '#FFA500',
    brightness: 100
  },
  {
    id: 9,
    name: 'Dining Room Light',
    state: false,
    color: '#800080',
    brightness: 70
  },
  {
    id: 10,
    name: 'Attic Light',
    state: true,
    color: '#808080',
    brightness: 55
  }
];

export async function getLamps() {
  return new Promise(resolve => {
    setTimeout(() => resolve(lamps), 500);
  })
}

export async function updateLamp(id, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const lamp = lamps.find((lamp) => lamp.id === id);
      if (lamp) {
        Object.assign(lamp, data);
        resolve(lamp);
      } else {
        reject(new Error('Lamp not found'));
      }
    }, 500)
  })
}

export async function createLamp(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const maxId = lamps.reduce((max, lamp) => Math.max(max, lamp.id), 0);
      const newLamp = {
        id: maxId + 1,
        ...data
      };
      // lamps.push(newLamp);
      resolve(newLamp);
    }, 500);
  });
}


export async function deleteLamp(id) {
  return new Promise((resolve, reject) => {
    console.log(id)
    console.log(lamps)
    setTimeout(() => {
      const index = lamps.findIndex((lamp) => lamp.id === id);
      if (index !== -1) {
        lamps.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Lamp not found'));
      }
    }, 500)
  })
}