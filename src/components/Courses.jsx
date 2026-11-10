import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin'
import { XIcon } from '@phosphor-icons/react/dist/csr/X'
import GlassFolder from './ui/glass-folder-cards.tsx'

const courses = [
  {
    id: 'frosio',
    name: 'FROSIO',
    title: 'Surface Treatment & Insulation',
    short: 'FROSIO training in surface treatment and insulation',
    art: {
      style: 'streak',
      colors: ['#f7fbff', '#d8eaf9', '#79b8df', '#003399', '#081f4c', '#d7b63a', '#fff4d8'],
      scale: 0.72,
      warp: 1.5,
      angle: -0.6,
      gloss: 0.3,
    },
    about: [
      'Established by industry in 1986, FROSIO developed a recognised route to qualifying people who manage, carry out and inspect corrosion protection work. Its certification scheme sets requirements for surface treatment and insulation inspectors and is referenced in industrial specifications worldwide.',
      'This course connects the theory of corrosion control with the realities of coating and insulation inspection: preparation, application, testing and reporting. It is a practical next step for people with an apprenticeship, existing inspection credentials or substantial hands-on experience in anticorrosion or insulation work.',
    ],
    topics: ['Surface preparation and protective coating systems', 'Industrial insulation and inspection requirements', 'Testing, quality records and practical examination preparation'],
    note: 'HTS can help you choose the FROSIO pathway and certification level that fits your experience.',
    source: 'https://www.htscoatings.in/frosio/',
    authority: { label: 'FROSIO Training', url: 'https://www.frosiotraining.com/' },
  },
  {
    id: 'icorr',
    name: 'ICorr',
    title: 'Insulation & PFP',
    short: 'ICorr training in insulation and passive fire protection',
    art: {
      style: 'marble',
      colors: ['#f4faff', '#c7e4f2', '#5cb6d7', '#103e80', '#0b2451', '#d7bb69', '#fff9eb'],
      scale: 0.74,
      warp: 2.8,
      angle: 0.5,
      gloss: 0.4,
      veins: 0.22,
    },
    about: [
      'The Institute of Corrosion (ICorr) provides professional training and certification pathways for people working with coatings, insulation and passive fire protection. HTS delivers ICorr programmes in association with IMechE Argyll Ruane, serving professionals in India, the Middle East and across Asia.',
      'For this pathway, the focus is on inspecting industrial insulation and passive fire protection (PFP): how systems are specified, installed, checked and documented. HTS also offers ICorr Paint Inspector Levels 1–3, Insulation Level 2 and PFP Level 2. The wider inspector curriculum covers corrosion, materials, surface preparation, application, test methods and safety.',
    ],
    topics: ['Insulation systems and installation quality', 'Passive fire protection inspection', 'Testing, documentation and safety'],
    note: 'IMechE acquired Argyll Ruane in 2012 and continues its specialist training and consultancy work. Ask HTS which ICorr level and entry route suits you.',
    source: 'https://www.htscoatings.in/icorr-certification/',
    authority: { label: 'Institute of Corrosion', url: 'https://www.icorr.org/' },
  },
]

const documents = [
  { name: 'About course', meta: 'Overview' },
  { name: 'Schedule', meta: 'Place · Date' },
  { name: 'Fees', meta: 'Enquire' },
]

const coatingSessions = [
  { location: 'Kampala, Uganda', image: '/images/locations/kampala-jpg.jpg', onsite: '11–14 Nov 2026', online: '20 Oct 2026', startDate: '2026-11-11' },
  { location: 'Rio de Janeiro, Brazil', image: '/images/locations/rio.jpg', onsite: '13–16 Nov 2026', online: '26 Oct 2026', startDate: '2026-11-13' },
  { location: 'Xanthi, Greece', image: '/images/locations/xanthi.jpg', onsite: '15–18 Nov 2026', online: '26 Oct 2026', startDate: '2026-11-15' },
  { location: 'Netherlands', image: '/images/locations/netherlands.jpg', onsite: '17–20 Nov 2026', online: '26 Oct 2026', startDate: '2026-11-17' },
  { location: 'Brno, Czech Republic', image: '/images/locations/brno.jpg', onsite: '19–22 Nov 2026', online: '26 Oct 2026', startDate: '2026-11-19' },
  { location: 'Bucharest, Romania', image: '/images/locations/bucharest.jpg', onsite: '21–24 Nov 2026', online: '26 Oct 2026', startDate: '2026-11-21' },
  { location: 'Dubai, UAE', image: '/images/locations/dubai.jpg', onsite: '10–13 Dec 2026', online: '16 Nov 2026', startDate: '2026-12-10' },
  { location: 'Chennai, India', image: '/images/locations/chennai.jpg', onsite: '10–15 Dec 2026', online: '16 Nov 2026', startDate: '2026-12-10' },
  { location: 'Batam, Indonesia', image: '/images/locations/batam-houses.jpg', onsite: '11–17 Dec 2026', online: '16 Nov 2026', startDate: '2026-12-11' },
]
const upcomingCoatingSessions = coatingSessions.filter((session) => new Date(`${session.startDate}T23:59:59`) >= new Date()).slice(0, 3)

