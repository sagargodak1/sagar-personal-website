'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
const SUPABASE_URL='https://akcjyuwzvsflnwmvjazh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_-HrJ2K0Fiv-Tat6cpnxbLQ_SQqR9IIr';
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const DEFAULT_SITE={
 content:{brand:'Sagar Adhikari',profileName:'Sagar Adhikari',profileRole:'Digital systems • Education technology • School operations',profilePhoto:'assets/profile/profile-placeholder.svg',kicker:'Education • Digital Systems • School Technology',hero1:'Hi! I’m Sagar Adhikari.',hero2:'I build practical digital systems for education.',lead:'I’m Sagar Adhikari. I work on practical digital solutions for school management, learning, assessment, communication and administration — with a focus on making everyday school work simpler and more organized.',aboutHeading:'About Me',aboutIntro:'I enjoy turning real school needs into clear, usable digital tools — from public websites to internal software and classroom-focused systems.',focusQuote:'“Technology is most useful when it makes daily work easier, clearer and more reliable.”',focusText:'My work is closely connected with St. Augustine Academic Foundation and its digital transformation. I focus on practical systems that teachers, administrators, students and families can actually use.',certHeading:'Certificates & Achievements',certIntro:'Training, professional development and community contribution certificates from different stages of my journey. Click any certificate to view it larger.',contactKicker:'Let’s Connect',contactTitle:'Ideas become useful when they solve real problems.',contactText:'This personal website presents my work in education, school technology, digital systems and practical software projects.',contactNote:'Sagar Adhikari • Nepal',
 navAbout:'About',navProjects:'Work',navCertificates:'Certificates',navSkills:'What I Do',navJourney:'Journey',navContact:'Contact',
 projectsHeading:'Selected Projects',projectsIntro:'A portfolio of practical systems built around school operations, assessment, communication and events.',
 skillsHeading:'What I Do',skillsIntro:'My strength is connecting real operational needs with simple digital workflows that are easy to understand and use.',
 journeyHeading:'My Digital Journey',journeyIntro:'A simple view of the work I continue to develop around education and school technology.',
 stat1:'School Website Ecosystem',stat2:'Accounts & Billing Systems',stat3:'Marks & Result Tools',stat4:'Interactive School Utilities',
 skill1Title:'Digital System Planning',skill1Text:'Turning manual school processes into structured digital workflows with clear roles and practical steps.',
 skill2Title:'Web & Interface Design',skill2Text:'Designing responsive dashboards, school portals and presentation tools with a clean, professional experience.',
 skill3Title:'Testing & Refinement',skill3Text:'Improving software through repeated real-world testing, bug fixing and workflow refinement.',
 journey1Label:'School Identity',journey1Title:'Building a stronger digital presence',journey1Text:'Creating a more professional online identity for St. Augustine Academic Foundation and organizing public-facing school information.',
 journey2Label:'Operations',journey2Title:'Moving routine work into software',journey2Text:'Developing digital workflows for accounts, billing, marks, reports, staff processes and school communication.',
 journey3Label:'Classroom & Events',journey3Title:'Making school activities more interactive',journey3Text:'Using digital tools for results, quizzes, presentations and event management while keeping the experience simple for users.',
 journey4Label:'Next',journey4Title:'One connected school ecosystem',journey4Text:'Continuing to improve useful systems that reduce repetitive work and make information easier to access.',
 footer:'© {year} Sagar Adhikari. Personal Portfolio.'},
 visibility:{about:true,projects:true,certificates:true,skills:true,journey:true,contact:true},
 projects:[
  {id:'p1',no:'PROJECT 01',title:'St. Augustine School Website',desc:'A public and staff-facing digital platform with student information, notices, staff tools, school communication and administrative workflows.',tags:['Website','Staff Portal','School Communication']},
  {id:'p2',no:'PROJECT 02',title:'Accounts & Fee Management',desc:'A school-focused accounting environment covering student fees, receipts, banking, expenses, reports and administrative controls.',tags:['Accounting','Fees','Reports']},
  {id:'p3',no:'PROJECT 03',title:'Marks Entry & Result System',desc:'A structured result workflow for student records, marks entry, calculation, grade sheets, publishing and academic exports.',tags:['Assessment','Results','Academic Data']},
  {id:'p4',no:'PROJECT 04',title:'Inter-House Quiz Dashboard',desc:'An offline presentation dashboard with multiple quiz rounds, timers, visual and audio questions, rules screens and competition flow.',tags:['Quiz','Presentation','Offline HTML']},
  {id:'p5',no:'PROJECT 05',title:'Letter & Document Tools',desc:'Practical tools designed to reduce repeated office work and produce consistent school letters and printable documents.',tags:['Documents','Office Workflow']},
  {id:'p6',no:'PROJECT 06',title:'School Digital Workflow',desc:'A broader effort to connect everyday academic, administrative and communication tasks into a cleaner digital working environment.',tags:['Digital Transformation','Operations']}
 ],
 certificates:[
  {id:'c1',title:'Computer Training Certificate — 6 Months',issuer:'Vocational & Skill Development Training Center, Government of Nepal',year:'2014',image:'assets/certificates/01-computer-training.jpg',pdf:''},
  {id:'c2',title:'e-Village Training Certificate',issuer:'Department of Information Technology, Government of Nepal',year:'Training Certificate',image:'assets/certificates/02-e-village-training.jpg',pdf:''},
  {id:'c3',title:'Hajiri Jawaf Competition — Judge / Evaluation Role',issuer:'Suryodaya Municipality, Ilam',year:'Certificate of Contribution',image:'assets/certificates/03-hajiri-jawaf-judge.jpg',pdf:''},
  {id:'c4',title:'Football Competition Contribution Honour',issuer:'Friendship Youth Club, Ilam',year:'Honour Certificate',image:'assets/certificates/04-football-contribution.jpg',pdf:''},
  {id:'c5',title:'E-Village Training — Kathmandu',issuer:'Department of Information Technology, Government of Nepal',year:'6–9 March 2017',image:'assets/certificates/05-e-village-kathmandu.jpg',pdf:''},
  {id:'c6',title:'Graphic Design (Photoshop) Course',issuer:'Code IT',year:'15 Jun 2026',image:'assets/certificates/06-codeit-graphic-design.jpg',pdf:'assets/certificates/06-codeit-graphic-design.pdf'}
 ]
};
const DEFAULT_FINANCE={banks:[],transactions:[]};
let site=clone(DEFAULT_SITE),finance=clone(DEFAULT_FINANCE),editingTx=null,currentUser=null,siteRowId=null;

