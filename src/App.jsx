import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabase'
import './App.css'

// Hook for scroll animations
function useScrollAnimation() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible]
}


// Custom Logo - א"א monogram with pillar design
const Logo = (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hexagonal frame */}
    <path
      d="M25 2L45 14V36L25 48L5 36V14L25 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Inner hexagon */}
    <path
      d="M25 8L39 17V33L25 42L11 33V17L25 8Z"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.3"
      fill="none"
    />
    {/* Stylized א - first letter */}
    <path
      d="M16 33L20 15M17 22L23 28M23 18L17 28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Stylized א - second letter */}
    <path
      d="M28 33L32 15M29 22L35 28M35 18L29 28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// SVG Icons
const Icons = {
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 12l3-3 3 3M21 12l-3-3-3 3M5.5 7.5l13 9M18.5 7.5l-13 9"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
    </svg>
  ),
  gavel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 12.5l-5 5M9 11l-4 4 1.5 1.5 4-4M15 9l4-4-1.5-1.5-4 4M6.5 6.5l11 11M2 22l3-3"/>
    </svg>
  ),
  corporate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  scroll: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 00-2-2H3"/>
      <path d="M19 17V5a2 2 0 00-2-2H4a2 2 0 00-2 2v2"/>
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <path d="M22 6l-10 7L2 6"/>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <path d="M22 4L12 14.01l-3-3"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  arrowUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10l-10-6L2 10l10 6 10-6z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/>
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  )
}

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          <div className="logo-icon">{Logo}</div>
          <div className="logo-text">
            <span className="logo-name">עו"ד אליאור אפלבוים</span>
            <span className="logo-subtitle">משרד עורכי דין</span>
          </div>
        </div>

        <button
          className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>ראשי</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>אודות</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>תחומי עיסוק</a>
          <a href="#process" onClick={() => setIsMenuOpen(false)}>תהליך העבודה</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>צור קשר</a>
        </nav>

        <a href="tel:+972501234567" className="header-phone">
          <span className="header-phone-icon">{Icons.phone}</span>
          <span>050-123-4567</span>
        </a>
      </div>
    </header>
  )
}

// Hero Section - Professional Style
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-dots"></div>
      <div className="hero-line hero-line-1"></div>
      <div className="hero-line hero-line-2"></div>
      <div className="container hero-container">
        <div className="hero-content">
          
          <h1>עו"ד אליאור אפלבוים</h1>
          <div className="hero-divider"></div>
          <p className="hero-tagline">ייעוץ וייצוג משפטי מקצועי</p>
          <p className="hero-subtitle">
            ליווי משפטי אישי ומסור בתחומי המשפט האזרחי והמסחרי,
            עם גישה מקצועית ויחס אישי לכל לקוח
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              לייעוץ ראשוני
              <span className="btn-icon">←</span>
            </a>
            <a href="#services" className="btn btn-outline">
              תחומי העיסוק
            </a>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>גלול למטה</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  )
}

