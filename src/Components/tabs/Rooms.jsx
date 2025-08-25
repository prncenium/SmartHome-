import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, removeRoom } from '../../features/smartHome/smartHomeSlice';

export default function Rooms(){
  const { rooms, role } = useSelector(s => s.smartHome);
  const dispatch = useDispatch();
  const readOnly = role !== 'Admin';
  const [name, setName] = React.useState('');

  const add = () => {
    if (readOnly) return;
    if (!name.trim()) return;
    dispatch(addRoom(name.trim()));
    setName('');
  };

  return (
    <div className="space-y-4 bg-blue-200">
      <div className="flex items-end gap-2">
        <label className="text-sm">
          <div className="mb-1 ">New room</div>
          <input value={name} onChange={e=>setName(e.target.value)}
            className="w-52 rounded-xl border bg-white/10 px-3 py-2"/>
        </label>
        <button onClick={add} disabled={readOnly}
          className="rounded-xl bg-blue-400 px-4 py-2 text-sm font-medium text-zinc-900 disabled:opacity-50">
          Add
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {rooms.map(r => (
          <li key={r} className="flex items-center justify-between rounded-2xl border border-white/15 bg-blue-400 px-3 py-2 backdrop-blur-xl text-sm">
            <span>{r}</span>
            <button onClick={()=>dispatch(removeRoom(r))} disabled={readOnly}
              className="rounded-lg border border-white/20 bg-red-400
               px-2 py-1 text-xs hover:bg-white/20 disabled:opacity-50">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
