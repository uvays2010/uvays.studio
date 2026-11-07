import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  uz: { translation: {
    home:'Bosh sahifa', projects:'Saytlarim', technologies:'Texnologiyalar', about:'Men haqimda', contact:'Aloqa',
    eyebrow:'MUSTAQIL DASTURCHI · DIGITAL CREATOR', hero1:'G‘oyalarni', hero2:'raqamli tajribaga', hero3:'aylantiraman.', heroDesc:'Men zamonaviy web-platformalar, foydali mahsulotlar va kuchli raqamli tajribalar yarataman.',
    explore:'Loyihalarni ko‘rish', contactMe:'Bog‘lanish', selected:'Tanlangan ishlar', selectedDesc:'G‘oyadan tayyor mahsulotgacha — eng so‘nggi ishlarim.',
    allProjects:'Barcha loyihalar', projectsTitle:'Loyihalar', projectsDesc:'Yaratilgan mahsulotlar, tajribalar va raqamli yechimlar.', search:'Loyiha qidirish...', all:'Barchasi', newest:'Eng yangi', oldest:'Avvalgilari', featured:'Tanlangan',
    noProjects:'Hozircha loyihalar yo‘q', noProjectsDesc:'Yangi loyihalar tez orada shu yerda paydo bo‘ladi.', loading:'Yuklanmoqda...', error:'Ma’lumotlarni yuklab bo‘lmadi.',
    technologiesTitle:'Texnologiyalar', aboutTitle:'Men haqimda', aboutText:'Men g‘oyalarni puxta rejalashtirilgan, chiroyli va qulay raqamli mahsulotlarga aylantirishni yaxshi ko‘raman.',
    contactTitle:'Birgalikda nimadir yarataylik', contactDesc:'Yangi loyiha, hamkorlik yoki shunchaki salom — xabaringizni kutaman.',
    name:'Ismingiz', email:'Email manzilingiz', message:'Xabaringiz', send:'Xabar yuborish', sent:'Xabaringiz yuborildi. Rahmat!', footer:'Barcha huquqlar himoyalangan.',
    admin:'Admin', login:'Kirish', logout:'Chiqish', dashboard:'Boshqaruv', manageProjects:'Loyihalar boshqaruvi', addProject:'Loyiha qo‘shish',
    title:'Loyiha nomi', description:'Tavsif', category:'Kategoriya', image:'Rasm', url:'Loyiha URL', video:'Video URL', status:'Holat', published:'Ochiq', draft:'Qoralama', hidden:'Yashirin',
    technologiesField:'Texnologiyalar (vergul bilan)', save:'Saqlash', cancel:'Bekor qilish', edit:'Tahrirlash', delete:'O‘chirish', featuredLabel:'Tanlangan loyiha', saved:'Ma’lumot bazaga saqlandi.', deleteConfirm:'Bu loyihani o‘chirishni tasdiqlaysizmi?',
    emailLabel:'Admin email', password:'Parol', loginError:'Kirish amalga oshmadi. Hisob va ruxsatlarni tekshiring.', configure:'Supabase sozlanmagan. README bo‘yicha .env faylini to‘ldiring.',
    total:'Jami loyihalar', publishedCount:'Ochiq', drafts:'Qoralamalar', favorites:'Saqlanganlar', filter:'Saralash', grid:'Grid', list:'Ro‘yxat'
  }},
  ru: { translation: {
    home:'Главная', projects:'Проекты', technologies:'Технологии', about:'Обо мне', contact:'Контакты',
    eyebrow:'НЕЗАВИСИМЫЙ РАЗРАБОТЧИК · DIGITAL CREATOR', hero1:'Превращаю', hero2:'идеи в цифровой', hero3:'опыт.', heroDesc:'Создаю современные веб-платформы, полезные продукты и яркие цифровые решения.',
    explore:'Смотреть проекты', contactMe:'Связаться', selected:'Избранные работы', selectedDesc:'От идеи до готового продукта — мои последние работы.',
    allProjects:'Все проекты', projectsTitle:'Проекты', projectsDesc:'Созданные продукты, эксперименты и цифровые решения.', search:'Поиск проекта...', all:'Все', newest:'Сначала новые', oldest:'Сначала старые', featured:'Избранное',
    noProjects:'Пока нет проектов', noProjectsDesc:'Новые проекты скоро появятся здесь.', loading:'Загрузка...', error:'Не удалось загрузить данные.',
    technologiesTitle:'Технологии', aboutTitle:'Обо мне', aboutText:'Мне нравится превращать идеи в продуманные, красивые и удобные цифровые продукты.',
    contactTitle:'Создадим что-нибудь вместе', contactDesc:'Новый проект, сотрудничество или просто привет — буду рад вашему сообщению.',
    name:'Ваше имя', email:'Ваш email', message:'Сообщение', send:'Отправить', sent:'Сообщение отправлено. Спасибо!', footer:'Все права защищены.',
    admin:'Админ', login:'Войти', logout:'Выйти', dashboard:'Панель', manageProjects:'Управление проектами', addProject:'Добавить проект',
    title:'Название проекта', description:'Описание', category:'Категория', image:'Изображение', url:'Ссылка проекта', video:'Ссылка на видео', status:'Статус', published:'Опубликован', draft:'Черновик', hidden:'Скрыт',
    technologiesField:'Технологии (через запятую)', save:'Сохранить', cancel:'Отмена', edit:'Изменить', delete:'Удалить', featuredLabel:'Избранный проект', saved:'Данные сохранены в базе.', deleteConfirm:'Удалить этот проект?',
    emailLabel:'Email администратора', password:'Пароль', loginError:'Не удалось войти. Проверьте аккаунт и права.', configure:'Supabase не настроен. Заполните .env по README.',
    total:'Всего проектов', publishedCount:'Опубликовано', drafts:'Черновики', favorites:'Избранное', filter:'Сортировка', grid:'Сетка', list:'Список'
  }},
  en: { translation: {
    home:'Home', projects:'Projects', technologies:'Technologies', about:'About Me', contact:'Contact',
    eyebrow:'INDEPENDENT DEVELOPER · DIGITAL CREATOR', hero1:'Turning ideas', hero2:'into digital', hero3:'experiences.', heroDesc:'I build modern web platforms, useful products, and memorable digital experiences.',
    explore:'Explore projects', contactMe:'Get in touch', selected:'Selected work', selectedDesc:'From an idea to a finished product — a selection of my latest work.',
    allProjects:'All projects', projectsTitle:'Projects', projectsDesc:'Products, experiments, and digital solutions I have built.', search:'Search projects...', all:'All', newest:'Newest first', oldest:'Oldest first', featured:'Featured',
    noProjects:'No projects yet', noProjectsDesc:'New projects will appear here soon.', loading:'Loading...', error:'Could not load data.',
    technologiesTitle:'Technologies', aboutTitle:'About me', aboutText:'I enjoy turning ideas into thoughtful, beautiful, and useful digital products.',
    contactTitle:'Let’s build something together', contactDesc:'A new project, collaboration, or just a hello — I’d love to hear from you.',
    name:'Your name', email:'Your email', message:'Your message', send:'Send message', sent:'Your message has been sent. Thank you!', footer:'All rights reserved.',
    admin:'Admin', login:'Sign in', logout:'Sign out', dashboard:'Dashboard', manageProjects:'Project management', addProject:'Add project',
    title:'Project title', description:'Description', category:'Category', image:'Image', url:'Project URL', video:'Video URL', status:'Status', published:'Published', draft:'Draft', hidden:'Hidden',
    technologiesField:'Technologies (comma separated)', save:'Save', cancel:'Cancel', edit:'Edit', delete:'Delete', featuredLabel:'Featured project', saved:'Saved to the database.', deleteConfirm:'Are you sure you want to delete this project?',
    emailLabel:'Admin email', password:'Password', loginError:'Sign-in failed. Check your account and permissions.', configure:'Supabase is not configured. Fill in .env using the README.',
    total:'Total projects', publishedCount:'Published', drafts:'Drafts', favorites:'Favorites', filter:'Sort', grid:'Grid', list:'List'
  }}
}
const stored = localStorage.getItem('uvays-language')
i18n.use(initReactI18next).init({ resources, lng: stored || 'uz', fallbackLng:'en', interpolation:{ escapeValue:false } })
i18n.on('languageChanged', lng => localStorage.setItem('uvays-language', lng))
export default i18n
