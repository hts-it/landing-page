import React, { useEffect, useRef, useState } from 'react'
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { LiquidNavbar, NimbusIcons } from './components/ui/liquid-glass-navbar.tsx'
import AgencyHeroSection from './components/ui/hero-01.tsx'
import TimedEnquiryPopup from './components/ui/TimedEnquiryPopup.tsx'
import TrainingJourney from './components/TrainingJourney.jsx'
import TrainingImpact from './components/TrainingImpact.jsx'
import Courses from './components/Courses.jsx'
import { EnvelopeIcon } from '@phosphor-icons/react/dist/csr/Envelope'
import { PhoneIcon } from '@phosphor-icons/react/dist/csr/Phone'
import { GlobeHemisphereEastIcon } from '@phosphor-icons/react/dist/csr/GlobeHemisphereEast'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/csr/ArrowsClockwise'
import { BookOpenIcon } from '@phosphor-icons/react/dist/csr/BookOpen'
import { ChatCircleDotsIcon } from '@phosphor-icons/react/dist/csr/ChatCircleDots'
import StickyFooter from './components/ui/StickyFooter.tsx'
import WorkGallery from './components/ui/WorkGallery.tsx'
import ArrowFillButton from './components/ui/ArrowFillButton.tsx'
import { createGmailComposeUrl, emailAddress, gmailComposeUrl, whatsappUrl } from './contactLinks'

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
const countryOptions = getCountries()
  .map((code) => ({ code, name: regionNames.of(code) || code, dialCode: getCountryCallingCode(code) }))
  .sort((a, b) => a.name.localeCompare(b.name))
const ContactWireframeGlobe = React.lazy(() => import('./components/ui/ContactWireframeGlobe.tsx'))

const enquiryTopics = [
  'FROSIO Surface Treatment & Insulation',
  'ICorr Insulation & PFP',
  'Blasting and spray application',
  'Third-party inspection',
]
const navigationItems = [
  { label: 'Home', href: '#top', icon: NimbusIcons.home, fx: 'glow' },
  { label: 'Courses', href: '#courses', icon: <BookOpenIcon size={18} weight="regular" aria-hidden="true" />, fx: 'wave' },
  { label: 'Enquire', href: '#enquiry', icon: <ChatCircleDotsIcon size={18} weight="regular" aria-hidden="true" />, fx: 'pop' },
  { label: 'Work', href: '#work', icon: NimbusIcons.globe, fx: 'spin' },
]

function moveToEnquiry() {
  document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })
}

function makeCaptcha(previous) {
  let challenge
  do {
    challenge = { first: Math.ceil(Math.random() * 9), second: Math.ceil(Math.random() * 9) }
  } while (previous && challenge.first === previous.first && challenge.second === previous.second)
  return challenge
}

function DeferredContactGlobe() {
  const containerRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true)
        observer.disconnect()
      }
    }, { rootMargin: '600px 0px' })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return <div ref={containerRef} className="contact-globe" aria-hidden="true">{shouldLoad && <React.Suspense fallback={null}><ContactWireframeGlobe /></React.Suspense>}</div>
}

