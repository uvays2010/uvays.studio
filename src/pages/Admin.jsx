import { useEffect, useState } from 'react'
import { Link, NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, Plus, LogOut, ShieldCheck, Trash2, Edit3, UploadCloud, Database } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const ADMIN_KEY = 'uvays_admin_password'
const empty = { title:'', category:'Web', description_uz:'', description_ru:'', description_en:'', project_url:'', video_url:'', status:'published', featured:false, technologies:'', sort_order:0, image_url:'' }
async function adminRequest(action, payload = {}) {
  const password = sessionStorage.getItem(ADMIN_KEY)
  const { data, error } = await supabase.functions.invoke('admin-api', { body: { action, password, payload } })
  if (error) throw new Error(error.message || 'Admin API request failed')
  if (data?.error) throw new Error(data.error)
  return data
}
function Login({ onLogin }) {
  const { t } = useTranslation()
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [busy,setBusy] = useState(false)
  async function go(e) {
    e.preventDefault(); setBusy(true); setError('')
    try {
      sessionStorage.setItem(ADMIN_KEY,password)
      await adminRequest('ping')
      onLogin()
    } catch (err) {
      sessionStorage.removeItem(ADMIN_KEY)
      setError(err.message || 'Parol noto‘g‘ri yoki Admin API sozlanmagan.')
    } finally { setBusy(false) }
  }
  return <div className="login-wrap"><form className="login-card" onSubmit={go}><div className="brand-mark">U<span>.</span></div><div className="eyebrow">UVAYS STUDIO / SECURE ACCESS</div><h1>{t('admin')}</h1><p>Admin panelga kirish uchun parolni kiriting.</p><input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={t('password')}/><button className="btn-primary" disabled={busy}>{busy?'Tekshirilmoqda…':t('login')}</button>{error&&<p className="form-status error-text">{error}</p>}</form></div>
}
function ProjectEditor({ project,onDone }) {
  const {t}=useTranslation()
  const [form,setForm]=useState(project||empty),[file,setFile]=useState(null),[busy,setBusy]=useState(false),[msg,setMsg]=useState('')
  function set(k,v){setForm(f=>({...f,[k]:v}))}
  async function save(e){
    e.preventDefault();setBusy(true);setMsg('')
    try {
      let image_url=form.image_url
      if(file){
        const bytes=new Uint8Array(await file.arrayBuffer())
        let binary=''; bytes.forEach(b=>binary+=String.fromCharCode(b))
        const base64=btoa(binary)
        const uploaded=await adminRequest('upload',{name:file.name,mime:file.type,base64})
        image_url=uploaded.url
      }
      const payload={...form,image_url,technologies:typeof form.technologies==='string'?form.technologies.split(',').map(x=>x.trim()).filter(Boolean):form.technologies,sort_order:Number(form.sort_order)}
      delete payload.created_at; delete payload.updated_at
      await adminRequest(project?'project.update':'project.create',project?{...payload,id:project.id}:payload)
      setMsg(t('saved'));setTimeout(onDone,500)
    } catch(err){setMsg(err.message||t('error'))} finally{setBusy(false)}
  }
  return <form className="editor-form" onSubmit={save}><div className="editor-heading"><div><div className="eyebrow">CONTENT MANAGEMENT</div><h2>{project?t('edit'):t('addProject')}</h2></div></div><label>{t('title')}<input required value={form.title} onChange={e=>set('title',e.target.value)}/></label><label>{t('category')}<input value={form.category} onChange={e=>set('category',e.target.value)}/></label><div className="three-fields"><label>UZ — {t('description')}<textarea rows="4" value={form.description_uz} onChange={e=>set('description_uz',e.target.value)}/></label><label>RU — {t('description')}<textarea rows="4" value={form.description_ru} onChange={e=>set('description_ru',e.target.value)}/></label><label>EN — {t('description')}<textarea rows="4" value={form.description_en} onChange={e=>set('description_en',e.target.value)}/></label></div><label>{t('image')}<span className="upload-field"><UploadCloud/><input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)}/></span></label><label>{t('url')}<input type="url" value={form.project_url} onChange={e=>set('project_url',e.target.value)}/></label><label>{t('video')}<input type="url" value={form.video_url} onChange={e=>set('video_url',e.target.value)}/></label><label>{t('technologiesField')}<input value={Array.isArray(form.technologies)?form.technologies.join(', '):form.technologies} onChange={e=>set('technologies',e.target.value)} placeholder="React, Vite, Supabase"/></label><div className="two-fields"><label>{t('status')}<select value={form.status} onChange={e=>set('status',e.target.value)}><option value="published">{t('published')}</option><option value="draft">{t('draft')}</option><option value="hidden">{t('hidden')}</option></select></label><label>Sort order<input type="number" value={form.sort_order} onChange={e=>set('sort_order',e.target.value)}/></label></div><label className="check-label"><input type="checkbox" checked={form.featured} onChange={e=>set('featured',e.target.checked)}/>{t('featuredLabel')}</label><div className="editor-actions"><button className="btn-primary" disabled={busy}>{busy?'…':t('save')}</button><button type="button" className="btn-quiet" onClick={onDone}>{t('cancel')}</button></div>{msg&&<p className="form-status">{msg}</p>}</form>
}
function ProjectsManager(){
 const {t}=useTranslation();const [rows,setRows]=useState([]),[editing,setEditing]=useState(null),[adding,setAdding]=useState(false),[error,setError]=useState('')
 async function load(){try{const d=await adminRequest('project.list');setRows(d.projects||[]);setError('')}catch(e){setError(e.message)}}
 useEffect(()=>{load()},[])
 async function remove(id){if(!confirm(t('deleteConfirm')))return;try{await adminRequest('project.delete',{id});load()}catch(e){setError(e.message)}}
 if(adding||editing)return <ProjectEditor project={editing} onDone={()=>{setAdding(false);setEditing(null);load()}}/>
 return <><div className="admin-page-heading"><div><div className="eyebrow">CMS / CONTENT</div><h2>{t('manageProjects')}</h2></div><button className="btn-primary" onClick={()=>setAdding(true)}><Plus/> {t('addProject')}</button></div>{error&&<p className="form-status error-text">{error}</p>}<div className="admin-table">{rows.map(p=><div className="admin-row" key={p.id}><div className="admin-thumb">{p.image_url?<img src={p.image_url} alt=""/>:<FolderKanban/>}</div><div className="admin-row-title"><b>{p.title}</b><small>{p.category} · {(p.technologies||[]).join(', ')}</small></div><span className={`status-pill ${p.status}`}>{p.status}</span><span>{p.featured?'★':''}</span><button className="icon-btn" onClick={()=>setEditing({...p,technologies:(p.technologies||[]).join(', ')})} aria-label="Edit"><Edit3/></button><button className="icon-btn danger" onClick={()=>remove(p.id)} aria-label="Delete"><Trash2/></button></div>)}{!rows.length&&<div className="empty-state"><FolderKanban/><h3>{t('noProjects')}</h3></div>}</div></>
}
function Dashboard(){
 const {t}=useTranslation();const [stats,setStats]=useState({total:0,published:0,drafts:0,featured:0}),[error,setError]=useState('')
 useEffect(()=>{adminRequest('stats').then(d=>setStats(d.stats)).catch(e=>setError(e.message))},[])
 return <><div className="admin-page-heading"><div><div className="eyebrow">OVERVIEW / ANALYTICS</div><h2>{t('dashboard')}</h2></div><span className="connected"><i/> Admin API</span></div>{error&&<p className="form-status error-text">{error}</p>}<div className="stat-grid">{[[t('total'),stats.total],[t('publishedCount'),stats.published],[t('drafts'),stats.drafts],[t('featured'),stats.featured]].map(([k,v])=><div className="stat-card" key={k}><span>{k}</span><b>{v}</b><small>Live database count</small></div>)}</div><div className="admin-note"><Database/><div><b>Supabase PostgreSQL</b><p>Admin actions are handled by a protected server-side Edge Function.</p></div></div></>
}
export default function Admin(){
 const {t}=useTranslation();const [authenticated,setAuthenticated]=useState(!!sessionStorage.getItem(ADMIN_KEY));const nav=useNavigate()
 if(!isSupabaseConfigured)return <div className="section-shell page-top"><div className="empty-state"><Database/><h2>{t('configure')}</h2><p>Configure Supabase URL and publishable key in .env.</p></div></div>
 if(!authenticated)return <Login onLogin={()=>setAuthenticated(true)}/>
 return <div className="admin-layout"><aside className="admin-sidebar"><Link to="/" className="brand"><span className="brand-mark">U<span>.</span></span><span>UVAYS <b>STUDIO</b><small>CONTROL CENTER</small></span></Link><div className="sidebar-label">WORKSPACE</div><NavLink end to="/admin"><LayoutDashboard/>{t('dashboard')}</NavLink><NavLink to="/admin/projects"><FolderKanban/>{t('manageProjects')}</NavLink><div className="sidebar-label">SYSTEM</div><div className="sidebar-static"><Database/> Database status</div><button className="sidebar-logout" onClick={()=>{sessionStorage.removeItem(ADMIN_KEY);setAuthenticated(false);nav('/admin')}}><LogOut/>{t('logout')}</button></aside><main className="admin-main"><div className="admin-topbar"><span><ShieldCheck/> Authenticated admin</span><span>Password protected</span></div><Routes><Route index element={<Dashboard/>}/><Route path="projects" element={<ProjectsManager/>}/><Route path="*" element={<Dashboard/>}/></Routes></main></div>
}
