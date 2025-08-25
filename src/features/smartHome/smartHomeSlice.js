import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  role: 'Admin', 
  rooms: ['Living Room', 'Bedroom', 'Kitchen', 'Office'],
  devices: [
    { id:'lamp-1', name:'Living Lamp', type:'lamp', room:'Living Room', connected:true, on:true, brightness:72, color:'#FFD166' },
    { id:'speaker-1', name:'Home Speaker', type:'speaker', room:'Living Room', connected:true, on:true, volume:45, nowPlaying:{ title:'Ocean Eyes', artist:'Billie Eilish' } },
    { id:'tv-1', name:'Bedroom TV', type:'tv', room:'Bedroom', connected:true, on:false, channel:'HDMI 1', volume:12 },
    { id:'thermo-1', name:'Thermostat', type:'thermostat', room:'Bedroom', connected:true, on:true, temp:24 },
  ],
  
};

const slice = createSlice({
  name: 'smartHome',
  initialState,
  reducers: {
    setRole: (s, a) => { s.role = a.payload; },

    addRoom: (s, a) => {
      const r = (a.payload || '').trim();
      if (r && !s.rooms.includes(r)) s.rooms.push(r);
    },
    removeRoom: (s, a) => {
      const target = a.payload;
      s.rooms = s.rooms.filter(r => r !== target);
      s.devices = s.devices.map(d => d.room === target ? { ...d, room: 'Living Room' } : d);
    },

    addDevice: {
      prepare: (draft) => {
        const id = `${draft.type}-${nanoid(6)}`;
        const base = { id, type: draft.type, name: draft.name?.trim() || `New ${draft.type}`, room: draft.room || 'Living Room', connected:false, on:false };
        let extra = {};
        if (draft.type === 'lamp')       extra = { brightness: 60, color:'#ffffff' };
        if (draft.type === 'speaker')    extra = { volume: 30, nowPlaying:{ title:'', artist:'' } };
        if (draft.type === 'tv')         extra = { volume: 10, channel:'HDMI 1' };
        if (draft.type === 'thermostat') extra = { temp: 24 };
        return { payload: { ...base, ...extra } };
      },
      reducer: (s, a) => { s.devices.unshift(a.payload); }
    },
    connectDevice: (s, a) => { const d = s.devices.find(x => x.id === a.payload); if (d) { d.connected = true; d.on = true; } },
    removeDevice:  (s, a) => { s.devices = s.devices.filter(d => d.id !== a.payload); },
    toggleDevice:  (s, a) => { const d = s.devices.find(x => x.id === a.payload); if (d) d.on = !d.on; },
   


    emergencyAllOff: (s) => { s.devices.forEach(d => { d.on = false; }); },
  }
});

export const {
  setRole,
  addRoom, removeRoom,
  addDevice, connectDevice, removeDevice, toggleDevice, patchDevice,
  addRoutine, deleteRoutine,
  emergencyAllOff,
} = slice.actions;

export default slice.reducer;

export const selectSmartHome = (s) => s.smartHome;
export const selectDevices = (s) => s.smartHome.devices;
export const selectRooms   = (s) => s.smartHome.rooms;