// About Section
function About() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="about" className="about">
      <div className="container">
        <div
          ref={ref}
          className={`about-content animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="about-image">
            <img
              src="/profile.png"
              alt="עו״ד אליאור אפלבוים"
              className="about-profile-img"
            />
          </div>
          <div className="about-text">
            <span className="section-tag">אודות</span>
            <h2>עו"ד אליאור אפלבוים</h2>
            <div className="about-divider"></div>
            <p className="about-lead">
              המשרד מתמחה בייצוג וליווי משפטי בתחומי המשפט האזרחי והמסחרי,
              תוך מתן שירות אישי, מקצועי וזמין לכל לקוח.
            </p>
            <p>
              אני מאמין כי כל לקוח ראוי לקבל יחס אישי ומסור, הקשבה מלאה לצרכיו,
              וייצוג משפטי ברמה הגבוהה ביותר. המשרד מעניק שירות מקיף החל משלב הייעוץ
              הראשוני ועד להשגת התוצאות המיטביות.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">{Icons.check}</span>
                <span>ליווי אישי וצמוד</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">{Icons.check}</span>
                <span>זמינות מלאה ללקוחות</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">{Icons.check}</span>
                <span>מחויבות לתוצאות</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary">לקביעת פגישת ייעוץ</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Modal Component
function Modal({ isOpen, onClose, service }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !service) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className={`modal-icon service-icon-${service.color}`}>
          {service.icon}
        </div>
        <h2>{service.title}</h2>
        <p className="modal-description">{service.description}</p>
        <div className="modal-details">
          <h4>השירותים שלנו בתחום זה כוללים:</h4>
          <ul>
            {service.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        <a href="#contact" className="btn btn-primary" onClick={onClose}>
          לייעוץ ראשוני
          <span className="btn-icon">←</span>
        </a>
      </div>
    </div>
  )
}

// Services Section
function Services() {
  const [ref, isVisible] = useScrollAnimation()
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      icon: Icons.document,
      title: 'דיני חוזים',
      description: 'עריכת חוזים מסחריים, ליווי משא ומתן, וייצוג בסכסוכי חוזים.',
      color: 'blue',
      details: [
        'עריכת חוזים מסחריים ועסקיים',
        'חוזי שכירות למגורים ולעסקים',
        'הסכמי שיתוף פעולה ושותפות',
        'ליווי משא ומתן וגישור',
        'ייצוג בסכסוכי חוזים בבית המשפט',
        'בדיקה וניתוח חוזים קיימים'
      ]
    },
    {
      icon: Icons.building,
      title: 'דיני נדל"ן',
      description: 'ליווי עסקאות מכר ורכישה, הסכמי שכירות, ותביעות נדל"ן.',
      color: 'blue',
      details: [
        'ליווי עסקאות מכר ורכישת דירות',
        'בדיקת נסח טאבו ומסמכים משפטיים',
        'הסכמי שכירות ארוכי טווח',
        'ייצוג בעסקאות קומבינציה',
        'טיפול בליקויי בנייה',
        'סכסוכי שכנים ובתים משותפים'
      ]
    },
    {
      icon: Icons.gavel,
      title: 'ליטיגציה אזרחית',
      description: 'ייצוג בבתי משפט בתביעות אזרחיות, מסחריות וכספיות.',
      color: 'blue',
      details: [
        'תביעות כספיות ונזיקין',
        'תביעות לשון הרע ופגיעה בשם טוב',
        'סכסוכים מסחריים ועסקיים',
        'ייצוג בבוררות וגישור',
        'תביעות ביטוח',
        'הוצאה לפועל וגביית חובות'
      ]
    },
    {
      icon: Icons.corporate,
      title: 'דיני תאגידים',
      description: 'הקמת חברות, הסכמי מייסדים, ומיזוגים ורכישות.',
      color: 'blue',
      details: [
        'הקמת חברות בע"מ ועמותות',
        'הסכמי מייסדים ובעלי מניות',
        'ליווי גיוסי הון והשקעות',
        'מיזוגים ורכישות (M&A)',
        'ממשל תאגידי וציות',
        'פירוק חברות והליכי חדלות פירעון'
      ]
    },
    {
      icon: Icons.family,
      title: 'דיני משפחה',
      description: 'הסכמי ממון, גירושין, משמורת ומזונות.',
      color: 'blue',
      details: [
        'הסכמי ממון לפני ואחרי נישואין',
        'הליכי גירושין בהסכמה',
        'משמורת ילדים והסדרי ראייה',
        'תביעות מזונות ילדים ובן/בת זוג',
        'חלוקת רכוש משותף',
        'ייצוג בבית הדין הרבני ובית המשפט'
      ]
    },
    {
      icon: Icons.scroll,
      title: 'ירושות וצוואות',
      description: 'עריכת צוואות, ניהול עיזבונות, וייצוג בסכסוכי ירושה.',
      color: 'blue',
      details: [
        'עריכת צוואות וצוואות הדדיות',
        'בקשות לצו ירושה וצו קיום צוואה',
        'ניהול עיזבונות ונכסי עזבון',
        'התנגדויות לצוואות',
        'סכסוכי ירושה בין יורשים',
        'ייפוי כוח מתמשך ומסמכים נלווים'
      ]
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div ref={ref} className={`section-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <span className="section-tag">השירותים שלנו</span>
          <h2>תחומי העיסוק</h2>
          <p>מגוון רחב של שירותים משפטיים מקצועיים לאנשים פרטיים ועסקים</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onOpenModal={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </section>
  )
}

function ServiceCard({ service, index, onOpenModal }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`service-card animate-on-scroll stagger-${(index % 6) + 1} ${isVisible ? 'visible' : ''}`}
    >
      <div className={`service-icon service-icon-${service.color}`}>
        {service.icon}
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <button onClick={onOpenModal} className="service-link">לפרטים נוספים</button>
    </div>
  )
}