// The published insulation schedule currently ends in October 2026. These are previous host locations, not confirmed future classes.
const insulationLocations = [
  { location: 'Bangkok, Thailand', image: '/images/locations/bangkok.jpg' },
  { location: 'Batam, Indonesia', image: '/images/locations/batam-houses.jpg' },
  { location: 'Chennai, India', image: '/images/locations/chennai.jpg' },
]

// Illustrative locations only; HTS has not supplied dates for these ICorr classes.
const icorrLocations = [
  { location: 'Chennai, India', image: '/images/locations/chennai.jpg', track: 'Insulation' },
  { location: 'Dubai, UAE', image: '/images/locations/dubai.jpg', track: 'PFP' },
  { location: 'Singapore', image: '/images/locations/singapore.jpg', track: 'Insulation & PFP' },
]

function ScheduleCard({ session, onEnquire, provisional = false }) {
  return (
    <article className="course-schedule-card">
      <img src={session.image} alt={`View of ${session.location}`} loading="lazy" width="960" height="640" />
      <div className="course-schedule-card-content">
        {session.track && <span className="course-schedule-track">{session.track}</span>}
        <h4><MapPinIcon size={18} weight="fill" aria-hidden="true" />{session.location}</h4>
        <dl>
          <div><dt>Onsite</dt><dd>{provisional ? 'Date to be confirmed' : session.onsite}</dd></div>
          <div><dt>Online</dt><dd>{provisional ? 'Date to be confirmed' : session.online}</dd></div>
        </dl>
        <button type="button" onClick={onEnquire}>{provisional ? 'Ask for dates' : 'Enquire now'} <ArrowUpRightIcon size={16} aria-hidden="true" /></button>
      </div>
    </article>
  )
}