function errMsg(err){return err?.message||String(err||'Unknown error')}
function openModal(id){$(id).classList.add('open')}
function closeModal(id){$(id).classList.remove('open')}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.close)));
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')}));
function ensureSiteShape(){site.content={...DEFAULT_SITE.content,...(site.content||{})};site.visibility={...DEFAULT_SITE.visibility,...(site.visibility||{})};if(!Array.isArray(site.projects))site.projects=[];if(!Array.isArray(site.certificates))site.certificates=[]}
function assetUrl(v){return v||''}

function renderPublic(){
  ensureSiteShape();const c=site.content;
  $('brandName').textContent=c.brand;$('heroKicker').textContent=c.kicker;$('heroTitle1').textContent=c.hero1;$('heroTitle2').textContent=c.hero2;$('heroLead').textContent=c.lead;$('profileName').textContent=c.profileName;$('profileRole').textContent=c.profileRole;$('aboutHeading').textContent=c.aboutHeading;$('aboutIntro').textContent=c.aboutIntro;$('focusQuote').textContent=c.focusQuote;$('focusText').textContent=c.focusText;$('certHeading').textContent=c.certHeading;$('certIntro').textContent=c.certIntro;$('contactKicker').textContent=c.contactKicker;$('contactTitle').textContent=c.contactTitle;$('contactText').textContent=c.contactText;$('contactNote').textContent=c.contactNote;$('footerText').textContent=(c.footer||'').replace('{year}',new Date().getFullYear());
  [['navAbout','navAbout'],['navProjects','navProjects'],['navCertificates','navCertificates'],['navSkills','navSkills'],['navJourney','navJourney'],['navContact','navContact'],['projectsHeading','projectsHeading'],['projectsIntro','projectsIntro'],['skillsHeading','skillsHeading'],['skillsIntro','skillsIntro'],['journeyHeading','journeyHeading'],['journeyIntro','journeyIntro'],['stat1','stat1'],['stat2','stat2'],['stat3','stat3'],['stat4','stat4'],['skill1Title','skill1Title'],['skill1Text','skill1Text'],['skill2Title','skill2Title'],['skill2Text','skill2Text'],['skill3Title','skill3Title'],['skill3Text','skill3Text'],['journey1Label','journey1Label'],['journey1Title','journey1Title'],['journey1Text','journey1Text'],['journey2Label','journey2Label'],['journey2Title','journey2Title'],['journey2Text','journey2Text'],['journey3Label','journey3Label'],['journey3Title','journey3Title'],['journey3Text','journey3Text'],['journey4Label','journey4Label'],['journey4Title','journey4Title'],['journey4Text','journey4Text']].forEach(([id,k])=>{if($(id))$(id).textContent=c[k]||''});
  const pi=$('profileImage'),init=$('profileInitials');pi.style.display='none';init.style.display='block';pi.onload=()=>{pi.style.display='block';init.style.display='none'};pi.onerror=()=>{pi.style.display='none';init.style.display='block'};pi.src=assetUrl(c.profilePhoto);
  $('projectGrid').innerHTML=site.projects.map(p=>`<article class="project reveal show"><div class="no">${esc(p.no)}</div><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></article>`).join('');
  $('certGrid').innerHTML=site.certificates.map(x=>`<article class="cert-card reveal show"><div class="cert-thumb" data-view-cert="${esc(x.id)}"><img src="${esc(assetUrl(x.image))}" alt="${esc(x.title)}"></div><div class="cert-info"><h3>${esc(x.title)}</h3><p>${esc(x.issuer)}${x.year?' • '+esc(x.year):''}</p><div class="cert-actions"><button class="small-btn" data-view-cert="${esc(x.id)}">View Larger</button>${x.pdf?`<button class="small-btn" data-open-pdf="${esc(x.id)}">Original PDF</button>`:''}</div></div></article>`).join('');
  document.querySelectorAll('.cert-thumb img').forEach(im=>im.addEventListener('error',()=>im.parentElement.classList.add('broken')));
  document.querySelectorAll('[data-view-cert]').forEach(b=>b.addEventListener('click',()=>viewCertificate(b.dataset.viewCert)));
  document.querySelectorAll('[data-open-pdf]').forEach(b=>b.addEventListener('click',()=>openPdf(b.dataset.openPdf)));
  Object.entries(site.visibility).forEach(([k,v])=>{const map={about:'about',projects:'projects',certificates:'certificates',skills:'skills',journey:'journey',contact:'contact'};const el=$(map[k]);if(el)el.classList.toggle('hidden',!v)});updateNavVisibility();
}
function updateNavVisibility(){document.querySelectorAll('#navLinks a').forEach(a=>{const id=(a.getAttribute('href')||'').replace('#','');a.classList.toggle('hidden',site.visibility[id]===false)})}
function viewCertificate(id){const c=site.certificates.find(x=>String(x.id)===String(id));if(!c)return;$('viewerTitle').textContent=c.title;$('viewerStage').innerHTML=`<img src="${esc(assetUrl(c.image))}" alt="${esc(c.title)}">`;openModal('viewerModal')}
function openPdf(id){const c=site.certificates.find(x=>String(x.id)===String(id));if(c&&c.pdf)window.open(assetUrl(c.pdf),'_blank')}
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.10});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
$('menuBtn').addEventListener('click',()=>$('navLinks').classList.toggle('mobile-open'));

