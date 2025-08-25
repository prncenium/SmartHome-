import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emergencyAllOff } from '../../features/smartHome/smartHomeSlice';
import DeviceCard from '../DeviceCard';

export default function Dashboard(){
  const { devices, rooms, role } = useSelector(s => s.smartHome);
  const [filter, setFilter] = React.useState('All');
  const dispatch = useDispatch();

  const visible = devices.filter(d => filter === 'All' || d.room === filter);

  return (
    <div className='bg-blue-200'>
      <div className="mb-4 flex items-center gap-2">
        <select value={filter} onChange={e=>setFilter(e.target.value)}
          className="rounded-xl border border-white/15 bg-blue-400
           px-3 py-2 text-sm backdrop-blur-xl ">
          {['All', ...rooms].map(r => <option key={r} className="bg-zinc-900">{r}</option>)}
        </select>
        <button onClick={()=>dispatch(emergencyAllOff())}
          className="rounded-xl border border-white/15 bg-blue-400 px-3 py-2 text-sm backdrop-blur-xl hover:bg-white/20">
          Emergency: All Off
        </button>
        <div className="ml-auto text-sm bg-blue-400">Role: {role}</div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(d => <DeviceCard key={d.id} device={d} />)}
      </section>
    </div>
  );
}
