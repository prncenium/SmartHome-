import { useDispatch, useSelector } from 'react-redux';
import { toggleDevice } from '../features/smartHome/smartHomeSlice';
import { Power } from './Icons';
import DeviceControls from './DeviceControls';

export default function DeviceCard({ device }){
  const role = useSelector(s => s.smartHome.role);
  const readOnly = role !== 'Admin';
  const dispatch = useDispatch();
  const toggle = () => !readOnly && dispatch(toggleDevice(device.id));

  return (
    <article className="rounded-3xl border border-white/15 bg-gray-500 p-4 backdrop-blur-2xl ">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium">{device.name}</h3>
          <p className="text-xs text-white/70">{device.room} • {device.connected ? 'Connected' : 'Not connected'}</p>
        </div>
        <button
          onClick={toggle}
          disabled={readOnly}
          className={`grid h-9 w-9 place-items-center rounded-xl border transition
            ${device.on ? ' bg-white text-green-300' : 'border-white/15 bg-white/10 text-white/80 hover:bg-white/20'}
            ${readOnly && 'opacity-50'}`}
          aria-pressed={device.on}
        >
          <Power className="h-4 w-4"/>
        </button>
      </header>
      <DeviceControls d={device} />
    </article>
  );
}