async function loadPublicData(){
  const [st,pr,ce]=await Promise.all([
    sb.from('site_settings').select('*').eq('setting_key','main').maybeSingle(),
    sb.from('projects').select('*').order('display_order',{ascending:true}).order('id',{ascending:true}),
    sb.from('certificates').select('*').order('display_order',{ascending:true}).order('id',{ascending:true})
  ]);
  if(st.error) throw st.error;if(pr.error) throw pr.error;if(ce.error) throw ce.error;
  if(st.data){siteRowId=st.data.id;site.content={...DEFAULT_SITE.content,...(st.data.content||{})};site.visibility={...DEFAULT_SITE.visibility,...(st.data.visibility||{})};}
  site.projects=(pr.data||[]).map(r=>({id:String(r.id),no:r.project_no||'',title:r.title||'',desc:r.description||'',tags:Array.isArray(r.tags)?r.tags:[]}));
  site.certificates=(ce.data||[]).map(r=>({id:String(r.id),title:r.title||'',issuer:r.issuer||'',year:r.year_text||'',image:r.image_url||'',pdf:r.certificate_url||''}));
  ensureSiteShape();renderPublic();
}
async function loadPrivateData(){
  const [ba,tr]=await Promise.all([
    sb.from('banks').select('*').order('display_order',{ascending:true}).order('id',{ascending:true}),
    sb.from('transactions').select('*').order('transaction_date',{ascending:false}).order('id',{ascending:false})
  ]);
  if(ba.error) throw ba.error;if(tr.error) throw tr.error;
  finance.banks=(ba.data||[]).map(r=>({id:String(r.id),name:r.bank_name||'',openingBalance:Number(r.opening_balance||0)}));
  finance.transactions=(tr.data||[]).map(r=>({
    id:String(r.id),date:r.transaction_date,type:r.transaction_type,amount:Number(r.amount||0),
    account:r.account_type==='cash'?'cash':(r.account_bank_id?String(r.account_bank_id):'cash'),
    bank:r.bank_id?String(r.bank_id):'',expected:Number(r.expected_deposit||0),party:r.party||'',sign:Number(r.adjustment_sign||1),note:r.note||''
  }));
}
async function isAdminSession(){
  const {data:{session}}=await sb.auth.getSession();
  if(!session){currentUser=null;return false}
  const {data,error}=await sb.rpc('is_admin');
  if(error||data!==true){currentUser=null;return false}
  currentUser=session.user;return true;
}

/* Login / Admin */
$('loginBtn').addEventListener('click',async()=>{try{if(await isAdminSession())await showAdmin();else openModal('loginModal')}catch(e){$('loginError').textContent=errMsg(e);openModal('loginModal')}});
$('doLogin').addEventListener('click',async()=>{
  const email=$('loginUser').value.trim(),password=$('loginPass').value;
  $('loginError').textContent='';
  if(!email||!password){$('loginError').textContent='Enter admin email and password.';return}
  const btn=$('doLogin');btn.disabled=true;btn.textContent='Logging in...';
  try{
    const {error}=await sb.auth.signInWithPassword({email,password});if(error)throw error;
    if(!(await isAdminSession())){await sb.auth.signOut();throw new Error('This account is not authorized as admin.')}
    $('loginPass').value='';closeModal('loginModal');await showAdmin();
  }catch(e){$('loginError').textContent=errMsg(e)}finally{btn.disabled=false;btn.textContent='Login'}
});
$('loginPass').addEventListener('keydown',e=>{if(e.key==='Enter')$('doLogin').click()});
async function showAdmin(){
  if(!(await isAdminSession())){openModal('loginModal');return}
  await loadPublicData();await loadPrivateData();$('publicApp').classList.add('hidden');$('adminApp').classList.remove('hidden');renderAdminAll();window.scrollTo(0,0)
}
function showPublic(){$('adminApp').classList.add('hidden');$('publicApp').classList.remove('hidden');renderPublic();window.scrollTo(0,0)}
$('viewPublicBtn').addEventListener('click',showPublic);
$('logoutBtn').addEventListener('click',async()=>{await sb.auth.signOut();currentUser=null;showPublic()});
$('adminSide').addEventListener('click',e=>{const b=e.target.closest('button[data-page]');if(!b)return;document.querySelectorAll('.admin-side button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.admin-page').forEach(x=>x.classList.remove('active'));$('page-'+b.dataset.page).classList.add('active')});
function renderAdminAll(){renderOverview();fillWebsiteEditor();renderProjectAdmin();renderCertAdmin();renderFinance();$('authUser').value=currentUser?.email||'';$('authPass').value=''}
function renderOverview(){$('ovProjects').textContent=site.projects.length;$('ovCerts').textContent=site.certificates.length;$('ovTx').textContent=finance.transactions.length;$('ovBanks').textContent=finance.banks.length}

