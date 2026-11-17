exec(open('screenshots/audit/capture_team.py').read().split("run('find','role','button','click','--name','Close','--exact')")[0])
links=[a for a in json.load(open(O/'audit'/'03-ueber-uns.desktop.json'))['links'] if a['text']=='mehr Info']
run('set','viewport','390','844')
for name,link in zip(['albina','alina','evgenia','dominika','irina'],links):
 print(name,flush=True)
 run('open','https://www.albina-beauty-concept.de/ueber-uns/');run('mouse','move','180','180');run('wait','--fn','!!window.elementorFrontend')
 selector='a[href="'+link['url'][link['url'].index('#'):]+'"]'
 run('eval','--stdin',script='document.querySelector('+json.dumps(selector)+').scrollIntoView({behavior:"instant",block:"center"})')
 run('click',selector)
 run('wait','--fn','[...document.querySelectorAll(".elementor-popup-modal")].some(e=>e.getClientRects().length&&getComputedStyle(e).display!=="none")')
 d=run('eval','--stdin',script="(async()=>{const e=[...document.querySelectorAll('.elementor-popup-modal')].find(e=>getComputedStyle(e).display!=='none');await Promise.allSettled(e.getAnimations({subtree:true}).map(a=>a.finished));return {id:e.id,text:e.innerText,html:e.outerHTML}})()")['result']
 (O/'audit'/f'team-{name}.mobile.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));run('screenshot',str(O/'states'/f'team-{name}-mobile.png'))
