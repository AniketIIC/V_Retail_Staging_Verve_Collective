import { useEffect, useRef, useState } from 'react'
import './App.css'

const BLOG_POSTS = [
  {
    id: 'cash-positive-popups',
    title: 'Designing Cash-Positive Pop-Ups That Prove The Model',
    date: 'Jan 12, 2026',
    readTime: '6 min read',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Immersive retail pop-up with glowing signage and shoppers',
    excerpt: 'Pop-ups can bankroll themselves when every activation ladders back to working-capital KPIs. We unpack the build, staffing, and brand partner math behind hitting break-even in week one.',
    highlights: [
      'Blend sponsorship tiers so anchor brands underwrite 42% of production costs',
      'Map hourly staffing to POS data for a 14% drop in overtime burn',
      'Layer limited merch drops to recoup build spend before teardown day'
    ]
  },
  {
    id: 'sensory-merchandising',
    title: 'How Sensory Merchandising Increases Basket Size',
    date: 'Jan 19, 2026',
    readTime: '5 min read',
    category: 'Merchandising',
    image: 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Shoppers exploring fragrance displays in a softly lit boutique',
    excerpt: 'Multi-sensory storytelling converts browsers into multi-line buyers. See the sound, scent, and light recipes that push attach rates without discounting margin.',
    highlights: [
      'Introduce sound-reactive lighting to lift dwell time by 18%',
      'Pair scent zones with QR offers to raise basket size by $24 per guest',
      'Recycle the experience stack nightly to keep return shoppers spending'
    ]
  },
  {
    id: 'fintech-partnerships',
    title: 'Fintech Partnerships That Unlock Storefront ROI',
    date: 'Jan 26, 2026',
    readTime: '7 min read',
    category: 'Partnerships',
    image: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Hands using a tablet to review financial dashboards in a retail office',
    excerpt: 'From embedded lending to instant pay, the right fintech partner keeps conversions high and capital light. We break down the revenue splits worth negotiating.',
    highlights: [
      'Use embedded finance to convert 9% of hesitant shoppers at full price',
      'Swap static leases for revenue-share kiosks backed by fintech underwriting',
      'Negotiate data reciprocity clauses that fund your analytics roadmap'
    ]
  },
  {
    id: 'loyalty-value',
    title: 'Luxury Loyalty Programs That Actually Pay Off',
    date: 'Feb 2, 2026',
    readTime: '4 min read',
    category: 'Loyalty',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Client receiving a premium shopping experience with champagne',
    excerpt: 'High-yield loyalty is about micro-investments that feel lavish but spend like media. Here is how we design VIP flows that return 11x in lifetime value.',
    highlights: [
      'Price experiential tiers against actual client LTV uplift, not guesswork',
      'Automate white-glove reorders to lock in subscription-grade cashflow',
      'Segment benefits so top 5% of guests drive 41% of annual revenue'
    ]
  },
  {
    id: 'revenue-journeys',
    title: 'Mapping Customer Journeys To Revenue Moments',
    date: 'Feb 9, 2026',
    readTime: '6 min read',
    category: 'Insights',
    image: 'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Strategist mapping a customer journey on glass wall with sticky notes',
    excerpt: 'Money follows choreography. We outline the playbook for plotting emotion, education, and conversion moments so every touchpoint pays for the next.',
    highlights: [
      'Index discovery zones to first-party data capture goals',
      'Anchor storytelling moments to payment enablement cues',
      'Forecast upsell inventory once heat maps confirm journey flow'
    ]
  },
  {
    id: 'sustainable-fitouts',
    title: 'Sustainable Fit-Outs That Delight CFOs',
    date: 'Feb 16, 2026',
    readTime: '5 min read',
    category: 'Operations',
    image: 'https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Team installing modular shelving in a contemporary retail space',
    excerpt: 'Eco choices should strengthen EBITDA, not drain it. Explore fixtures, finishes, and circular sourcing decisions that cut OpEx while dazzling shoppers.',
    highlights: [
      'Swap MDF for recycled aluminium to trim maintenance spend 22%',
      'Lease living walls through partners to keep CapEx off the books',
      'Model energy loads with smart glass to rebalance utilities in year one'
    ]
  },
  {
    id: 'forecastable-income',
    title: 'Five Ways To Turn Footfall Into Forecastable Income',
    date: 'Feb 23, 2026',
    readTime: '7 min read',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'People counting sensors tracking traffic at a busy storefront',
    excerpt: 'Traffic without translation is vanity. Learn the instrumentation that turns raw footfall into predictable monthly recurring revenue.',
    highlights: [
      'Blend dwell sensors with CRM IDs to spot intent-rich cohorts',
      'Trigger clienteling scripts when conversion dips below target',
      'License underused display zones as retail media with guaranteed CPMs'
    ]
  },
  {
    id: 'investor-ready',
    title: 'Creating Investor-Ready Store Concepts',
    date: 'Mar 2, 2026',
    readTime: '6 min read',
    category: 'Investment',
    image: 'https://images.unsplash.com/photo-1520607726058-04bcb1eedf61?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Pitch meeting with concept boards and financial projections',
    excerpt: 'Investors fund clarity. We show how to pair immersive mock-ups with ironclad unit economics so your next concept deck unlocks capital fast.',
    highlights: [
      'Prototype traffic-to-ticket ratios before investors ask',
      'Use financial storytelling walls to defend blended margin',
      'Stack proof-of-performance case studies to shorten diligence'
    ]
  },
  {
    id: 'data-walls',
    title: 'Mastering Data Walls For Premium Storytelling',
    date: 'Mar 9, 2026',
    readTime: '5 min read',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Digital data wall displaying interactive financial metrics',
    excerpt: 'Dynamic data walls are the new cash wraps. Discover how live dashboards nudge spend, capture consented data, and earn media budgets.',
    highlights: [
      'Design data loops that surface localised pricing wins in real time',
      'Bundle sponsor takeovers that monetise content while you sleep',
      'Embed consent capture so every glance grows your first-party graph'
    ]
  },
  {
    id: 'retail-media-growth',
    title: 'How Retail Media Drives High-Margin Growth',
    date: 'Mar 16, 2026',
    readTime: '8 min read',
    category: 'Media',
    image: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Team reviewing campaign performance charts on large monitors',
    excerpt: 'Retail media is the highest-margin square footage you already own. Build a roadmap that monetises attention without crowding the experience.',
    highlights: [
      'Productise audience segments so partners pay premium CPMs',
      'Automate proof-of-performance dashboards to reduce make-goods',
      'Invest in creative templates that keep content swaps under one hour'
    ]
  }
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const PAGES = [
  { id: 'home', label: 'Home', Component: Home },
  { id: 'services', label: 'Services', Component: Services },
  { id: 'gallery', label: 'Gallery', Component: Gallery },
  { id: 'blog', label: 'Blog', Component: Blog },
  { id: 'stories', label: 'Stories', Component: Stories },
  { id: 'contact', label: 'Contact', Component: Contact }
]

function App() {
  const [activePage, setActivePage] = useState('home')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const CurrentPage = PAGES.find((page) => page.id === activePage)?.Component ?? Home

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand">
          <span className="brand-mark">V</span>
          <div>
            <p className="brand-name">Verve Collective</p>
            <p className="brand-tagline">Designs that bring retail stories to life</p>
          </div>
        </div>
        <nav className="main-nav">
          {PAGES.map((page) => (
            <button type="button"
              key={page.id}
              className={page.id === activePage ? 'nav-link active' : 'nav-link'}
              onClick={() => setActivePage(page.id)}
            >
              {page.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="youtube-link"
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube
          </a>
          <button type="button" className="cta" onClick={() => setIsModalOpen(true)}>
            Book a Styling Call
          </button>
        </div>
      </header>

      <main className="page-area">
        <CurrentPage openModal={() => setIsModalOpen(true)} />
      </main>

      <footer className="app-footer">
        <p>Copyright {new Date().getFullYear()} Verve Collective. Crafted with passion and pixels.</p>
      </footer>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <h2>Book a Styling Call</h2>
            <p>
              Our creative directors would love to help you imagine your next pop-up or flagship
              experience. Drop your information below and we will reach out within one business day.
            </p>
            <form className="modal-form">
              <label>
                Name
                <input type="text" placeholder="Jamie Doe" />
              </label>
              <label>
                Email
                <input type="email" placeholder="jamie@example.com" />
              </label>
              <label>
                Desired launch window
                <input type="date" />
              </label>
              <button type="button" className="cta" onClick={() => setIsModalOpen(false)}>
                Reserve A Call
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
          <span aria-hidden="true">&times;</span>
        </button>
        {children}
      </div>
    </div>
  )
}

function Home({ openModal }) {
  return (
    <section className="page home">
      <div className="hero">
        <div className="hero-copy">
          <span className="pill">Retail concept of the week</span>
          <h1>Immersive spaces that turn browsers into brand believers.</h1>
          <p>
            We design experiential retail environments that captivate, educate, and convert. From
            pop-up showcases to flagship stores, our team fuses storytelling with spatial design to
            create moments that stay with your customers long after they leave.
          </p>
          <div className="hero-actions">
            <button type="button" className="cta" onClick={openModal}>
              Plan a concept session
            </button>
            <button type="button" className="secondary" onClick={() => window.open('https://www.youtube.com', '_blank')}>
              See behind the scenes
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
            alt="Design sketches and moodboards on a table"
          />
          <div className="hero-card">
            <p>Latest Client Win</p>
            <strong>Celestia Beauty Flagship</strong>
            <p>Opened to 12k visitors on launch week with a 34% conversion lift.</p>
          </div>
        </div>
      </div>
      <div className="info-grid">
        <article>
          <h3>Concept Labs</h3>
          <p>Workshops that align your retail, digital, and experiential touchpoints.</p>
        </article>
        <article>
          <h3>Sensory Storytelling</h3>
          <p>Lighting, sound, fragrance, and motion choreographed for peak engagement.</p>
        </article>
        <article>
          <h3>Launch Playbooks</h3>
          <p>Blueprints that keep teams in sync from construction to grand opening.</p>
        </article>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    {
      title: 'Vision Casting',
      copy:
        'Interactive moodboards and shopper journey mapping to unlock a cohesive concept for your brand.'
    },
    {
      title: 'Spatial Design',
      copy:
        'Floorplans, fixture design, and material palettes engineered for flow, dwell, and product discovery.'
    },
    {
      title: 'Launch Operations',
      copy:
        'Staff experiences, training rituals, and launch playbooks that ensure your opening week sings.'
    }
  ]

  return (
    <section className="page services">
      <header className="section-header">
        <h2>Services built for bold retail teams</h2>
        <p>
          Our studio partners with visionary retailers to bring future-forward experiences to life.
          From a single pop-up to a global rollout, we design systems that scale and inspire.
        </p>
      </header>
      <div className="service-columns">
        {services.map((service) => (
          <article key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </article>
        ))}
      </div>
      <div className="timeline">
        <div>
          <span>Week 1</span>
          <strong>Discovery Deep Dive</strong>
          <p>Stakeholder interviews and competitive walk-throughs to learn your world.</p>
        </div>
        <div>
          <span>Week 3</span>
          <strong>Experience Blueprint</strong>
          <p>Storyboarded shopper journeys with touchpoint choreography and merch staging.</p>
        </div>
        <div>
          <span>Week 6</span>
          <strong>Activation Playbook</strong>
          <p>Construction ready documentation and team training kits for seamless execution.</p>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="page gallery">
      <header className="section-header">
        <h2>Gallery & Interactive Showcase</h2>
        <p>Explore our latest installations, then slide through the transformation in real-time.</p>
      </header>
      <Carousel />
      <BeforeAfterSlider />
    </section>
  )
}

function Carousel() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      title: 'Aurora Pop-Up',
      copy: 'A northern-lights inspired palette with choreographed scent and sound.'
    },
    {
      image: 'https://images.unsplash.com/photo-1529429617124-aee1a495f687?auto=format&fit=crop&w=1200&q=80',
      title: 'Lumen Atelier',
      copy: 'Modular displays that react to dwell time with adaptive lighting.'
    },
    {
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
      title: 'Echo Flagship',
      copy: 'Immersive soundscapes and live data visualisations guiding exploration.'
    }
  ]

  const [index, setIndex] = useState(0)

  const goTo = (next) => {
    const total = slides.length
    setIndex((next + total) % total)
  }

  const activeSlide = slides[index]

  return (
    <div className="carousel">
      <button type="button" className="carousel-arrow" onClick={() => goTo(index - 1)} aria-label="Previous slide">
        {'<'}
      </button>
      <figure>
        <img src={activeSlide.image} alt={activeSlide.title} />
        <figcaption>
          <h3>{activeSlide.title}</h3>
          <p>{activeSlide.copy}</p>
        </figcaption>
      </figure>
      <button type="button" className="carousel-arrow" onClick={() => goTo(index + 1)} aria-label="Next slide">
        {'>'}
      </button>
      <div className="carousel-dots">
        {slides.map((slide, slideIndex) => (
          <button type="button"
            key={slide.title}
            className={slideIndex === index ? 'dot active' : 'dot'}
            onClick={() => setIndex(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(50)

  return (
    <div className="before-after">
      <div className="slider-visual">
        <img
          src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
          alt="Before renovation retail space"
        />
        <div className="after" style={{ width: `${position}%` }}>
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
            alt="After renovation retail space"
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Adjust before and after"
        />
      </div>
      <div className="slider-copy">
        <h3>Transformation Slider</h3>
        <p>
          Drag the handle to reveal how we turned an underperforming corner unit into a luminous
          sanctuary for mindful retailing. The redesign increased average dwell time by 19%.
        </p>
      </div>
    </div>
  )
}

function Blog() {
  const [activePost, setActivePost] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const pointerIdRef = useRef(null)
  const draggingRef = useRef(false)

  const collageImages = BLOG_POSTS.slice(0, 3)

  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
    setDragging(false)
    draggingRef.current = false
    pointerIdRef.current = null
    dragOffset.current = { x: 0, y: 0 }

    if (!activePost) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActivePost(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePost])

  const handlePointerDown = (event) => {
    event.preventDefault()
    draggingRef.current = true
    setDragging(true)
    pointerIdRef.current = event.pointerId
    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!draggingRef.current) {
      return
    }

    setPosition({
      x: event.clientX - dragOffset.current.x,
      y: event.clientY - dragOffset.current.y
    })
  }

  const handlePointerUp = (event) => {
    draggingRef.current = false
    setDragging(false)
    if (pointerIdRef.current !== null) {
      try {
        event.currentTarget.releasePointerCapture(pointerIdRef.current)
      } catch (error) {
        // ignore capture release errors
      }
      pointerIdRef.current = null
    }
  }

  const handleWheel = (event) => {
    event.preventDefault()
    setZoom((prev) => clamp(prev + (event.deltaY > 0 ? -0.12 : 0.12), 0.75, 2.5))
  }

  const handleZoomChange = (value) => {
    setZoom(clamp(value, 0.75, 2.5))
  }

  const handleZoomIn = () => {
    setZoom((prev) => clamp(prev + 0.2, 0.75, 2.5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => clamp(prev - 0.2, 0.75, 2.5))
  }

  const handleDoubleClick = () => {
    setZoom((prev) => (prev > 1.2 ? 1 : 1.5))
  }

  const resetView = () => {
    draggingRef.current = false
    setDragging(false)
    setPosition({ x: 0, y: 0 })
    setZoom(1)
  }

  return (
    <section className="page blog">
      <header className="section-header blog-header">
        <div>
          <span className="pill">Money On The Floor</span>
          <h2>Blog & Insights</h2>
          <p>
            Where design decisions meet profit discipline. Explore how the right spatial stories unlock revenue, unlock capital, and keep margins smiling.
          </p>
        </div>
        <div className="blog-header-collage" aria-hidden="true">
          {collageImages.map((post) => (
            <img key={post.id} src={post.image} alt="" />
          ))}
        </div>
      </header>
      <div className="blog-grid">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-image">
              <button
                type="button"
                className="blog-image-button"
                onClick={() => setActivePost(post)}
                aria-label={`Open image for ${post.title}`}
              >
                <img src={post.image} alt={post.imageAlt} />
              </button>
              <span className="blog-card-chip">{post.category}</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <span aria-hidden="true">{'\u00B7'}</span>
                <span>{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <ul className="blog-card-highlights">
                {post.highlights.slice(0, 2).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button type="button" className="blog-card-link" onClick={() => setActivePost(post)}>
                View concept image
              </button>
            </div>
          </article>
        ))}
      </div>
      {activePost && (
        <BlogImageModal
          post={activePost}
          zoom={zoom}
          position={position}
          dragging={dragging}
          onClose={() => setActivePost(null)}
          onZoomChange={handleZoomChange}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={resetView}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
        />
      )}
    </section>
  )
}

function BlogImageModal({
  post,
  zoom,
  position,
  dragging,
  onClose,
  onZoomChange,
  onZoomIn,
  onZoomOut,
  onReset,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onWheel,
  onDoubleClick
}) {
  return (
    <div
      className="image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded view of ${post.title}`}
    >
      <div className="image-lightbox">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close image modal">
          <span aria-hidden="true">&times;</span>
        </button>
        <header className="image-lightbox-header">
          <span className="image-lightbox-tag">{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </header>
        <div className="image-lightbox-body">
          <div
            className="image-lightbox-canvas"
            data-dragging={dragging}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={dragging ? onPointerUp : undefined}
            onWheel={onWheel}
            onDoubleClick={onDoubleClick}
          >
            <img
              src={post.image}
              alt={post.imageAlt}
              style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}
              draggable="false"
            />
          </div>
          <aside className="image-lightbox-aside">
            <div className="image-lightbox-meta">
              <span>{post.date}</span>
              <span aria-hidden="true">{'\u00B7'}</span>
              <span>{post.readTime}</span>
            </div>
            <ul className="image-lightbox-highlights">
              {post.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="image-lightbox-controls">
          <label className="image-lightbox-slider">
            <span>Zoom</span>
            <input
              type="range"
              min="0.75"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(event) => onZoomChange(Number(event.target.value))}
            />
          </label>
          <div className="image-lightbox-buttons">
            <button type="button" className="lightbox-button" onClick={onZoomOut} aria-label="Zoom out">
              &minus;
            </button>
            <span className="image-lightbox-zoom-value">{Math.round(zoom * 100)}%</span>
            <button type="button" className="lightbox-button" onClick={onZoomIn} aria-label="Zoom in">
              +
            </button>
            <button type="button" className="lightbox-button secondary" onClick={onReset}>
              Reset view
            </button>
          </div>
          <p className="image-lightbox-hint">Scroll to zoom, drag to explore, double click to refocus.</p>
        </div>
      </div>
    </div>
  )
}

function Stories() {

  const stories = [
    {
      name: 'Nova Skincare',
      quote:
        'The Verve Collective took our tech-heavy brief and turned it into an intuitive, sensorial launch that our customers cannot stop talking about.'
    },
    {
      name: 'Spoke & Stitch',
      quote:
        'They orchestrated every touchpoint - from lighting to scent - so our visitors felt the brand before they even saw the product.'
    },
    {
      name: 'Horizon Labs',
      quote:
        'We opened in 12 cities with a unified experience, yet each store feels hyper-local and personal. Truly remarkable.'
    }
  ]

  return (
    <section className="page stories">
      <header className="section-header">
        <h2>Stories from the brands we champion</h2>
        <p>
          From luxury cosmetics to agile DTC disruptors, our partners rely on us to craft shopper
          journeys that pivot with culture and data.
        </p>
      </header>
      <div className="story-grid">
        {stories.map((story) => (
          <article key={story.name}>
            <p className="quote">"{story.quote}"</p>
            <p className="attribution">- {story.name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="page contact">
      <header className="section-header">
        <h2>Let's plan your next breakthrough moment</h2>
        <p>Share a few details and we will curate a bespoke proposal within 48 hours.</p>
      </header>
      <form className="contact-form">
        <label>
          Brand name
          <input type="text" placeholder="Lumen & Co." />
        </label>
        <label>
          Contact email
          <input type="email" placeholder="hello@brand.com" />
        </label>
        <fieldset>
          <legend>Project focus</legend>
          <label>
            <input type="radio" name="project-focus" defaultChecked /> Flagship store launch
          </label>
          <label>
            <input type="radio" name="project-focus" /> Seasonal pop-up
          </label>
          <label>
            <input type="radio" name="project-focus" /> Retail lab / concept experiment
          </label>
        </fieldset>
        <label>
          Notes
          <textarea rows="4" placeholder="Tell us about the vibe, goals, and timeline."></textarea>
        </label>
        <button type="submit" className="cta">
          Submit Inquiry
        </button>
      </form>
      <aside className="contact-aside">
        <h3>Need inspiration fast?</h3>
        <p>
          Explore our behind-the-scenes playlist for build-outs, tech demos, and team interviews.
        </p>
        <a className="youtube-link" href="https://www.youtube.com" target="_blank" rel="noreferrer">
          Open our YouTube channel
        </a>
      </aside>
    </section>
  )
}

export default App