/* Website editor */
const SITE_FIELDS=[['edBrand','brand'],['edProfileName','profileName'],['edProfileRole','profileRole'],['edProfilePhoto','profilePhoto'],['edKicker','kicker'],['edHero1','hero1'],['edHero2','hero2'],['edLead','lead'],['edAboutHeading','aboutHeading'],['edAboutIntro','aboutIntro'],['edFocusQuote','focusQuote'],['edFocusText','focusText'],['edCertHeading','certHeading'],['edCertIntro','certIntro'],['edContactKicker','contactKicker'],['edContactTitle','contactTitle'],['edContactText','contactText'],['edContactNote','contactNote'],['edFooter','footer'],['edNavAbout','navAbout'],['edNavProjects','navProjects'],['edNavCertificates','navCertificates'],['edNavSkills','navSkills'],['edNavJourney','navJourney'],['edNavContact','navContact'],['edProjectsHeading','projectsHeading'],['edProjectsIntro','projectsIntro'],['edSkillsHeading','skillsHeading'],['edSkillsIntro','skillsIntro'],['edJourneyHeading','journeyHeading'],['edJourneyIntro','journeyIntro'],['edStat1','stat1'],['edStat2','stat2'],['edStat3','stat3'],['edStat4','stat4'],['edSkill1Title','skill1Title'],['edSkill1Text','skill1Text'],['edSkill2Title','skill2Title'],['edSkill2Text','skill2Text'],['edSkill3Title','skill3Title'],['edSkill3Text','skill3Text'],['edJourney1Label','journey1Label'],['edJourney1Title','journey1Title'],['edJourney1Text','journey1Text'],['edJourney2Label','journey2Label'],['edJourney2Title','journey2Title'],['edJourney2Text','journey2Text'],['edJourney3Label','journey3Label'],['edJourney3Title','journey3Title'],['edJourney3Text','journey3Text'],['edJourney4Label','journey4Label'],['edJourney4Title','journey4Title'],['edJourney4Text','journey4Text']];
const VIS_FIELDS=[['visAbout','about'],['visProjects','projects'],['visCerts','certificates'],['visSkills','skills'],['visJourney','journey'],['visContact','contact']];
function fillWebsiteEditor(){const c=site.content;SITE_FIELDS.forEach(([id,k])=>$(id).value=c[k]||'');VIS_FIELDS.forEach(([id,k])=>$(id).checked=site.visibility[k]!==false)}
$('saveSiteBtn').addEventListener('click',async()=>{
  const btn=$('saveSiteBtn');btn.disabled=true;btn.textContent='Saving...';
  try{
    const c=site.content;SITE_FIELDS.forEach(([id,k])=>c[k]=$(id).value.trim());VIS_FIELDS.forEach(([id,k])=>site.visibility[k]=$(id).checked);
    const payload={setting_key:'main',full_name:c.profileName||'Sagar Adhikari',headline:c.profileRole||'',about:c.aboutIntro||'',profile_image_url:c.profilePhoto||null,content:c,visibility:site.visibility};
    const {data,error}=await sb.from('site_settings').upsert(payload,{onConflict:'setting_key'}).select().single();if(error)throw error;siteRowId=data.id;renderPublic();alert('Website changes saved to Supabase cloud.');
  }catch(e){alert('Save failed: '+errMsg(e))}finally{btn.disabled=false;btn.textContent='Save Website Changes'}
});

/* Projects */
function renderProjectAdmin(){$('projectAdminList').innerHTML=site.projects.length?site.projects.map(p=>`<div class="item-row"><div><strong>${esc(p.no)} — ${esc(p.title)}</strong><span>${esc(p.desc)}</span><div class="path-code">${esc((p.tags||[]).join(', '))}</div></div><div class="admin-actions"><button class="icon-btn" data-edit-project="${esc(p.id)}">Edit</button><button class="icon-btn" data-del-project="${esc(p.id)}">Delete</button></div></div>`).join(''):'<div class="muted">No projects.</div>';document.querySelectorAll('[data-edit-project]').forEach(b=>b.addEventListener('click',()=>editProject(b.dataset.editProject)));document.querySelectorAll('[data-del-project]').forEach(b=>b.addEventListener('click',()=>deleteProject(b.dataset.delProject)))}
$('addProjectBtn').addEventListener('click',()=>editProject(''));
function editProject(id){const p=site.projects.find(x=>String(x.id)===String(id))||{id:'',no:'PROJECT '+String(site.projects.length+1).padStart(2,'0'),title:'',desc:'',tags:[]};$('projectModalTitle').textContent=id?'Edit Project':'Add Project';$('projectId').value=p.id;$('projectNo').value=p.no;$('projectTitle').value=p.title;$('projectDesc').value=p.desc;$('projectTags').value=(p.tags||[]).join(', ');openModal('projectModal')}
$('saveProjectBtn').addEventListener('click',async()=>{
  const id=$('projectId').value,p={no:$('projectNo').value.trim(),title:$('projectTitle').value.trim(),desc:$('projectDesc').value.trim(),tags:$('projectTags').value.split(',').map(x=>x.trim()).filter(Boolean)};if(!p.title)return alert('Project title is required.');
  const payload={project_no:p.no||null,title:p.title,description:p.desc,tags:p.tags,is_active:true};
  try{let q;if(id)q=sb.from('projects').update(payload).eq('id',id);else q=sb.from('projects').insert({...payload,display_order:site.projects.length+1});const {error}=await q;if(error)throw error;closeModal('projectModal');await loadPublicData();renderProjectAdmin();renderOverview()}catch(e){alert('Project save failed: '+errMsg(e))}
});
async function deleteProject(id){if(!confirm('Delete this project?'))return;try{const {error}=await sb.from('projects').delete().eq('id',id);if(error)throw error;await loadPublicData();renderProjectAdmin();renderOverview()}catch(e){alert('Delete failed: '+errMsg(e))}}

