import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { ThermometerIcon } from '@phosphor-icons/react/dist/csr/Thermometer'
import { PaintRollerIcon } from '@phosphor-icons/react/dist/csr/PaintRoller'
import { TestimonialGlobe, type GlobeTestimonial } from './testimonial-globe'

type HeroSectionProps = {
  onEnquire: () => void
}

const practiceAreas = [
  { label: 'FROSIO', logo: '/images/frosio-logo.png', logoClass: 'frosio' },
  { label: 'ICorr', logo: '/images/icorr-logo.png', logoClass: 'icorr' },
  { label: 'Third-Party Inspection', icon: MagnifyingGlassIcon, color: '#003399' },
  { label: 'Insulation', icon: ThermometerIcon, color: '#1797bf' },
  { label: 'Blaster & Painter', icon: PaintRollerIcon, color: '#d5a900' },
] as const

const reviews: GlobeTestimonial[] = [
  {
    id: 'bhuvnesh',
    name: 'Bhuvnesh Tangudu',
    image: '/images/reviews/bhuvnesh.jpg',
    quote: 'The training was well-structured, combining theory and practical sessions that made even complex coating inspection concepts easy to understand.',
    role: 'FROSIO trainee',
    city: 'Visakhapatnam',
    country: 'IN',
    lat: 17.69,
    lng: 83.22,
    sourceUrl: 'https://www.linkedin.com/posts/frosio-india_htscoatings-frosio-frosiotraining-activity-7493157296357732352-uRSA',
  },
  {
    id: 'rajeeth',
    name: 'Rajeeth Kumaran',
    image: '/images/reviews/rajeeth.jpg',
    quote: 'Excellent training experience',
    role: 'HTS trainee',
    city: 'Doha',
    country: 'QA',
    lat: 25.29,
    lng: 51.53,
    sourceUrl: 'https://share.google/ac2Ddue5MAF9tag7r',
  },
  {
    id: 'murthy',
    name: 'Murthy Arya',
    image: '/images/reviews/murthy.jpg',
    quote: 'They train very well and make it easy to understand.',
    role: 'HTS trainee',
    city: 'Chennai training',
    country: 'IN',
    lat: 13.08,
    lng: 80.27,
    sourceUrl: 'https://share.google/2sY8Xsu5bD1CRg9No',
  },
  {
    id: 'ponnusamy',
    name: 'Ponnusamy Thangasamy',
    quote: 'The faculty members were highly knowledgeable and explained the subjects clearly. The staff were extremely helpful, and the training facilities were very good.',
    role: 'Coating and insulation inspector',
    city: 'Singapore',
    country: 'SG',
    lat: 1.35,
    lng: 103.82,
    sourceUrl: 'https://www.linkedin.com/posts/frosio-india_frosio-htscoatings-frosiotraining-activity-7492831506260742146-MTAq',
  },
  {
    id: 'manoj',
    name: 'Manoj Abraham',
    quote: 'The FROSIO training provided by HTS was excellent in every respect. The programme was highly focused, result-oriented and well-structured.',
    role: 'Technical director',
    city: 'Dubai',
    country: 'AE',
    lat: 25.20,
    lng: 55.27,
    sourceUrl: 'https://www.linkedin.com/posts/hts-coatings_frosio-htscoatings-coatinginspection-activity-7492436899203280896-SMlA',
  },
  {
    id: 'hari',
    name: 'Hari Prasath',
    quote: 'The practical depth of the FROSIO training was outstanding, and I’m glad to share my positive experience.',
    role: 'Coating inspector',
    city: 'Dammam',
    country: 'SA',
    lat: 26.42,
    lng: 50.09,
    sourceUrl: 'https://sa.linkedin.com/in/hariprasath-project-engineer',
  },
  {
    id: 'anuj',
    name: 'Anuj Kumar',
    quote: 'The team was highly professional, helpful and readily available whenever guidance was required.',
    role: 'Deputy Quality Manager',
    city: 'Dar es Salaam',
    country: 'TZ',
    lat: -6.79,
    lng: 39.28,
    sourceUrl: 'https://www.linkedin.com/posts/venkatesan-ramanan-47a7321a_frosio-htscoatings-frosiolevel3-activity-7491899432146190338-aFfT',
  },
  {
    id: 'abdul',
    name: 'Abdul Arbaaz Anas',
    quote: 'I particularly appreciated the trainers’ use of practical examples and industry experience when explaining coating-inspection subjects.',
    role: 'Painting Inspector',
    city: 'Abu Dhabi',
    country: 'AE',
    lat: 24.45,
    lng: 54.38,
    sourceUrl: 'https://www.linkedin.com/posts/hts-coatings_frosio-htscoatings-coatinginspection-activity-7492468098869129216-Q79l',
  },
  {
    id: 'mahesh',
    name: 'Maheshkumar More',
    quote: 'The practical laboratory was well-equipped, and every participant received individual attention during the blasting, coating-application and inspection demonstrations.',
    role: 'Managing Director, Geeta Surface Coatings',
    city: 'Pune',
    country: 'IN',
    lat: 18.52,
    lng: 73.86,
    sourceUrl: 'https://www.linkedin.com/posts/frosio-india_frosio-htscoatings-coatinginspection-activity-7492450129824608257-Jma0',
  },
]

