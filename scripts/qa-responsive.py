import json,pathlib,subprocess
out=pathlib.Path('screenshots/redesign');session='albina-redesign-eea7ace51cfa';results=[]
def run(*args):
 p=subprocess.run(['agent-browser','--session',session,'--json',*args],capture_output=True,text=True,timeout=50);d=json.loads(p.stdout)
 if not d.get('success'):raise RuntimeError(str(d))
 return d['data']
for w in [320,768,1024]:
 run('set','viewport',str(w),'900')
 for path in ['/','/leistungen/','/preisliste/','/leistungen/kosmetische-behandlungen/hydrafacial/','/kontakt/','/datenschutzerklaerung/','/karriere/','/termin-vereinbaren/']:
  run('open','http://localhost:3000'+path);run('wait','--load','load');run('wait','--fn','document.fonts.status === "loaded"')
  d=run('eval','({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})')['result'];d['path']=path;results.append(d)
  if d['scrollWidth']>w:print('OVERFLOW',w,path,d['scrollWidth'],flush=True)
(out/'responsive-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2));print('Checked',len(results),'responsive samples',flush=True)