/* Certificates */
function renderCertAdmin(){$('certAdminList').innerHTML=site.certificates.length?site.certificates.map(c=>`<div class="item-row"><div><strong>${esc(c.title)}</strong><span>${esc(c.issuer)}${c.year?' • '+esc(c.year):''}</span><div class="path-code">Image: ${esc(c.image)}${c.pdf?'<br>PDF: '+esc(c.pdf):''}</div></div><div class="admin-actions"><button class="icon-btn" data-edit-cert="${esc(c.id)}">Edit</button><button class="icon-btn" data-del-cert="${esc(c.id)}">Delete</button></div></div>`).join(''):'<div class="muted">No certificates.</div>';document.querySelectorAll('[data-edit-cert]').forEach(b=>b.addEventListener('click',()=>editCert(b.dataset.editCert)));document.querySelectorAll('[data-del-cert]').forEach(b=>b.addEventListener('click',()=>deleteCert(b.dataset.delCert)))}
$('addCertBtn').addEventListener('click',()=>editCert(''));
function editCert(id){const c=site.certificates.find(x=>String(x.id)===String(id))||{id:'',title:'',issuer:'',year:'',image:'assets/certificates/',pdf:''};$('certEditTitle').textContent=id?'Edit Certificate':'Add Certificate';$('certId').value=c.id;$('certTitleInput').value=c.title;$('certIssuer').value=c.issuer;$('certYear').value=c.year;$('certImagePath').value=c.image;$('certPdfPath').value=c.pdf||'';openModal('certEditModal')}
$('saveCertBtn').addEventListener('click',async()=>{
  const id=$('certId').value,c={title:$('certTitleInput').value.trim(),issuer:$('certIssuer').value.trim(),year:$('certYear').value.trim(),image:$('certImagePath').value.trim(),pdf:$('certPdfPath').value.trim()};if(!c.title||!c.image)return alert('Certificate title and image path are required.');
  const payload={title:c.title,issuer:c.issuer||null,year_text:c.year||null,image_url:c.image,certificate_url:c.pdf||null,is_active:true};
  try{let q;if(id)q=sb.from('certificates').update(payload).eq('id',id);else q=sb.from('certificates').insert({...payload,display_order:site.certificates.length+1});const {error}=await q;if(error)throw error;closeModal('certEditModal');await loadPublicData();renderCertAdmin();renderOverview()}catch(e){alert('Certificate save failed: '+errMsg(e))}
});
async function deleteCert(id){if(!confirm('Delete this certificate entry? The actual image/PDF file will not be deleted.'))return;try{const {error}=await sb.from('certificates').delete().eq('id',id);if(error)throw error;await loadPublicData();renderCertAdmin();renderOverview()}catch(e){alert('Delete failed: '+errMsg(e))}}

