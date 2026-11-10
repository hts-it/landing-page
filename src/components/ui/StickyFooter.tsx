import { useEffect, useRef, useState } from 'react'
import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/csr/LinkedinLogo'
import { EnvelopeIcon } from '@phosphor-icons/react/dist/csr/Envelope'
import { PhoneIcon } from '@phosphor-icons/react/dist/csr/Phone'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { gmailComposeUrl } from '../../contactLinks'

const footerGroups = [
  {
    label: 'Training',
    links: [
      { title: 'FROSIO certification', href: '#courses' },
      { title: 'ICorr certification', href: '#courses' },
      { title: 'Practical training', href: '#enquiry' },
      { title: 'Course enquiries', href: '#enquiry' },
    ],
  },
  {
    label: 'Industrial services',
    links: [
      { title: 'Third-party inspection', href: '#enquiry' },
      { title: 'Coating consultancy', href: '#enquiry' },
      { title: 'Industrial projects', href: '#enquiry' },
      { title: 'Manpower solutions', href: '#enquiry' },
    ],
  },
  {
    label: 'Explore',
    links: [
      { title: 'Home', href: '#top' },
      { title: 'Courses', href: '#courses' },
      { title: 'Contact us', href: '#enquiry' },
      { title: 'HTS at work', href: '#work' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'Email HTS', href: gmailComposeUrl, external: true },
      { title: 'Phone', href: 'tel:+919176618930', phonePair: true },
      { title: 'HTS website', href: 'https://www.htscoatings.in/', external: true },
      { title: 'LinkedIn', href: 'https://www.linkedin.com/company/hts-coatings/', external: true },
    ],
  },
] as const

const socialLinks = [
  { label: 'HTS Global on LinkedIn', href: 'https://www.linkedin.com/company/hts-coatings/', icon: LinkedinLogoIcon, external: true },
  { label: 'Email HTS Global', href: gmailComposeUrl, icon: EnvelopeIcon, external: true },
  { label: 'Call HTS Global in India', href: 'tel:+919176618930', icon: PhoneIcon, external: false },
  { label: 'Call HTS Global in the UAE', href: 'tel:+971567919104', icon: PhoneIcon, external: false },
] as const

export default function StickyFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.05 })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className={`site-footer${isVisible ? ' footer-in-view' : ''}`}>
      <div className="sticky-footer-fixed">
        <div className="sticky-footer-panel">
          <div className="sticky-footer-glow" aria-hidden="true" />
          <div className="sticky-footer-top frame">
            <div className="sticky-footer-brand footer-animated">
              <a href="#top" aria-label="HTS Global, back to top"><img className="footer-logo" src="/images/hts-global-logo.png" alt="HTS Global" /></a>
              <p>Harvish Technical Services develops coating professionals and helps protect industrial assets.</p>
              <div className="sticky-footer-socials" aria-label="Contact HTS Global">
                {socialLinks.map(({ label, href, icon: Icon, external }) => (
                  <a key={label} href={href} aria-label={label} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                    <Icon size={18} weight="regular" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="sticky-footer-groups">
              {footerGroups.map((group, index) => (
                <nav key={group.label} className="sticky-footer-group footer-animated" aria-label={`${group.label} footer links`} style={{ transitionDelay: `${index * 80}ms` }}>
                  <h2>{group.label}</h2>
                  <ul>
                    {group.links.map((link) => (
                      <li key={link.title}>
                        {'phonePair' in link ? (
                          <span className="footer-phone-pair"><a href="tel:+919176618930">+91 91766 18930</a><span aria-hidden="true">/</span><a href="tel:+971567919104">+971 56 791 9104</a></span>
                        ) : (
                          <a href={link.href} target={'external' in link && link.external ? '_blank' : undefined} rel={'external' in link && link.external ? 'noreferrer' : undefined}>
                            {link.title}
                            {'external' in link && link.external && <ArrowUpRightIcon size={13} aria-hidden="true" />}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
          <div className="sticky-footer-bottom frame">
            <div className="footer-legal"><p>© {new Date().getFullYear()} HTS Global. All rights reserved.</p><nav aria-label="Legal pages"><a href="/terms-and-conditions/">Terms and Conditions</a><a href="/privacy-policy/">Privacy Policy</a></nav></div>
            <p>Harvish Technical Services</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
