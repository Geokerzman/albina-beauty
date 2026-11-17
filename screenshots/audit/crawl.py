import json, subprocess, pathlib, urllib.parse, re, sys
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'screenshots'/'audit'
SESSION='albina-audit-eea7ace51cfa'
BASE='https://www.albina-beauty-concept.de/'
def run(*args,script=None):
 p=subprocess.run(['agent-browser','--session',SESSION,'--json',*args],input=script,text=True,capture_output=True,timeout=65)
 try:r=json.loads(p.stdout)
 except:raise RuntimeError(p.stdout+p.stderr)
 if not r.get('success'):raise RuntimeError(str(r))
 return r.get('data',{})
def norm(u):
 p=urllib.parse.urlsplit(u)
 if p.hostname not in ['www.albina-beauty-concept.de','albina-beauty-concept.de']:return None
 if p.query or re.search(r'\.(?:jpe?g|png|svg|webp|pdf|xml|zip|mp4)/?$',p.path,re.I):return None
 if any(s in p.path for s in ['/wp-content/','/wp-json/','/wp-admin/','/feed/','/comments/','/xmlrpc.php','/wp-login']):return None
 return urllib.parse.urlunsplit(('https','www.albina-beauty-concept.de',p.path or '/','',''))
site=json.load(open(OUT/'sitemaps.json'))['data']['result']
queue=[BASE]
for m in site:
 if 'sitemapindex' not in m['xml']:queue.extend(m['urls'])
queue=list(dict.fromkeys(queue));done=set();catalog=[];failures=[]
while queue:
 u=queue.pop(0);u=norm(u)
 if not u or u in done:continue
 done.add(u)
 slug=urllib.parse.urlsplit(u).path.strip('/').replace('/','__') or 'home'
 id=f'{len(catalog)+1:02d}-{slug}'
 print('CRAWL',id,u,flush=True)
 try:
  run('open',u)
  run('wait','--load','load')
  run('eval','--stdin',script="(async()=>{await document.fonts.ready; for(let y=0;y<document.documentElement.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))};scrollTo(0,0);return document.readyState})()".replace('r))))','r)))'))
  d=run('eval','--stdin',script=(OUT/'extract.js').read_text())['result']
  (OUT/f'{id}.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
  snap=run('snapshot','-u')
  (OUT/f'{id}.snapshot.json').write_text(json.dumps(snap,ensure_ascii=False,indent=2))
  catalog.append({'id':id,'url':u,'finalUrl':d['url'],'title':d['title'],'status':d['performance'][0].get('responseStatus') if d['performance'] else None,'data':f'audit/{id}.json'})
  for a in d['links']:
   v=norm(a['url'])
   if v and v not in done and v not in queue:queue.append(v)
 except Exception as e:
  print('ERROR',str(e)[:300],flush=True);failures.append({'url':u,'error':str(e)})
 (OUT/'catalog.json').write_text(json.dumps({'pages':catalog,'failures':failures,'pending':queue},ensure_ascii=False,indent=2))
print('DONE',len(catalog),'failures',len(failures),flush=True)
