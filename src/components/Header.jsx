import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Header({ theme, setTheme }) {
  const { t, i18n } = useTranslation(); 
  const [open, setOpen] = useState(false)
  const links = [['/', t('home')], ['/projects', t('projects')], ['/about', t('about')], ['/contact', t('contact')]]

  return (
    <motion.header className="header" initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
      <div className="nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark">U<span>.</span></span>
          <span>UVAYS <b>STUDIO</b><small>BUILD. CREATE. INNOVATE.</small></span>
        </Link>
        <AnimatePresence>
          {<motion.nav initial={false} className={open ? 'nav-links open' : 'nav-links'}>
            {links.map(([to, label], i) => (
              <motion.div key={to} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .045, duration: .25 }}>
                <NavLink to={to} onClick={() => setOpen(false)}>{label}</NavLink>
              </motion.div>
            ))}
          </motion.nav>}
        </AnimatePresence>
        <div className="nav-actions">
          <select aria-label="Language" className="lang-select" value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
            <option value="uz">🇺🇿 UZ</option>
            <option value="ru">🇷🇺 RU</option>
            <option value="en">🇬🇧 EN</option>
          </select>
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          
          {/* Nút dấu chấm ẩn hoàn toàn (opacity: 0) - Bấm vào khoảng trống này vẫn sang trang /admin */}
          <Link 
            to="/admin" 
            style={{ 
              textDecoration: 'none', 
              color: 'transparent', 
              padding: '0 6px', 
              opacity: 0, 
              userSelect: 'none' 
            }}
          >
            .
          </Link>

          <button className="icon-btn mobile-menu" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </motion.header>
  )
}