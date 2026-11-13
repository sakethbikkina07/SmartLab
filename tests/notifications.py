import urllib.request
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
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1366,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    def login(l):
        pg.goto(U+'/login');pg.evaluate('localStorage.removeItem("sl_user")');pg.goto(U+'/login');pg.click('text='+l);pg.click('text=Sign in as '+l);pg.wait_for_timeout(400)
    bell=lambda:pg.get_by_label('Notifications').inner_text().strip()
    login('Student');a=bell()
    login('Faculty');pg.goto(U+'/faculty/tasks');pg.wait_for_timeout(600);pg.fill('input[name=title]','Bell task');pg.fill('input[name=deadline]','2026-12-01');pg.check('text=Sneha Reddy');pg.get_by_role('button',name='Assign task').click();pg.wait_for_timeout(300)
    login('Student');c=bell();pg.get_by_label('Notifications').click();pg.wait_for_timeout(500);listed='Bell task' in pg.inner_text('main')
    pg.get_by_role('button',name='Mark all as read').click();pg.wait_for_timeout(200);d=pg.get_by_label('Notifications').inner_text().strip()
    print('badge before:',a,'after assign:',c,'listed:',listed,'after mark read:',repr(d),'errors:',errs);b.close()