function CourseModalContent({ course, page, onEnquire }) {
  if (page === 'About course') {
    return (
      <div className="course-modal-body">
        {course.about.map((paragraph) => <p className="course-modal-lead" key={paragraph}>{paragraph}</p>)}
        <div className="course-modal-detail">
          <span>What you’ll cover</span>
          <ul>{course.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
        </div>
        <p className="course-modal-note">{course.note}</p>
        <div className="course-modal-sources">
          <a className="course-modal-source" href={course.source} target="_blank" rel="noreferrer">Course information from HTS <ArrowUpRightIcon size={16} aria-hidden="true" /></a>
          <a className="course-modal-source" href={course.authority.url} target="_blank" rel="noreferrer">{course.authority.label} <ArrowUpRightIcon size={16} aria-hidden="true" /></a>
        </div>
      </div>
    )
  }

  if (page === 'Schedule') {
    if (course.id === 'frosio') {
      return (
        <div className="course-modal-body course-schedule">
          <div className="course-schedule-heading"><h3>Surface treatment</h3><p>Next onsite classes listed by FROSIO Training. Some online preparation may already have begun; ask HTS about joining and availability.</p></div>
          {upcomingCoatingSessions.length > 0
            ? <div className="course-schedule-grid">{upcomingCoatingSessions.map((session) => <ScheduleCard key={session.location} session={session} onEnquire={onEnquire} />)}</div>
            : <p className="course-schedule-empty">No later coating classes are published in the current schedule. Ask HTS for the next available dates.</p>}
          <a className="course-modal-source" href="https://www.frosiotraining.com/coating-schedule/" target="_blank" rel="noreferrer">Check the live coating schedule <ArrowUpRightIcon size={16} aria-hidden="true" /></a>
          <div className="course-schedule-heading course-schedule-heading--second"><h3>Insulation</h3><p>No future insulation dates are listed at present. These are recent host locations; ask HTS when the next classes will be announced.</p></div>
          <div className="course-schedule-grid">{insulationLocations.map((session) => <ScheduleCard key={session.location} session={session} onEnquire={onEnquire} provisional />)}</div>
          <a className="course-modal-source" href="https://www.frosiotraining.com/insulation-schedule/" target="_blank" rel="noreferrer">Check the live insulation schedule <ArrowUpRightIcon size={16} aria-hidden="true" /></a>
          <p className="course-schedule-credit">Destination photographs: Wikimedia Commons contributors. <a href="/images/locations/credits.json" target="_blank" rel="noreferrer">View image credits</a>.</p>
        </div>
      )
    }
    return (
      <div className="course-modal-body course-schedule">
        <div className="course-schedule-heading"><h3>Insulation & PFP</h3><p>Example locations only. These are placeholders until HTS confirms the next ICorr class places and dates.</p></div>
        <div className="course-schedule-grid">{icorrLocations.map((session) => <ScheduleCard key={session.location} session={session} onEnquire={onEnquire} provisional />)}</div>
        <p className="course-schedule-credit">Destination photographs: Wikimedia Commons contributors. <a href="/images/locations/credits.json" target="_blank" rel="noreferrer">View image credits</a>.</p>
      </div>
    )
  }

  return (
    <div className="course-modal-body course-modal-facts">
      <div><span>Course fee</span><strong>Available on enquiry</strong></div>
      <p>Ask HTS for the current fee and what is included for your chosen course and certification level.</p>
    </div>
  )
}

export default function Courses({ onEnquire }) {
  const dialogRef = useRef(null)
  const gridRef = useRef(null)
  const [folderWidth, setFolderWidth] = useState(340)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const updateWidth = () => {
      const slot = grid.querySelector('.course-card')
      if (!slot) return
      const style = getComputedStyle(slot)
      const available = slot.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      setFolderWidth(Math.min(340, Math.floor(available)))
    }
    const observer = new ResizeObserver(updateWidth)
    observer.observe(grid)
    updateWidth()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (selected && !dialogRef.current?.open) dialogRef.current?.showModal()
  }, [selected])

  const closeDialog = () => dialogRef.current?.close()
  const enquire = () => {
    if (!selected) return
    const course = selected.course
    closeDialog()
    onEnquire(course)
  }

  return (
    <section className="courses-section section-space" id="courses" aria-labelledby="courses-title">
      <div className="frame courses-inner">
        <div className="section-intro courses-intro" data-reveal>
          <h2 id="courses-title">Explore the courses</h2>
          <p>Open a folder, then choose a file to view the course, schedule or fees.</p>
        </div>
        <div className="course-grid" ref={gridRef}>
          {courses.map((course, index) => (
            <article className="course-card" key={course.id}>
              <div className="course-card-top">
                <span>0{index + 1} / Certification course</span>
                <strong>{course.name}</strong>
              </div>
              <GlassFolder
                label={course.name}
                meta="3 files"
                art={course.art}
                seed={index + 8}
                files={documents}
                action="none"
                width={folderWidth}
                appearDelay={index * 160}
                onFileSelect={(file) => setSelected({ course, page: file.name })}
              />
              <div className="course-card-bottom">
                <h3>{course.title}</h3>
                <p>{course.short}</p>
                <span>Click to open folder <ArrowUpRightIcon size={17} aria-hidden="true" /></span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <dialog
        className={`course-dialog${selected?.page === 'Schedule' ? ' course-dialog--schedule' : ''}`}
        ref={dialogRef}
        aria-labelledby="course-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) closeDialog() }}
      >
        {selected && (
          <div className="course-dialog-panel">
            <div className="course-dialog-header">
              <div>
                <span>{selected.course.name} / {selected.page}</span>
                <h2 id="course-dialog-title">{selected.page}</h2>
                <p>{selected.course.title}</p>
              </div>
              <button type="button" className="course-dialog-close" onClick={closeDialog} aria-label="Close course details"><XIcon size={20} aria-hidden="true" /></button>
            </div>
            <CourseModalContent course={selected.course} page={selected.page} onEnquire={enquire} />
            <div className="course-dialog-footer">
              <button type="button" className="course-dialog-dismiss" onClick={closeDialog}>Close</button>
              <button type="button" className="course-dialog-enquire" onClick={enquire}>Enquire more <ArrowUpRightIcon size={18} aria-hidden="true" /></button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
