import re,sys,os
from playwright.sync_api import sync_playwright
U='http://localhost:4173';role=sys.argv[1]
config_file = 'frontend/src/config.js' if os.path.exists('frontend/src/config.js') else 'src/config.js'
src=open(config_file).read()
m=re.search(r"(?<![a-z])"+role+r":\[(.*?)\],?\n?(?=[a-z]+:\[|\};)",src,re.S)
pages=re.findall(r"n\('([a-z-]+)'",m.group(1))+['profile','notifications']+{'superadmin':['register'],'hod':['completion'],'faculty':['performance']}.get(role,[])
label={'superadmin':'Super Admin','admin':'College Admin','hod':'HOD','faculty':'Faculty','student':'Student'}[role]
bad=[];clicks=0
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1366,'height':900});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)[:100]));pg.on('dialog',lambda d:d.dismiss())
    pg.goto(U+'/login');pg.click('text='+label);pg.click('text=Sign in as '+label);pg.wait_for_timeout(300)
    for pa in pages:
        pg.goto(f'{U}/{role}/{pa}');pg.wait_for_timeout(500);n=pg.locator('main button').count()
        for i in range(n):
            pg.goto(f'{U}/{role}/{pa}');pg.wait_for_timeout(350);errs.clear()
            btn=pg.locator('main button').nth(i)
            try:
                if not btn.is_visible() or btn.is_disabled():continue
                t=(btn.inner_text() or btn.get_attribute('aria-label') or '').strip()[:30]
                btn.click(timeout=1500);clicks+=1;pg.wait_for_timeout(250)
            except Exception as e:
                bad.append((pa,i,'click-failed',str(e)[:70]));continue
            body=pg.inner_text('body')
            if errs or 'Something went wrong' in body:bad.append((pa,i,t,errs[:1] or 'crash'))
    b.close()
print(role,'clicks:',clicks,'problems:',len(bad))
for x in bad:print(' ',x)