function App() {
  const [interest, setInterest] = useState('')
  const [audience, setAudience] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState('')
  const [navActive, setNavActive] = useState(0)
  const [captcha, setCaptcha] = useState(makeCaptcha)
  const phoneRef = useRef(null)
  const dialCode = country ? getCountryCallingCode(country) : ''

  useEffect(() => {
    const ids = ['top', 'courses', 'enquiry', 'work']
    const updateActive = () => {
      const readingLine = window.scrollY + 140
      let next = 0
      ids.forEach((id, index) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= readingLine) next = index
      })
      setNavActive(next)
    }
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    document.documentElement.classList.add('motion-ready')
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  function enquireAboutCourse(course) {
    setInterest(`${course.name} ${course.title}`)
    setAudience('Individual / professional')
    moveToEnquiry()
    requestAnimationFrame(() => document.getElementById('enquiry-name')?.focus({ preventScroll: true }))
  }

  function submitEnquiry(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    for (const fieldName of ['name', 'company', 'message']) {
      const field = form.elements.namedItem(fieldName)
      if (!field?.value.trim()) {
        setStatus('Please complete every field before preparing your enquiry.')
        field?.focus()
        return
      }
    }

    const phoneInput = form.elements.namedItem('phone')
    const parsedPhone = parsePhoneNumberFromString(phoneInput?.value.trim() || '', country || undefined)
    if (!parsedPhone?.isValid() || parsedPhone.countryCallingCode !== dialCode) {
      phoneInput?.setCustomValidity('Enter a valid phone number for the selected country.')
      phoneInput?.reportValidity()
      setStatus('Please enter a valid phone number for the selected country.')
      return
    }
    phoneInput.setCustomValidity('')

    const captchaInput = form.elements.namedItem('captcha')
    if (!captchaInput || Number(captchaInput.value.trim()) !== captcha.first + captcha.second) {
      captchaInput?.setCustomValidity('Please check the sum and try again.')
      captchaInput?.reportValidity()
      setStatus('The verification answer is incorrect. Please try again.')
      return
    }
    captchaInput.setCustomValidity('')

    const fields = new FormData(form)
    const name = String(fields.get('name') || '').trim()
    const company = String(fields.get('company') || '').trim()
    const email = String(fields.get('email') || '').trim()
    const selectedCountry = countryOptions.find((item) => item.code === country)?.name || country
    const type = String(fields.get('audience') || '').trim()
    const topic = String(fields.get('interest') || '').trim()
    const message = String(fields.get('message') || '').trim()
    const subject = `HTS Global enquiry: ${topic}`
    const body = [
      'Hello HTS Global,',
      '',
      'I would like to register my interest.',
      '',
      `Name: ${name}`,
      `Company / affiliation: ${company}`,
      `Email: ${email}`,
      `Country: ${selectedCountry}`,
      `Phone: ${parsedPhone.formatInternational()}`,
      `I am enquiring as: ${type}`,
      `Interested in: ${topic}`,
      '',
      `Message: ${message}`,
    ].join('\n')

    window.open(createGmailComposeUrl(subject, body), '_blank', 'noopener,noreferrer')
    setStatus('Gmail should open with a prepared enquiry. Send the message there to contact HTS.')
    setCaptcha((current) => makeCaptcha(current))
    captchaInput.value = ''
  }

  return (
    <>
      <header className="site-header">
        <div className="nav frame">
          <a className="nav-name" href="#top" aria-label="HTS Global, back to top"><img className="nav-logo" src="/images/hts-global-logo.png" alt="HTS Global" /></a>
          <LiquidNavbar items={navigationItems} tone="light" active={navActive} onChange={setNavActive} sound={false} />
          <ArrowFillButton className="nav-contact" href={whatsappUrl} label="Whatsapp Us" />
        </div>
      </header>

      <main id="top">
        <AgencyHeroSection onEnquire={moveToEnquiry} />

        <TrainingJourney />

        <TrainingImpact />

        <Courses onEnquire={enquireAboutCourse} />

        <section className="enquiry-section section-space" id="enquiry" aria-labelledby="enquiry-title">
          <div className="contact-inner frame">
            <div className="contact-heading" data-reveal>
              <h2 id="enquiry-title">Contact us</h2>
              <p>Tell us about your training goals or industrial requirements. We’ll help you find the right next step.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-details" data-reveal>
                <h3>Get in touch</h3>
                <p>Ask us about certification, practical training, coating inspection, or project support.</p>
                <div className="contact-links">
                  <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer"><span className="contact-link-icon"><EnvelopeIcon size={18} aria-hidden="true" /></span>{emailAddress}</a>
                  <div className="contact-phone-links"><span className="contact-link-icon"><PhoneIcon size={18} aria-hidden="true" /></span><a href="tel:+919176618930">+91 91766 18930</a><span aria-hidden="true">/</span><a href="tel:+971567919104">+971 56 791 9104</a></div>
                  <a href="https://www.htscoatings.in/" target="_blank" rel="noreferrer"><span className="contact-link-icon"><GlobeHemisphereEastIcon size={18} aria-hidden="true" /></span>htscoatings.in</a>
                </div>
                <DeferredContactGlobe />
              </div>
              <form className="contact-form" onSubmit={submitEnquiry} data-reveal>
                <div className="contact-form-heading">
                  <h3>Send an enquiry</h3>
                  <p>Share a few details and we’ll prepare your message to HTS.</p>
                </div>
                <div className="contact-form-dots" aria-hidden="true" />
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="enquiry-name">Full name</label>
                    <input id="enquiry-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="enquiry-company">Company / affiliation</label>
                    <input id="enquiry-company" name="company" type="text" autoComplete="organization" placeholder="Company or affiliation" required />
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="enquiry-email">Email address</label>
                  <input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="Your email address" required />
                </div>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="enquiry-country">Country</label>
                    <select id="enquiry-country" name="country" autoComplete="country" value={country} onChange={(event) => { setCountry(event.target.value); phoneRef.current?.setCustomValidity('') }} required>
                      <option value="" disabled>Select your country</option>
                      {countryOptions.map((item) => <option key={item.code} value={item.code}>{item.name} (+{item.dialCode})</option>)}
                    </select>
                  </div>
                  <div className="contact-field">
                    <label htmlFor="enquiry-phone">Phone number</label>
                    <div className="contact-phone-input">
                      <span className="contact-phone-code" aria-label={country ? `Dialling code plus ${dialCode}` : 'Select a country for the dialling code'}>{country ? `+${dialCode}` : '—'}</span>
                      <input id="enquiry-phone" ref={phoneRef} name="phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="Phone number" required onChange={(event) => event.currentTarget.setCustomValidity('')} />
                    </div>
                  </div>
                </div>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="enquiry-audience">I am enquiring as</label>
                    <select id="enquiry-audience" name="audience" value={audience} onChange={(event) => setAudience(event.target.value)} required>
                      <option value="" disabled>Select one</option>
                      <option>Individual / professional</option>
                      <option>Organisation</option>
                    </select>
                  </div>
                  <div className="contact-field">
                    <label htmlFor="enquiry-interest">Interested in</label>
                    <select id="enquiry-interest" name="interest" value={interest} onChange={(event) => setInterest(event.target.value)} required>
                      <option value="" disabled>Select a topic</option>
                      {enquiryTopics.map((topic) => <option key={topic}>{topic}</option>)}
                      <option>Other enquiry</option>
                    </select>
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="enquiry-message">Message</label>
                  <textarea id="enquiry-message" name="message" rows="4" placeholder="Tell us what you need" required />
                </div>
                <div className="contact-field contact-captcha">
                  <label htmlFor="enquiry-captcha">Verify: what is {captcha.first} + {captcha.second}?</label>
                  <div className="contact-captcha-controls">
                    <input id="enquiry-captcha" name="captcha" type="text" inputMode="numeric" pattern="[0-9]+" autoComplete="off" placeholder="Enter the sum" required onChange={(event) => event.currentTarget.setCustomValidity('')} />
                    <button type="button" className="contact-captcha-refresh" aria-label="Generate a new verification question" onClick={() => { setCaptcha((current) => makeCaptcha(current)); const input = document.getElementById('enquiry-captcha'); input.value = ''; input.setCustomValidity(''); setStatus('') }}><ArrowsClockwiseIcon size={20} aria-hidden="true" /></button>
                  </div>
                </div>
                <button className="contact-submit" type="submit">Send Enquiry<ArrowRightIcon size={18} weight="bold" aria-hidden="true" /></button>
                <p className="contact-form-note">This opens Gmail. Your enquiry is sent when you send the message. <a href="/privacy-policy/">Privacy Policy</a></p>
                {status && <p className="contact-form-status" role="status">{status}</p>}
              </form>
            </div>
          </div>
        </section>

        <WorkGallery />
      </main>

      <StickyFooter />
      <TimedEnquiryPopup onEnquire={moveToEnquiry} />
    </>
  )
}

export default App