// Process/How It Works Section with Timeline
function Process() {
  const [ref, isVisible] = useScrollAnimation()

  const steps = [
    {
      icon: Icons.phone,
      title: 'פנייה ראשונית',
      description: 'צרו קשר טלפוני או השאירו פרטים באתר ונחזור אליכם תוך שעות ספורות.',
      color: 'blue'
    },
    {
      icon: Icons.chat,
      title: 'פגישת היכרות',
      description: 'פגישת ייעוץ ראשונית חינם להבנת הצרכים שלכם ובניית אסטרטגיה.',
      color: 'blue'
    },
    {
      icon: Icons.user,
      title: 'ליווי אישי',
      description: 'ליווי צמוד לאורך כל התהליך המשפטי עם עדכונים שוטפים.',
      color: 'blue'
    },
    {
      icon: Icons.check,
      title: 'השגת תוצאות',
      description: 'מיקוד בהשגת התוצאות הטובות ביותר עבורכם בכל תיק.',
      color: 'blue'
    }
  ]

  return (
    <section id="process" className="process">
      <div className="container">
        <div ref={ref} className={`section-header animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <span className="section-tag">תהליך העבודה</span>
          <h2>איך זה עובד?</h2>
          <p>תהליך פשוט וברור מהפנייה הראשונית ועד להשגת התוצאות</p>
        </div>
        <div className="process-timeline">
          <svg className="process-line" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path
              d="M0,50 Q250,10 500,50 T1000,50"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8,8"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4a5d52" />
                <stop offset="33%" stopColor="#5a6d62" />
                <stop offset="66%" stopColor="#c97b3d" />
                <stop offset="100%" stopColor="#d4935e" />
              </linearGradient>
            </defs>
          </svg>
          <div className="process-steps">
            {steps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`process-step animate-on-scroll stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
    >
      <div className={`process-icon process-icon-${step.color}`}>
        {step.icon}
      </div>
      <div className="process-number">{String(index + 1).padStart(2, '0')}</div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </div>
  )
}

// Experience/Why Us Section
function Experience() {
  const [headerRef, headerVisible] = useScrollAnimation()

  const reasons = [
    {
      icon: Icons.handshake,
      title: 'יחס אישי',
      description: 'כל לקוח מקבל תשומת לב מלאה וליווי צמוד לאורך כל התהליך המשפטי.',
      color: 'blue'
    },
    {
      icon: Icons.clock,
      title: 'זמינות מלאה',
      description: 'אנחנו זמינים עבורכם בכל שעה, כולל מענה מהיר לשאלות דחופות.',
      color: 'blue'
    },
    {
      icon: Icons.shield,
      title: 'שקיפות בתמחור',
      description: 'תמחור הוגן וברור מראש, ללא הפתעות או עלויות נסתרות.',
      color: 'blue'
    },
    {
      icon: Icons.target,
      title: 'תוצאות מוכחות',
      description: 'אחוזי הצלחה גבוהים ומאות לקוחות מרוצים לאורך השנים.',
      color: 'blue'
    }
  ]

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header light animate-on-scroll ${headerVisible ? 'visible' : ''}`}
        >
          <span className="section-tag">למה לבחור בנו</span>
          <h2>היתרונות שלנו</h2>
          <p>מחויבים להעניק לכם את השירות המשפטי הטוב ביותר</p>
        </div>
        <div className="experience-grid">
          {reasons.map((reason, index) => (
            <ExperienceCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ reason, index }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`experience-card animate-on-scroll stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
    >
      <div className={`experience-icon experience-icon-${reason.color}`}>
        {reason.icon}
      </div>
      <h3>{reason.title}</h3>
      <p>{reason.description}</p>
    </div>
  )
}

