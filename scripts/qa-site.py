import json,subprocess,pathlib,urllib.parse
ROOT=pathlib.Path(__file__).resolve().parents[1];OUT=ROOT/'screenshots/redesign';SESSION='albina-redesign-eea7ace51cfa'
original=json.load(open(ROOT/'screenshots/audit/catalog.json'))['pages']
paths=[urllib.parse.urlsplit(x['url']).path for x in original]+['/karriere/','/shop/','/termin-vereinbaren/']
def run(*args,script=None):
 p=subprocess.run(['agent-browser','--session',SESSION,'--json',*args],input=script,text=True,capture_output=True,timeout=80)
 r=json.loads(p.stdout)
 if not r.get('success'):raise RuntimeError(str(r))
 return r['data']
prepare="""(async()=>{await document.fonts.ready;for(let y=0;y<document.documentElement.scrollHeight;y+=650){scrollTo({top:y,behavior:'instant'});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo({top:0,behavior:'instant'});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return {url:location.href,title:document.title,status:performance.getEntriesByType('navigation')[0]?.responseStatus,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,h1:[...document.querySelectorAll('h1')].map(e=>e.innerText),description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.currentSrc),links:[...document.querySelectorAll('a[href]')].map(a=>a.href)}})()"""
results=[]
for device,w,h in [('desktop',1440,1000),('mobile',390,844)]:
 (OUT/device).mkdir(exist_ok=True);run('set','viewport',str(w),str(h))
 for i,path in enumerate(paths):
  key=f'{i+1:02d}-'+(path.strip('/').replace('/','__')or'home')
  print(device,key,flush=True)
  try:
   run('open','http://localhost:3000'+path);run('wait','--load','load')
   d=run('eval','--stdin',script=prepare)['result'];d.update({'device':device,'path':path,'id':key})
   run('screenshot','--full',str(OUT/device/(key+'.png')))
   if i in [0,1,2,4,9,10,13,23,30]:
    audit=run('a11y');(OUT/device/(key+'.a11y.json')).write_text(json.dumps(audit,ensure_ascii=False,indent=2));d['axeViolations']=[{'id':a['id'],'nodes':a['nodeCount']} for a in audit.get('violations',[])]
   results.append(d)
  except Exception as e:results.append({'path':path,'device':device,'error':str(e)})
  (OUT/'qa-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print('DONE',len(results),flush=True)