/* Finance */
const TYPE_LABEL={income:'Income / Received',expense:'Expense',bank_deposit:'Bank Deposit',bank_withdrawal:'Bank Withdrawal',loan_given:'Loan Given',loan_given_return:'Loan Given Return',loan_received:'Loan Received',loan_received_repay:'Loan Received Repayment',adjustment:'Adjustment'};
const todayISO=()=>{const d=new Date(),z=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())};
const money=n=>'Rs. '+Number(n||0).toLocaleString(undefined,{maximumFractionDigits:2});
function accountName(id){if(id==='cash')return 'Cash in Hand';const b=finance.banks.find(x=>String(x.id)===String(id));return b?b.name:'Unknown'}
function updateAccountOptions(){const opts='<option value="cash">Cash in Hand</option>'+finance.banks.map(b=>`<option value="${esc(b.id)}">${esc(b.name)}</option>`).join('');$('txAccount').innerHTML=opts;$('txBank').innerHTML=finance.banks.length?finance.banks.map(b=>`<option value="${esc(b.id)}">${esc(b.name)}</option>`).join(''):'<option value="">Add a bank first</option>'}
function calc(){let cash=0,banks={},depDiff=0,lg={},lr={},todayIncome=0,todayExpense=0;finance.banks.forEach(b=>banks[b.id]=Number(b.openingBalance||0));const add=(acc,v)=>{if(acc==='cash')cash+=v;else banks[acc]=(banks[acc]||0)+v};for(const t of finance.transactions){const a=Number(t.amount||0);if(t.type==='income')add(t.account,a);if(t.type==='expense')add(t.account,-a);if(t.type==='bank_deposit'){cash-=a;banks[t.bank]=(banks[t.bank]||0)+a;if(Number(t.expected)>0)depDiff+=a-Number(t.expected)}if(t.type==='bank_withdrawal'){banks[t.bank]=(banks[t.bank]||0)-a;cash+=a}if(t.type==='loan_given'){add(t.account,-a);lg[t.party||'Unspecified']=(lg[t.party||'Unspecified']||0)+a}if(t.type==='loan_given_return'){add(t.account,a);lg[t.party||'Unspecified']=(lg[t.party||'Unspecified']||0)-a}if(t.type==='loan_received'){add(t.account,a);lr[t.party||'Unspecified']=(lr[t.party||'Unspecified']||0)+a}if(t.type==='loan_received_repay'){add(t.account,-a);lr[t.party||'Unspecified']=(lr[t.party||'Unspecified']||0)-a}if(t.type==='adjustment')add(t.account,a*Number(t.sign||1));if(t.date===todayISO()){if(t.type==='income')todayIncome+=a;if(t.type==='expense')todayExpense+=a}}return{cash,banks,depDiff,lg,lr,todayIncome,todayExpense}}
function renderFinance(){if(!Array.isArray(finance.banks))finance.banks=[];if(!Array.isArray(finance.transactions))finance.transactions=[];updateAccountOptions();renderSummary();renderBanks();renderLoans();renderHistory();if(!$('txDate').value)$('txDate').value=todayISO();updateTxFields()}
function renderSummary(){const c=calc(),bankTotal=Object.values(c.banks).reduce((a,b)=>a+b,0),lg=Object.values(c.lg).reduce((a,b)=>a+Math.max(0,b),0),lr=Object.values(c.lr).reduce((a,b)=>a+Math.max(0,b),0);$('cashBalance').textContent=money(c.cash);$('bankTotal').textContent=money(bankTotal);$('loanGivenTotal').textContent=money(lg);$('loanReceivedTotal').textContent=money(lr);$('depositDifference').textContent=(c.depDiff>0?'+':'')+money(c.depDiff);$('depositDiffNote').textContent=c.depDiff>0?'Over-deposited; reduce a future deposit to adjust':c.depDiff<0?'Short-deposited; add the difference later':'Actual − expected';$('todayIncome').textContent=money(c.todayIncome);$('todayExpense').textContent=money(c.todayExpense);$('txCount').textContent=finance.transactions.length}
function renderBanks(){$('bankList').innerHTML=finance.banks.length?finance.banks.map(b=>`<div class="bank-row"><div><strong>${esc(b.name)}</strong><div class="muted" style="font-size:12px">Current balance</div></div><div style="display:flex;align-items:center;gap:8px"><strong>${money(calc().banks[b.id]||0)}</strong><button class="icon-btn" data-del-bank="${esc(b.id)}">Delete</button></div></div>`).join(''):'<div class="muted">No bank added yet.</div>';document.querySelectorAll('[data-del-bank]').forEach(b=>b.addEventListener('click',()=>deleteBank(b.dataset.delBank)))}
async function deleteBank(id){if(finance.transactions.some(t=>String(t.account)===String(id)||String(t.bank)===String(id)))return alert('This bank is already used in transactions, so it cannot be deleted.');if(!confirm('Delete this bank?'))return;try{const {error}=await sb.from('banks').delete().eq('id',id);if(error)throw error;await loadPrivateData();renderFinance();renderOverview()}catch(e){alert('Bank delete failed: '+errMsg(e))}}
$('addBank').addEventListener('click',async()=>{const name=$('newBankName').value.trim();if(!name)return;try{const {error}=await sb.from('banks').insert({bank_name:name,display_order:finance.banks.length+1});if(error)throw error;$('newBankName').value='';await loadPrivateData();renderFinance();renderOverview()}catch(e){alert('Bank save failed: '+errMsg(e))}});
function updateTxFields(){const type=$('txType').value,isBank=type==='bank_deposit'||type==='bank_withdrawal',isLoan=type.startsWith('loan_'),isAdj=type==='adjustment';$('accountField').classList.toggle('hidden',isBank);$('bankField').classList.toggle('hidden',!isBank);$('expectedField').classList.toggle('hidden',type!=='bank_deposit');$('partyField').classList.toggle('hidden',!isLoan);$('signField').classList.toggle('hidden',!isAdj);updateDepositHint()}
$('txType').addEventListener('change',updateTxFields);$('txExpected').addEventListener('input',updateDepositHint);$('txAmount').addEventListener('input',updateDepositHint);
function updateDepositHint(){if($('txType').value!=='bank_deposit')return $('depositHint').textContent='';const expected=Number($('txExpected').value||0),current=calc().depDiff;if(expected>0){const suggested=Math.max(0,expected-current);$('depositHint').textContent='Running deposit difference is '+(current>0?'+':'')+money(current)+'. Suggested actual deposit to adjust: '+money(suggested)+'.'}else $('depositHint').textContent='Enter expected deposit to track over/under deposit automatically.'}
function readTx(){return{id:editingTx,date:$('txDate').value,type:$('txType').value,amount:Number($('txAmount').value),account:$('txAccount').value,bank:$('txBank').value,expected:Number($('txExpected').value||0),party:$('txParty').value.trim(),sign:Number($('txSign').value||1),note:$('txNote').value.trim()}}
function validateTx(t){if(!t.date)return'Please select a date.';if(!(t.amount>0))return'Please enter an amount greater than 0.';if((t.type==='bank_deposit'||t.type==='bank_withdrawal')&&!t.bank)return'Please add/select a bank first.';if(t.type.startsWith('loan_')&&!t.party)return'Please enter person or organization name.';return''}
function txDbPayload(t){const isBankMove=t.type==='bank_deposit'||t.type==='bank_withdrawal';return{transaction_date:t.date,transaction_type:t.type,amount:t.amount,account_type:isBankMove?null:(t.account==='cash'?'cash':'bank'),account_bank_id:isBankMove||t.account==='cash'?null:Number(t.account),bank_id:isBankMove?Number(t.bank):null,expected_deposit:Number(t.expected||0),party:t.party||null,adjustment_sign:Number(t.sign||1),note:t.note||null}}
$('saveTx').addEventListener('click',async()=>{const t=readTx(),err=validateTx(t);$('txError').textContent=err;if(err)return;const btn=$('saveTx');btn.disabled=true;try{const payload=txDbPayload(t);let q;if(editingTx)q=sb.from('transactions').update(payload).eq('id',editingTx);else q=sb.from('transactions').insert(payload);const {error}=await q;if(error)throw error;resetTxForm();await loadPrivateData();renderFinance();renderOverview()}catch(e){$('txError').textContent=errMsg(e)}finally{btn.disabled=false}});
function resetTxForm(){editingTx=null;$('formTitle').textContent='Add Transaction';$('saveTx').textContent='Save Transaction';$('cancelEdit').classList.add('hidden');$('txDate').value=todayISO();$('txType').value='income';$('txAmount').value='';$('txExpected').value='';$('txParty').value='';$('txNote').value='';$('txSign').value='1';$('txError').textContent='';updateAccountOptions();updateTxFields()}
$('cancelEdit').addEventListener('click',resetTxForm);
function getFiltered(){let a=[...finance.transactions].sort((x,y)=>(y.date||'').localeCompare(x.date||'')||String(y.id).localeCompare(String(x.id)));const f=$('filterFrom').value,t=$('filterTo').value,ty=$('filterType').value,q=$('filterSearch').value.trim().toLowerCase();if(f)a=a.filter(x=>x.date>=f);if(t)a=a.filter(x=>x.date<=t);if(ty)a=a.filter(x=>x.type===ty);if(q)a=a.filter(x=>((x.party||'')+' '+(x.note||'')+' '+accountName(x.account||x.bank)).toLowerCase().includes(q));return a}
function renderHistory(){const rows=getFiltered();$('historyBody').innerHTML=rows.length?rows.map(t=>{const diff=t.type==='bank_deposit'&&Number(t.expected)>0?Number(t.amount)-Number(t.expected):null,acc=t.type==='bank_deposit'||t.type==='bank_withdrawal'?accountName(t.bank):accountName(t.account),cls=['income','loan_given_return','loan_received','bank_withdrawal'].includes(t.type)?'amount-pos':['expense','loan_given','loan_received_repay','bank_deposit'].includes(t.type)?'amount-neg':'';return`<tr><td>${esc(t.date)}</td><td>${esc(TYPE_LABEL[t.type]||t.type)}</td><td class="${cls}">${money(t.amount)}</td><td>${esc(acc)}</td><td>${esc(t.party||'—')}</td><td>${Number(t.expected)>0?money(t.expected):'—'}</td><td>${diff===null?'—':(diff>0?'+':'')+money(diff)}</td><td>${esc(t.note||'—')}</td><td><button class="icon-btn" data-edit-tx="${esc(t.id)}">Edit</button> <button class="icon-btn" data-del-tx="${esc(t.id)}">Delete</button></td></tr>`}).join(''):'<tr><td colspan="9" class="muted">No transactions found.</td></tr>';document.querySelectorAll('[data-edit-tx]').forEach(b=>b.addEventListener('click',()=>editTx(b.dataset.editTx)));document.querySelectorAll('[data-del-tx]').forEach(b=>b.addEventListener('click',()=>deleteTx(b.dataset.delTx)))}
function editTx(id){const t=finance.transactions.find(x=>String(x.id)===String(id));if(!t)return;editingTx=id;$('formTitle').textContent='Edit Transaction';$('saveTx').textContent='Update Transaction';$('cancelEdit').classList.remove('hidden');$('txDate').value=t.date;$('txType').value=t.type;updateAccountOptions();$('txAccount').value=t.account||'cash';$('txBank').value=t.bank||'';$('txAmount').value=t.amount;$('txExpected').value=t.expected||'';$('txParty').value=t.party||'';$('txSign').value=String(t.sign||1);$('txNote').value=t.note||'';updateTxFields();$('transactionCard').scrollIntoView({behavior:'smooth',block:'start'})}
async function deleteTx(id){if(!confirm('Delete this transaction? Balances will recalculate automatically.'))return;try{const {error}=await sb.from('transactions').delete().eq('id',id);if(error)throw error;if(String(editingTx)===String(id))resetTxForm();await loadPrivateData();renderFinance();renderOverview()}catch(e){alert('Transaction delete failed: '+errMsg(e))}}
function renderLoans(){const c=calc(),make=obj=>{const e=Object.entries(obj).filter(([,v])=>Math.abs(v)>.0001).sort((a,b)=>b[1]-a[1]);return e.length?e.map(([p,v])=>`<div class="loan-row"><span>${esc(p)}</span><strong>${money(Math.max(0,v))}</strong></div>`).join(''):'<div class="muted">No outstanding loan.</div>'};$('loanGivenList').innerHTML=make(c.lg);$('loanReceivedList').innerHTML=make(c.lr)}
['filterFrom','filterTo','filterType','filterSearch'].forEach(id=>$(id).addEventListener('input',renderHistory));$('clearFilters').addEventListener('click',()=>{$('filterFrom').value='';$('filterTo').value='';$('filterType').value='';$('filterSearch').value='';renderHistory()});
function download(name,text,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
$('exportCsv').addEventListener('click',()=>{const rows=getFiltered(),head=['Date','Type','Amount','Account/Bank','Party','Expected Deposit','Deposit Difference','Note'],csv=[head,...rows.map(t=>{const diff=t.type==='bank_deposit'&&Number(t.expected)>0?Number(t.amount)-Number(t.expected):'',acc=t.type==='bank_deposit'||t.type==='bank_withdrawal'?accountName(t.bank):accountName(t.account);return[t.date,TYPE_LABEL[t.type]||t.type,t.amount,acc,t.party||'',t.expected||'',diff,t.note||'']})].map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\n');download('Sagar_Personal_Transactions_'+todayISO()+'.csv',csv,'text/csv;charset=utf-8')});
$('exportFinance').addEventListener('click',()=>download('Sagar_Finance_Backup_'+todayISO()+'.json',JSON.stringify(finance,null,2),'application/json'));

/* Backup / security */
$('exportAll').addEventListener('click',()=>download('Sagar_Personal_Website_FULL_Backup_'+todayISO()+'.json',JSON.stringify({version:5,source:'supabase',site,finance},null,2),'application/json'));
async function restoreBackupToCloud(x){
  if(!x.site||!x.finance)throw new Error('Invalid backup file.');
  const backupSite=clone(x.site),backupFinance=clone(x.finance);
  backupSite.content={...DEFAULT_SITE.content,...(backupSite.content||{})};backupSite.visibility={...DEFAULT_SITE.visibility,...(backupSite.visibility||{})};
  let r=await sb.from('transactions').delete().gt('id',0);if(r.error)throw r.error;
  r=await sb.from('banks').delete().gt('id',0);if(r.error)throw r.error;
  r=await sb.from('projects').delete().gt('id',0);if(r.error)throw r.error;
  r=await sb.from('certificates').delete().gt('id',0);if(r.error)throw r.error;
  r=await sb.from('site_settings').upsert({setting_key:'main',full_name:backupSite.content.profileName||'Sagar Adhikari',headline:backupSite.content.profileRole||'',about:backupSite.content.aboutIntro||'',profile_image_url:backupSite.content.profilePhoto||null,content:backupSite.content,visibility:backupSite.visibility},{onConflict:'setting_key'});if(r.error)throw r.error;
  if((backupSite.projects||[]).length){r=await sb.from('projects').insert(backupSite.projects.map((p,i)=>({project_no:p.no||null,title:p.title,description:p.desc||'',tags:p.tags||[],display_order:i+1,is_active:true})));if(r.error)throw r.error}
  if((backupSite.certificates||[]).length){r=await sb.from('certificates').insert(backupSite.certificates.map((c,i)=>({title:c.title,issuer:c.issuer||null,year_text:c.year||null,image_url:c.image||'',certificate_url:c.pdf||null,display_order:i+1,is_active:true})));if(r.error)throw r.error}
  const oldBanks=backupFinance.banks||[];const idMap={};
  if(oldBanks.length){r=await sb.from('banks').insert(oldBanks.map((b,i)=>({bank_name:b.name,opening_balance:Number(b.openingBalance||0),display_order:i+1,is_active:true}))).select();if(r.error)throw r.error;(r.data||[]).forEach((nb,i)=>idMap[String(oldBanks[i].id)]=String(nb.id))}
  const oldTx=backupFinance.transactions||[];
  if(oldTx.length){const payloads=oldTx.map(t=>{const cp={...t};if(cp.account!=='cash'&&cp.account)cp.account=idMap[String(cp.account)]||cp.account;if(cp.bank)cp.bank=idMap[String(cp.bank)]||cp.bank;return txDbPayload(cp)});r=await sb.from('transactions').insert(payloads);if(r.error)throw r.error}
  await loadPublicData();await loadPrivateData();renderAdminAll();
}
$('importAll').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=async ev=>{try{const x=JSON.parse(ev.target.result);if(!confirm('Restore this backup to Supabase? Current cloud website and finance data will be replaced.'))return;await restoreBackupToCloud(x);alert('Backup restored to Supabase cloud.')}catch(err){alert('Restore failed: '+errMsg(err))}finally{e.target.value=''}};rd.readAsText(f)});
$('saveAuth').addEventListener('click',async()=>{const email=$('authUser').value.trim(),password=$('authPass').value;const changes={};if(email&&email!==currentUser?.email)changes.email=email;if(password)changes.password=password;if(!Object.keys(changes).length)return alert('Enter a new email or new password first.');try{const {data,error}=await sb.auth.updateUser(changes);if(error)throw error;currentUser=data.user||currentUser;$('authPass').value='';alert(changes.email?'Credentials updated. If Supabase requests email confirmation, confirm the new email before using it to log in.':'Password updated successfully.')}catch(e){alert('Credential update failed: '+errMsg(e))}});
$('resetSite').addEventListener('click',async()=>{if(!confirm('Reset website content, projects and certificate entries to package defaults in Supabase?'))return;try{const backup={site:clone(DEFAULT_SITE),finance:clone(finance)};const currentFinance=clone(finance);await sb.from('projects').delete().gt('id',0);await sb.from('certificates').delete().gt('id',0);let r=await sb.from('site_settings').upsert({setting_key:'main',full_name:DEFAULT_SITE.content.profileName,headline:DEFAULT_SITE.content.profileRole,about:DEFAULT_SITE.content.aboutIntro,profile_image_url:DEFAULT_SITE.content.profilePhoto,content:DEFAULT_SITE.content,visibility:DEFAULT_SITE.visibility},{onConflict:'setting_key'});if(r.error)throw r.error;r=await sb.from('projects').insert(DEFAULT_SITE.projects.map((p,i)=>({project_no:p.no,title:p.title,description:p.desc,tags:p.tags,display_order:i+1,is_active:true})));if(r.error)throw r.error;r=await sb.from('certificates').insert(DEFAULT_SITE.certificates.map((c,i)=>({title:c.title,issuer:c.issuer,year_text:c.year,image_url:c.image,certificate_url:c.pdf||null,display_order:i+1,is_active:true})));if(r.error)throw r.error;finance=currentFinance;await loadPublicData();renderAdminAll();alert('Website reset to defaults in Supabase.')}catch(e){alert('Reset failed: '+errMsg(e))}});
$('resetFinance').addEventListener('click',async()=>{if(!confirm('DELETE ALL Supabase finance data (transactions and banks)? This cannot be undone unless you have a backup.'))return;try{let r=await sb.from('transactions').delete().gt('id',0);if(r.error)throw r.error;r=await sb.from('banks').delete().gt('id',0);if(r.error)throw r.error;finance=clone(DEFAULT_FINANCE);resetTxForm();renderAdminAll();alert('All finance data deleted from Supabase.')}catch(e){alert('Delete failed: '+errMsg(e))}});

sb.auth.onAuthStateChange((_event,session)=>{currentUser=session?.user||null});
async function init(){
  try{renderPublic();resetTxForm();await loadPublicData();const {data:{session}}=await sb.auth.getSession();currentUser=session?.user||null;if(currentUser)$('loginUser').value=currentUser.email||''}
  catch(e){console.error('Supabase initialization error',e);renderPublic()}
}
init();
