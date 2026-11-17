from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
root=Path(__file__).resolve().parents[1]
(root/'overview').mkdir(exist_ok=True)
for kind in ['desktop','mobile']:
 files=sorted((root/kind).glob('*.png'))
 cols=4 if kind=='desktop' else 5
 tw=320 if kind=='desktop' else 195
 th=235 if kind=='desktop' else 422
 for start in range(0,len(files),cols*2):
  group=files[start:start+cols*2];sheet=Image.new('RGB',(cols*(tw+16)+16,2*(th+50)+16),'#e9e9e9');draw=ImageDraw.Draw(sheet)
  for j,p in enumerate(group):
   im=Image.open(p).convert('RGB');im=im.crop((0,0,im.width,min(im.height,1000 if kind=='desktop' else 844)));im.thumbnail((tw,th))
   x=16+(j%cols)*(tw+16);y=16+(j//cols)*(th+50);sheet.paste(im,(x,y));label=p.stem
   draw.text((x,y+th+4),label[:39],fill='#111111')
  sheet.save(root/'overview'/f'{kind}-{start//(cols*2)+1:02d}.jpg',quality=88)
print('Created',len(list((root/'overview').glob('*.jpg'))),'overview sheets')