// Google Maps displayed 5.0/5 for this Chennai business listing on 5 November 2026.
const googleReviewsUrl = 'https://www.google.com/maps/place/Harvish+Technical+Services+(HTS+COATINGS)/@13.0846509,80.2221455,17z/data=!4m8!3m7!1s0x3a5263c0bb8d0ef7:0x51ba59184c3920e5!8m2!3d13.0846509!4d80.2221455!9m1!1b1!16s%2Fg%2F11c45t8zj5'
const heroSpecialisms = ['Protective Coatings', 'Insulation', 'PFP'] as const

function PracticeAreaItem({ area }: { area: (typeof practiceAreas)[number] }) {
  if ('logo' in area) {
    return (
      <div className="agency-hero-practice-item">
        <span className={`agency-hero-practice-logo agency-hero-practice-logo--${area.logoClass}`}>
          <img src={area.logo} alt={area.label} width={area.logoClass === 'frosio' ? 202 : 1772} height={area.logoClass === 'frosio' ? 120 : 1181} />
        </span>
      </div>
    )
  }

  const Icon = area.icon
  return (
    <div className="agency-hero-practice-item">
      <Icon size={30} weight="regular" color={area.color} aria-hidden="true" />
      <span>{area.label}</span>
    </div>
  )
}

export default function AgencyHeroSection({ onEnquire }: HeroSectionProps) {
  const [specialismIndex, setSpecialismIndex] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return
    const interval = window.setInterval(() => {
      setSpecialismIndex((current) => (current + 1) % heroSpecialisms.length)
    }, 3200)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="agency-hero" aria-labelledby="hero-title">
      <div className="agency-hero-inner frame">
        <div className="agency-hero-main">
          <div className="agency-hero-copy">
            <h1 id="hero-title">
              <span>Master yourself</span>
              <span>in the field of</span>
              <span className="agency-hero-specialism" aria-label="Protective Coatings, Insulation and PFP">
                <em key={specialismIndex} aria-hidden="true">{heroSpecialisms[specialismIndex]}</em>
              </span>
            </h1>
            <p className="agency-hero-intro">
              HTS Global develops skilled professionals and supports industrial teams through training, inspection, and corrosion protection services.
            </p>
            <div className="agency-hero-actions">
              <button className="agency-hero-primary" type="button" onClick={onEnquire}>
                <span>Make an enquiry</span><span className="agency-hero-arrow" aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
          <TestimonialGlobe
            className="hero-review-globe"
            items={reviews}
            eyebrow="Real HTS trainee reviews"
            heading="Their experience, in their words."
            googleRating={5}
            googleRatingUrl={googleReviewsUrl}
            autoplay
            interval={4200}
            size={320}
            rotationSpeed={0.08}
            labels={{ previous: 'Previous HTS review', next: 'Next HTS review', pin: 'Show the HTS review by' }}
          />
        </div>
        <div className="agency-hero-practice">
          <div className="agency-hero-practice-label"><span>Professional training and industrial services</span></div>
          <div className="agency-hero-practice-list" aria-label="HTS practice areas">
            <div className="agency-hero-practice-track">
              {[0, 1, 2, 3, 4, 5].map((copy) => (
                <div className="agency-hero-practice-set" key={copy} aria-hidden={copy > 0}>
                  {practiceAreas.map((area) => <PracticeAreaItem area={area} key={area.label} />)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
