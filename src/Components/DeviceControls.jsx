import { useDispatch, useSelector } from 'react-redux';
import { patchDevice } from '../features/smartHome/smartHomeSlice';
import { Sun, Speaker as SpeakerIcon, Tv as TvIcon, Thermometer } from './Icons';

export default function DeviceControls({ d }){
  const role = useSelector(s => s.smartHome.role);
  const disabled = role !== 'Admin' || !d.connected;
  const dispatch = useDispatch();
  const patch = (p) => dispatch(patchDevice({ id: d.id, patch: p }));

  if (d.type === 'lamp') return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <Sun className="h-5 w-5 text-white/80"/>
        <input type="range" min={0} max={100} value={d.brightness ?? 0}
          onChange={e=>patch({ brightness:Number(e.target.value), on:true })}
          className="w-full accent-white/90" disabled={disabled}/>
        <span className="w-10 text-right text-sm tabular-nums text-white/70">{d.brightness ?? 0}%</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {['#ffffff','#FFD166','#EF476F','#06D6A0','#118AB2','#9B87F5'].map(c=>(
          <button key={c}
            onClick={()=>patch({ color:c, on:true })}
            disabled={disabled}
            className={`h-8 w-8 rounded-full border ${d.color===c?'border-white/80':'border-white/20'}`}
            style={{ background:c }}/>
        ))}
      </div>
    </div>
  );

  if (d.type === 'speaker') return (
    <div className="space-y-3 ">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10  p-3 backdrop-blur">
        <SpeakerIcon className="h-5 w-5 text-white/80"/>
        <input type="range" min={0} max={100} value={d.volume ?? 0}
          onChange={e=>patch({ volume:Number(e.target.value), on:true })}
          className="w-full accent-white/90" disabled={disabled}/>
        <span className="w-10 text-right text-sm tabular-nums text-white/70">{d.volume ?? 0}%</span>
      </div>
      
    </div>
  );

  if (d.type === 'tv') return (
    <div className="space-y-3">
      <label className="text-sm">
        <div className="mb-1 text-white/70">Input</div>
        <select value={d.channel} onChange={e=>patch({ channel: e.target.value })}
          className="w-full rounded-2xl border border-white/15 bg-blue-300 py-2 backdrop-blur-xl"
          disabled={disabled}>
          {['HDMI 1','HDMI 2','AV','TV'].map(c=><option key={c} value={c} className="bg-blue-400">{c}</option>)}
        </select>
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <TvIcon className="h-5 w-5 text-white/80"/>
        <input type="range" min={0} max={100} value={d.volume ?? 0}
          onChange={e=>patch({ volume:Number(e.target.value), on:true })}
          className="w-full accent-white/90" disabled={disabled}/>
        <span className="w-10 text-right text-sm tabular-nums text-white/70">{d.volume ?? 0}%</span>
      </div>
    </div>
  );

  if (d.type === 'thermostat') return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <Thermometer className="h-5 w-5 text-white/80"/>
        <input type="range" min={18} max={30} value={d.temp ?? 24}
          onChange={e=>patch({ temp:Number(e.target.value), on:true })}
          className="w-full accent-white/90" disabled={disabled}/>
        <span className="w-12 text-right text-sm tabular-nums text-white/70">{d.temp ?? 24}°C</span>
      </div>
    </div>
  );

  return <p className="text-sm text-white/70">No controls.</p>;
}
