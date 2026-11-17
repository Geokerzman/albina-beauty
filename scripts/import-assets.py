import json,pathlib,urllib.request,urllib.parse,concurrent.futures,hashlib
root=pathlib.Path(__file__).resolve().parents[1];out=root/'public/images';out.mkdir(exist_ok=True)
urls=set()
for p in (root/'screenshots/audit').glob('[0-2][0-9]-*.desktop.json'):
 d=json.load(open(p))
 for im in d.get('images',[]):
  u=im['src']
  if u.startswith('https://www.albina-beauty-concept.de/wp-content/uploads/') and not u.endswith('.svg'):urls.add(u)
 for a in d.get('links',[]):
  if '/wp-content/uploads/' in a['url'] and a['url'].lower().endswith(('.jpeg','.jpg','.png','.webp')):urls.add(a['url'])
urls.add('https://www.albina-beauty-concept.de/wp-content/uploads/2020/09/face-1511873-scaled.jpg')
def get(u):
 name=urllib.parse.unquote(urllib.parse.urlsplit(u).path.split('/')[-1]);p=out/name
 if not p.exists():
  req=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=35) as r:p.write_bytes(r.read())
 return u,'/images/'+name
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
 results={}
 for f in concurrent.futures.as_completed([pool.submit(get,u) for u in sorted(urls)]):
  try:u,p=f.result();results[u]=p
  except Exception as e:print('FAILED',str(e),flush=True)
(root/'src/content/assets.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print('Downloaded',len(results),'original assets')
# Self-hosted font files; no third-party font request in the rendered website.
fonts={'display':'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap','sans':'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap'}
css=''
for name,u in fonts.items():
 req=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'})
 with urllib.request.urlopen(req,timeout=30) as r:s=r.read().decode()
 import re
 for n,url in enumerate(dict.fromkeys(re.findall(r'url\((https[^)]+)\)',s))):
  ext='.woff2' if '.woff2' in url else '.ttf';path=root/'public/fonts'/f'{name}-{n}{ext}'
  with urllib.request.urlopen(url,timeout=30) as r:path.write_bytes(r.read())
  s=s.replace(url,f'/fonts/{path.name}')
 css+=s+'\n'
(root/'src/app/fonts.css').write_text(css)
print('Self-hosted fonts saved')
