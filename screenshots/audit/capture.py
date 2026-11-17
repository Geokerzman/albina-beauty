import json,subprocess,pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parents[2];OUT=ROOT/'screenshots';AUDIT=OUT/'audit';SESSION='albina-audit-eea7ace51cfa'
def run(*args,script=None):
 p=subprocess.run(['agent-browser','--session',SESSION,'--json',*args],input=script,text=True,capture_output=True,timeout=75)
 try:r=json.loads(p.stdout)
 except:raise RuntimeError(p.stdout+p.stderr)
 if not r.get('success'):raise RuntimeError(str(r))
 return r.get('data',{})
prepare="""(async()=>{await document.fonts.ready;for(let y=0;y<document.documentElement.scrollHeight;y+=650){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,120))}await Promise.race([Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true})}))),new Promise(r=>setTimeout(r,7000))]);await document.fonts.ready;scrollTo({top:0,behavior:'instant'});await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return {ready:document.readyState,height:document.documentElement.scrollHeight}})()"""
pages=json.load(open(AUDIT/'catalog.json'))['pages']
pages.append({'id':'29-shop','url':'https://shop.albina-beauty-concept.de/','title':'This store is unavailable'})
manifest=[]
for device,w,h in [('desktop',1440,1000),('mobile',390,844)]:
 (OUT/device).mkdir(exist_ok=True)
 run('set','viewport',str(w),str(h))
 for page in pages:
  key=page['id'];print('CAPTURE',device,key,flush=True)
  try:
   run('open',page['url']);run('wait','--load','load')
   if key!='29-shop':
    run('mouse','move','180','180');run('wait','--fn','!!window.elementorFrontend')
   run('eval','--stdin',script=prepare)
   d=run('eval','--stdin',script=(AUDIT/'extract.js').read_text())['result']
   (AUDIT/f'{key}.{device}.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
   snap=run('snapshot','-u');(AUDIT/f'{key}.{device}.snapshot.json').write_text(json.dumps(snap,ensure_ascii=False,indent=2))
   path=OUT/device/f'{key}.png';run('screenshot','--full',str(path))
   if key in ['01-home','02-preisliste','10-galerie','11-kontakt','14-leistungen__kosmetische-behandlungen__hydrafacial','24-elementor-1142']:
    axe=run('a11y');(AUDIT/f'{key}.{device}.a11y.json').write_text(json.dumps(axe,ensure_ascii=False,indent=2))
   manifest.append({'id':key,'device':device,'url':page['url'],'finalUrl':d['url'],'title':d['title'],'file':str(path.relative_to(OUT)),'viewport':{'width':w,'height':h},'pageDimensions':d['dimensions'],'status':d['performance'][0].get('responseStatus') if d['performance'] else None,'error':None})
  except Exception as e:
   print('ERROR',key,str(e)[:300],flush=True);manifest.append({'id':key,'device':device,'url':page['url'],'error':str(e)})
  (OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('DONE',len(manifest),flush=True)
