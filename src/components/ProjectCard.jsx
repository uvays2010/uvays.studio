import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function ProjectCard({project,index=0}) {
 const title=project.title||'Untitled'
 const desc=project.description||project.description_uz||project.description_en||project.description_ru||''
 return <motion.article className="project-card" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.45,delay:Math.min(index*.06,.24)}} whileHover={{y:-10,rotateX:2.5,rotateY:-2,scale:1.012}} whileTap={{scale:.985}} style={{transformStyle:'preserve-3d'}} transition={{type:'spring',stiffness:260,damping:20}}>
   <Link to={`/projects/${project.id}`} className="project-image">{project.image_url?<img src={project.image_url} alt={title}/>:<div className="image-placeholder"><span>UVAYS</span><b>STUDIO</b></div>}{project.featured&&<span className="featured-tag"><Star size={13}/> Featured</span>}<span className="image-arrow"><ArrowUpRight/></span></Link>
   <div className="project-meta"><span>{project.category||'Project'}</span><span className="status-dot">{project.status==='published'?'● Live':'○ '+project.status}</span></div>
   <h3><Link to={`/projects/${project.id}`}>{title}</Link></h3><p>{desc}</p>
   <div className="tag-row">{(project.technologies||[]).slice(0,4).map(x=><span key={x}>{x}</span>)}</div>
 </motion.article>
}