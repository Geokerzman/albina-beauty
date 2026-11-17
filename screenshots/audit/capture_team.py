import json,subprocess,pathlib
O=pathlib.Path(__file__).resolve().parents[1]
S='albina-audit-eea7ace51cfa'
def run(*args,script=None):
 p=subprocess.run(['agent-browser','--session',S,'--json',*args],input=script,text=True,capture_output=True,timeout=50)
 r=json.loads(p.stdout)
 if not r.get('success'):raise RuntimeError(str(r))
 return r['data']
run('find','role','button','click','--name','Close','--exact')
for device,w,h in [('desktop',1440,1000),('mobile',390,844)]:
 run('set','viewport',str(w),str(h))
 for name,ref in [('albina','@e4474'),('alina','@e4476'),('evgenia','@e4478'),('dominika','@e4480'),('irina','@e4482')]:
  print(device,name,flush=True)
  run('scrollintoview',ref);run('click',ref)
  run('wait','--fn','[...document.querySelectorAll(".elementor-popup-modal")].some(e=>e.getClientRects().length&&getComputedStyle(e).display!=="none")')
  d=run('eval','--stdin',script="(async()=>{const e=[...document.querySelectorAll('.elementor-popup-modal')].find(e=>getComputedStyle(e).display!=='none');await Promise.allSettled(e.getAnimations({subtree:true}).map(a=>a.finished));await Promise.all([...e.querySelectorAll('img')].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=i.onerror=r})));return {id:e.id,text:e.innerText,html:e.outerHTML}})()")['result']
  (O/'audit'/f'team-{name}.{device}.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
  run('screenshot',str(O/'states'/f'team-{name}-{device}.png'))
  run('find','role','button','click','--name','Close','--exact')