// Testimonials Section
function Testimonials() {
  const [headerRef, headerVisible] = useScrollAnimation()

  const testimonials = [
    {
      text: 'עו"ד ישראלי ליווה אותנו בעסקת נדל"ן מורכבת. המקצועיות והזמינות שלו היו יוצאות דופן. ממליצים בחום!',
      name: 'דוד כהן',
      role: 'יזם נדל"ן',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: 'תודה על הטיפול המסור והמקצועי בתיק שלי. הרגשתי שאני בידיים טובות מהרגע הראשון.',
      name: 'שרה לוי',
      role: 'לקוחה פרטית',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: 'משרד מקצועי ואמין. קיבלתי מענה מהיר לכל שאלה והתוצאות דיברו בעד עצמן.',
      name: 'יוסי אברהם',
      role: 'בעל עסק',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: 'ליווי משפטי מעולה בתהליך הקמת החברה. הכל נעשה במקצועיות ובמהירות.',
      name: 'מיכל רוזנברג',
      role: 'מנכ"לית סטארטאפ',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: 'טיפול מסור ומקצועי בתיק הגירושין שלי. תמיד היה זמין לשאלות ונתן תחושת ביטחון.',
      name: 'אבי גולדשטיין',
      role: 'לקוח פרטי',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: 'ייצוג מצוין בבית המשפט. השיג עבורי תוצאה הרבה יותר טובה ממה שציפיתי.',
      name: 'רונית שמעוני',
      role: 'בעלת עסק',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: 'עו"ד ישראלי עזר לי בעסקת רכישת דירה מורכבת. מקצועי, יסודי ואמין.',
      name: 'עמית ברקוביץ',
      role: 'רוכש דירה',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
    }
  ]

  return (
    <section className="testimonials">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header animate-on-scroll ${headerVisible ? 'visible' : ''}`}
        >
          <span className="section-tag">מה אומרים עלינו</span>
          <h2>המלצות לקוחות</h2>
        </div>
      </div>
      <div className="testimonials-scroll-wrapper">
        <div className="testimonials-scroll">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote">"</div>
      <div className="testimonial-stars">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="star-icon">{Icons.star}</span>
        ))}
      </div>
      <p>{testimonial.text}</p>
      <div className="testimonial-author">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="author-avatar-img"
        />
        <div className="author-info">
          <span className="author-name">{testimonial.name}</span>
          <span className="author-role">{testimonial.role}</span>
        </div>
      </div>
    </div>
  )
}

// Contact Section
function Contact() {
  const [ref, isVisible] = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    // Name validation - only letters (Hebrew and English), spaces, and hyphens
    const nameRegex = /^[a-zA-Zא-ת\s\-']+$/
    if (!formData.name.trim()) {
      newErrors.name = 'שדה זה הינו חובה'
    } else if (/\d/.test(formData.name)) {
      newErrors.name = 'שם לא יכול להכיל מספרים'
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'שם לא תקין'
    }

    // Phone validation - Israeli format (05X-XXXXXXX or 05XXXXXXXX)
    const phoneRegex = /^0(5[0-9])-?[0-9]{7}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'שדה זה הינו חובה'
    } else if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'מספר טלפון לא תקין'
    }

    // Email validation (optional but must be valid if provided)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה'
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'שדה זה הינו חובה'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      setSubmitStatus(null)

      try {
        console.log('Submitting to Supabase...', formData)

        const { data, error } = await supabase
          .from('contacts')
          .insert([
            {
              name: formData.name,
              phone: formData.phone,
              email: formData.email || null,
              subject: formData.subject,
              message: formData.message || null
            }
          ])
          .select()

        console.log('Supabase response:', { data, error })

        if (error) {
          console.error('Supabase error details:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          })
          throw error
        }

        setSubmitStatus('success')
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
        setSubmitted(false)
        setErrors({})
      } catch (error) {
        console.error('Error submitting form:', error)
        setSubmitStatus('error')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (submitted) {
      const newErrors = { ...errors }
      const phoneRegex = /^0(5[0-9])-?[0-9]{7}$/
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (name === 'name') {
        const nameRegex = /^[a-zA-Zא-ת\s\-']+$/
        if (!value.trim()) {
          newErrors.name = 'שדה זה הינו חובה'
        } else if (!nameRegex.test(value)) {
          newErrors.name = 'שם לא תקין'
        } else {
          newErrors.name = null
        }
      } else if (name === 'phone') {
        if (!value.trim()) {
          newErrors.phone = 'שדה זה הינו חובה'
        } else if (!phoneRegex.test(value.replace(/[-\s]/g, ''))) {
          newErrors.phone = 'מספר טלפון לא תקין'
        } else {
          newErrors.phone = null
        }
      } else if (name === 'email') {
        newErrors.email = value && !emailRegex.test(value) ? 'כתובת אימייל לא תקינה' : null
      } else if (name === 'subject') {
        newErrors.subject = !value ? 'שדה זה הינו חובה' : null
      }

      setErrors(newErrors)
    }
    if (submitStatus) setSubmitStatus(null)
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div
          ref={ref}
          className={`contact-wrapper animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <div className="contact-info">
            <span className="section-tag">צרו קשר</span>
            <h2>נשמח לעמוד לשירותכם</h2>
            <p>
              השאירו פרטים ונחזור אליכם בהקדם, או צרו קשר ישירות באחת הדרכים הבאות:
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon contact-icon-blue">
                  {Icons.location}
                </div>
                <div className="contact-item-text">
                  <strong>כתובת</strong>
                  <span>רחוב רוטשילד 45, תל אביב</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-blue">
                  {Icons.phone}
                </div>
                <div className="contact-item-text">
                  <strong>טלפון</strong>
                  <a href="tel:+972501234567">050-123-4567</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-blue">
                  {Icons.mail}
                </div>
                <div className="contact-item-text">
                  <strong>אימייל</strong>
                  <a href="mailto:info@lawyer-il.co.il">info@lawyer-il.co.il</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon contact-icon-blue">
                  {Icons.clock}
                </div>
                <div className="contact-item-text">
                  <strong>שעות פעילות</strong>
                  <span>א'-ה': 09:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <h3>ייעוץ ראשוני</h3>
              <div className="form-row">
                <div className="form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="שם מלא *"
                    value={formData.name}
                    onChange={handleChange}
                    className={submitted && errors.name ? 'field-invalid' : ''}
                  />
                  <span className={`field-error ${submitted && errors.name ? 'show' : ''}`}>
                    {errors.name}
                  </span>
                </div>
                <div className="form-field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="טלפון *"
                    value={formData.phone}
                    onChange={handleChange}
                    className={submitted && errors.phone ? 'field-invalid' : ''}
                  />
                  <span className={`field-error ${submitted && errors.phone ? 'show' : ''}`}>
                    {errors.phone}
                  </span>
                </div>
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="אימייל"
                  value={formData.email}
                  onChange={handleChange}
                  className={submitted && errors.email ? 'field-invalid' : ''}
                />
                <span className={`field-error ${submitted && errors.email ? 'show' : ''}`}>
                  {errors.email}
                </span>
              </div>
              <div className="form-field">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${!formData.subject ? 'placeholder-shown' : ''} ${submitted && errors.subject ? 'field-invalid' : ''}`}
                >
                  <option value="">בחר תחום עיסוק *</option>
                  <option value="contracts">דיני חוזים</option>
                  <option value="realestate">דיני נדל"ן</option>
                  <option value="litigation">ליטיגציה אזרחית</option>
                  <option value="corporate">דיני תאגידים</option>
                  <option value="family">דיני משפחה</option>
                  <option value="inheritance">ירושות וצוואות</option>
                  <option value="other">אחר</option>
                </select>
                <span className={`field-error ${submitted && errors.subject ? 'show' : ''}`}>
                  {errors.subject}
                </span>
              </div>
              <div className="form-field">
                <textarea
                  name="message"
                  placeholder="תיאור קצר של העניין"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isLoading}
              >
                {isLoading ? 'שולח...' : 'שליחת פנייה'}
                {!isLoading && <span className="btn-arrow">←</span>}
              </button>
              {submitStatus === 'success' && (
                <p className="form-status form-status-success">
                  תודה על פנייתך! ניצור איתך קשר בהקדם.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="form-status form-status-error">
                  אירעה שגיאה בשליחת הטופס. אנא נסה שוב.
                </p>
              )}
              <p className="form-note">
                * הפנייה תטופל בסודיות מוחלטת
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">{Logo}</div>
              <div className="logo-text">
                <span className="logo-name">עו"ד אליאור אפלבוים</span>
                <span className="logo-subtitle">משרד עורכי דין</span>
              </div>
            </div>
            <p>
              משרד עורכי דין מוביל המתמחה במתן שירותים משפטיים מקצועיים
              ברמה הגבוהה ביותר.
            </p>
          </div>
          <div className="footer-links">
            <h4>קישורים מהירים</h4>
            <a href="#home">ראשי</a>
            <a href="#about">אודות</a>
            <a href="#services">תחומי עיסוק</a>
            <a href="#contact">צור קשר</a>
          </div>
          <div className="footer-links">
            <h4>תחומי עיסוק</h4>
            <a href="#services">דיני חוזים</a>
            <a href="#services">דיני נדל"ן</a>
            <a href="#services">ליטיגציה אזרחית</a>
            <a href="#services">דיני משפחה</a>
          </div>
          <div className="footer-contact">
            <h4>יצירת קשר</h4>
            <p><span className="footer-icon">{Icons.location}</span> רחוב רוטשילד 45, תל אביב</p>
            <p><span className="footer-icon">{Icons.phone}</span> 050-123-4567</p>
            <p><span className="footer-icon">{Icons.mail}</span> info@lawyer-il.co.il</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 עו"ד אליאור אפלבוים - כל הזכויות שמורות</p>
          <div className="footer-legal">
            <a href="#">תנאי שימוש</a>
            <a href="#">מדיניות פרטיות</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="חזרה למעלה"
    >
      {Icons.arrowUp}
    </button>
  )
}

// Main App
function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
