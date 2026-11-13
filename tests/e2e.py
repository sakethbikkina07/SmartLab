from playwright.sync_api import sync_playwright
U='http://localhost:5173'
res=[]
def ok(n,c):res.append((n,bool(c)))
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1366,'height':900})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    def login(l):
        pg.goto(U+'/login');pg.evaluate('localStorage.removeItem("sl_user")');pg.goto(U+'/login');pg.click('text='+l);pg.click('text=Sign in as '+l);pg.wait_for_timeout(500)
    def go(path):pg.goto(U+path);pg.wait_for_timeout(700)
    # 1 task flow
    login('Faculty');go('/faculty/tasks')
    pg.fill('input[name=title]','E2E task');pg.fill('input[name=deadline]','2026-12-01');pg.check('text=Sneha Reddy');pg.get_by_role('button',name='Assign task').click();pg.wait_for_timeout(300)
    login('Student');go('/student/tasks');ok('task assigned shows for student','E2E task' in pg.inner_text('main'))
    # 2 mcq publish
    login('Faculty');go('/faculty/mcq');pg.get_by_role('button',name='Generate (mock)').click();pg.locator('input[type=checkbox]').first.check();pg.get_by_role('button',name='Publish approved questions').click();pg.wait_for_timeout(300)
    login('Student');go('/student/mcq');ok('published mcq shown','swap in bubble sort' in pg.inner_text('main'))
    pg.locator('button',has_text='Exchanges two adjacent elements').click();pg.get_by_role('button',name='Next').click() if pg.get_by_role('button',name='Next').count() else None
    pg.get_by_role('button',name='Submit test').click() if pg.get_by_role('button',name='Submit test').count() else None;pg.wait_for_timeout(300)
    ok('mcq result screen','Result' in pg.inner_text('main'))
    # 3 admin add student
    login('College Admin');go('/admin/students');pg.get_by_text('Add new').click()
    for k,v in [('name','Zed Test'),('roll','21CS099'),('department','CSE'),('average','70%')]:pg.fill(f'input[name={k}]',v)
    pg.get_by_role('button',name='Save').click();pg.wait_for_timeout(300);ok('student row added','Zed Test' in pg.inner_text('main'))
    go('/admin/dashboard');ok('dashboard count 6','6' in pg.inner_text('main'))
    go('/admin/students');pg.reload();pg.wait_for_timeout(700);ok('persists after refresh','Zed Test' in pg.inner_text('main'))
    # 4 experiments advance
    login('Student');go('/student/experiments');before=pg.inner_text('main');pg.get_by_role('button',name='Advance stage').first.click();pg.wait_for_timeout(300);ok('tracker advances',pg.inner_text('main')!=before)
    # 5 super admin register college
    login('Super Admin');go('/superadmin/register')
    pg.fill('input[name=name]','E2E College');pg.fill('input[name=city]','Delhi');pg.fill('input[name=students]','500');pg.fill('input[name=email]','a@b.co');pg.get_by_role('button',name='Register college').click();pg.wait_for_timeout(300)
    go('/superadmin/colleges');ok('college registered','E2E College' in pg.inner_text('main'))
    # 6 rbac
    login('Student');go('/admin/dashboard');ok('student blocked from admin','Unauthorized' in pg.inner_text('body'))
    ok('no page errors',not errs)
    for n,c in res:print(('PASS ' if c else 'FAIL ')+n)
    print('errors:',errs[:3]);b.close()
