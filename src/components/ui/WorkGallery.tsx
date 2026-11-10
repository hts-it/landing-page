import { useState } from 'react'

const trainingImages = [
  {
    src: '/images/frosio-group.jpg',
    alt: 'Group at an HTS FROSIO training programme',
    category: 'Certification',
    title: 'FROSIO pathways',
    description: 'Preparing coating professionals for internationally recognised inspection pathways.',
  },
  {
    src: '/images/classroom.jpg',
    alt: 'HTS technical course in progress',
    category: 'Technical education',
    title: 'Classroom learning',
    description: 'Connecting coating standards, materials and inspection decisions in class.',
  },
  {
    src: '/images/equipment-demo.jpg',
    alt: 'HTS trainees learning with spray equipment',
    category: 'Hands-on learning',
    title: 'Practical training',
    description: 'Working with the tools and methods used in real coating application.',
  },
  {
    src: '/images/training-tools.jpg',
    alt: 'HTS participants practising with coating inspection tools around a table',
    category: 'Inspection skills',
    title: 'Using the tools',
    description: 'Learning how coating inspection instruments support practical decisions.',
  },
  {
    src: '/images/training-demonstration.jpg',
    alt: 'HTS instructor demonstrating coating samples and inspection equipment to trainees',
    category: 'Workshop',
    title: 'Guided demonstration',
    description: 'Examining coating samples and inspection methods together with an instructor.',
  },
] as const

const industryImages = [
  {
    src: '/images/field-inspection.jpg',
    alt: 'Protective coating inspection at an industrial site',
    category: 'Inspection',
    title: 'Field inspection',
    description: 'Checking surface conditions and coating quality on active industrial sites.',
  },
  {
    src: '/images/coating-application.jpg',
    alt: 'Team examining coated industrial equipment in a painting workshop',
    category: 'Corrosion protection',
    title: 'Coated equipment',
    description: 'Reviewing the coating on industrial equipment in a painting workshop.',
  },
  {
    src: '/images/surface-work.jpg',
    alt: 'Industrial team examining a metal assembly in a workshop',
    category: 'Workshop assessment',
    title: 'Surface assessment',
    description: 'Examining a metal assembly and discussing its surface condition.',
  },
] as const

export default function WorkGallery() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const activeImage = hoveredImage ?? selectedImage

  return (
    <section className="work-section section-space" id="work" aria-labelledby="work-title">
      <div className="work-inner frame">
        <div className="work-heading" data-reveal>
          <span>Inside HTS</span>
          <h2 id="work-title">HTS at work</h2>
          <p>Real training, inspection and industrial coating practice.</p>
        </div>
        <div className="work-gallery-grid" aria-label="HTS training and industrial work photos" onMouseLeave={() => setHoveredImage(null)}>
          {[
            { name: 'Training', items: trainingImages },
            { name: 'Industrial work', items: industryImages },
          ].map((group) => (
            <div className="work-gallery-group" key={group.name}>
              <h3>{group.name}</h3>
              <div className={`work-gallery-row work-gallery-row--${group.name === 'Training' ? 'training' : 'industry'}`}>
                {group.items.map((item) => (
                  <button
                    key={item.src}
                    className={`work-gallery-card${activeImage !== null && activeImage !== item.src ? ' is-softened' : ''}${activeImage === item.src ? ' is-active' : ''}`}
                    type="button"
                    onMouseEnter={() => setHoveredImage(item.src)}
                    onFocus={() => setHoveredImage(item.src)}
                    onBlur={() => setHoveredImage(null)}
                    onClick={() => setSelectedImage((current) => current === item.src ? null : item.src)}
                    aria-label={`${item.title}. ${item.description}`}
                    aria-pressed={selectedImage === item.src}
                  >
                    <img src={item.src} alt="" loading="lazy" />
                    <span className="work-gallery-caption">
                      <span className="work-gallery-category">{item.category}</span>
                      <strong>{item.title}</strong>
                      <span className="work-gallery-description">{item.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
