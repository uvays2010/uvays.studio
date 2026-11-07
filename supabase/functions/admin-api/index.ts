import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  try {
    const { action, password, payload = {} } = await req.json()
    const expected = Deno.env.get('ADMIN_PASSWORD')
    if (!expected) return json({ error: 'Server ADMIN_PASSWORD secret is not configured.' }, 500)
    if (typeof password !== 'string' || password !== expected) return json({ error: 'Parol noto‘g‘ri.' }, 401)
    const url = Deno.env.get('SUPABASE_URL')!
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const db = createClient(url, key, { auth: { persistSession: false } })
    if (action === 'ping') return json({ ok: true })
    if (action === 'stats') {
      const { data, error } = await db.from('projects').select('status,featured')
      if (error) throw error
      const rows = data || []
      return json({ stats: { total: rows.length, published: rows.filter(x=>x.status==='published').length, drafts: rows.filter(x=>x.status==='draft').length, featured: rows.filter(x=>x.featured).length } })
    }
    if (action === 'project.list') {
      const { data, error } = await db.from('projects').select('*').order('sort_order').order('created_at',{ascending:false})
      if (error) throw error
      return json({ projects: data || [] })
    }
    if (action === 'project.create') {
      const { data, error } = await db.from('projects').insert(payload).select().single()
      if (error) throw error
      return json({ project: data })
    }
    if (action === 'project.update') {
      const { id, ...values } = payload
      const { data, error } = await db.from('projects').update({ ...values, updated_at: new Date().toISOString() }).eq('id',id).select().single()
      if (error) throw error
      return json({ project: data })
    }
    if (action === 'project.delete') {
      const { error } = await db.from('projects').delete().eq('id',payload.id)
      if (error) throw error
      return json({ ok: true })
    }
    if (action === 'upload') {
      const raw = atob(payload.base64 || '')
      const bytes = new Uint8Array(raw.length)
      for (let i=0;i<raw.length;i++) bytes[i]=raw.charCodeAt(i)
      const ext = (payload.name || 'image').split('.').pop().replace(/[^a-zA-Z0-9]/g,'').slice(0,8) || 'img'
      const path = `${crypto.randomUUID()}.${ext}`
      const { error } = await db.storage.from('project-media').upload(path,bytes,{contentType:payload.mime || 'application/octet-stream',upsert:false})
      if (error) throw error
      const { data } = db.storage.from('project-media').getPublicUrl(path)
      return json({ url: data.publicUrl })
    }
    return json({ error: 'Unknown action' }, 400)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unexpected server error'
    return json({ error: message }, 400)
  }
})
