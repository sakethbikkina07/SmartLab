import re,json,os,urllib.request
from playwright.sync_api import sync_playwright

def get_url():
    for port in [5173, 4173]:
        try:
            with urllib.request.urlopen(f'http://localhost:{port}', timeout=1):
                return f'http://localhost:{port}'
        except Exception:
            continue
    return 'http://localhost:5173'

U = get_url()
config_file = 'frontend/src/config.js' if os.path.exists('frontend/src/config.js') else 'src/config.js'
src=open(config_file).read()
nav={}
for role in ['superadmin','admin','hod','faculty','student']:
    m=re.search(r"(?<![a-z])"+role+r":\[(.*?)\],?\n?(?=[a-z]+:\[|\};)",src,re.S)
    nav[role]=re.findall(r"n\('([a-z-]+)'",m.group(1))
extra={'superadmin':['register'],'hod':['completion'],'faculty':['performance']}
for r in nav:
    nav[r]+= ['profile','notifications']+extra.get(r,[])
label={'superadmin':'Super Admin','admin':'College Admin','hod':'HOD','faculty':'Faculty','student':'Student'}
bad=[];total=0
with sync_playwright() as p:
    b=p.chromium.launch()
    for vp,(w,h) in {'desktop':(1366,800),'mobile':(390,800)}.items():
        ctx=b.new_context(viewport={'width':w,'height':h});pg=ctx.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)[:80]))
        for role,pages in nav.items():
            pg.goto(U+'/login');pg.evaluate('localStorage.removeItem("sl_user")');pg.goto(U+'/login');pg.click('text='+label[role]);pg.click('text=Sign in as '+label[role]);pg.wait_for_timeout(300)
            for pa in pages:
                errs.clear();pg.goto(f'{U}/{role}/{pa}');pg.wait_for_timeout(600);total+=1
                body=pg.inner_text('body');ov=pg.evaluate('document.documentElement.scrollWidth>window.innerWidth+2')
                if 'Something went wrong' in body or '404' in body[:400] or errs or ov or len(body)<80:bad.append((vp,role,pa,'crash' if 'Something went wrong' in body else '404' if '404' in body[:400] else 'err:'+str(errs[:1]) if errs else 'overflow' if ov else 'empty'))
    b.close()
print('checked',total,'page loads;',len(bad),'problems')
for x in bad:print(x)
