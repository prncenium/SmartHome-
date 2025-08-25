import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDevice, connectDevice, removeDevice } from '../../features/smartHome/smartHomeSlice';
import DeviceCard from '../DeviceCard';

export default function Devices(){
  const { devices, role } = useSelector(s => s.smartHome);
  const dispatch = useDispatch();
  const readOnly = role !== 'Admin';

  const [draft, setDraft] = React.useState({ type:'lamp', name:'', room:'Living Room' });

  const add = (e) => {
    e.preventDefault();
    if (readOnly) return;
    dispatch(addDevice(draft));
    setDraft({ type:'lamp', name:'', room:'Living Room' });
  };

  return (
    <div className="space-y-4 bg-blue-200">
      <form onSubmit={add} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
        <div className="mb-2 text-sm ">Create device (click on ADD )</div>
        <div className="flex flex-wrap items-end gap-2">
          <select value={draft.type} onChange={e=>setDraft({...draft, type:e.target.value})}
            className="rounded-xl border border-white/15 bg-blue-400 px-3 py-2">
            <option className="bg-zinc-900" value="lamp">Lamp</option>
            <option className="bg-zinc-900" value="speaker">Speaker</option>
            <option className="bg-zinc-900" value="tv">TV</option>
            <option className="bg-zinc-900" value="thermostat">Thermostat</option>
          </select>
          <input value={draft.room} onChange={e=>setDraft({...draft, room:e.target.value})} placeholder="Room"
            className="rounded-xl border border-white/15 bg-blue-400 px-3 py-2"/>
          <input value={draft.name} onChange={e=>setDraft({...draft, name:e.target.value})} placeholder="Device name"
            className="rounded-xl border border-white/15 bg-blue-400 px-3 py-2"/>
          <button disabled={readOnly}
            className="rounded-xl bg-white/80 px-4 py-2 text-sm font-medium text-zinc-900 disabled:opacity-50">
            Add
          </button>
        </div>
      </form>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {devices.map(d => (
          <div key={d.id}>
            <DeviceCard device={d} />
            {!d.connected && (
              <div className="mt-2 ">
                <button onClick={()=>dispatch(connectDevice(d.id))} disabled={readOnly}
                  className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:opacity-50">
                  Connect
                </button>
                <button onClick={()=>dispatch(removeDevice(d.id))} disabled={readOnly}
                  className="ml-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs hover:bg-white/20 disabled:opacity-50">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
