import React from 'react'
import { gmailComposeUrl } from './contactLinks'

const legalPages = {
  terms: {
    title: 'Terms and Conditions',
    source: 'https://www.htscoatings.in/terms-conditions/',
    introduction: 'These terms cover use of the HTS website and the services made available through it. Specific training or industrial services may also have separate agreements.',
    sections: [
      {
        title: 'Using the website',
        paragraphs: ['By accessing or using the website, you agree to the published terms. If you do not agree, do not use the website or its services.'],
      },
      {
        title: 'Eligibility',
        paragraphs: ['The published terms limit use to people and organisations that can enter legally binding agreements under applicable law, including the required age of majority.'],
      },
      {
        title: 'Accounts and security',
        paragraphs: ['Where a service requires registration, an account may use your email address and password. You are asked to report unauthorised use promptly. The published terms say the company is not responsible for losses from unauthorised account use. This landing page does not provide account registration.'],
      },
      {
        title: 'Enquiries',
        paragraphs: ['The enquiry form on this landing page prepares a message in Gmail. Your enquiry reaches HTS Global only after you send that message. Course dates, fees and service arrangements are confirmed directly with the team.'],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    source: 'https://www.htscoatings.in/privacy-policy/',
    introduction: 'This page summarises how the published HTS website policy describes information collected during online visits and enquiries.',
    sections: [
      {
        title: 'Information you provide',
        paragraphs: ['When you contact the team, you may provide your name, company, email address, country, phone number and message. Direct emails may also include attachments or other details you choose to share. The published policy additionally describes information requested when registering for an account.'],
      },
      {
        title: 'How information is used',
        paragraphs: ['The published policy describes using information to operate and improve the website, respond to enquiries, communicate about services and updates, and help prevent fraud.'],
      },
      {
        title: 'Website data and other services',
        paragraphs: ['The published policy discusses server logs, cookies, and third-party advertising technologies on the main HTS website. Those providers may have their own policies and browser controls. Read the full published policy for those details.'],
      },
      {
        title: 'Your choices and rights',
        paragraphs: ['The published policy describes rights to request access, correction, deletion, restriction, objection or portability of personal data, as applicable. It also covers California privacy requests. Contact the team at info@htscoatings.in to make a request or ask a privacy question.'],
      },
      {
        title: 'Children and this enquiry form',
        paragraphs: ['The published policy says the main website does not knowingly collect personal information from children under 13. On this landing page, the form prepares a Gmail message locally; its details are sent only if you send it.'],
      },
    ],
  },
}

export default function LegalPage({ kind }) {
  const page = legalPages[kind] || legalPages.terms

  return (
    <div className="legal-page">
      <header className="legal-header frame">
        <a className="legal-wordmark" href="/" aria-label="HTS Global home"><img src="/images/hts-global-logo.png" alt="HTS Global" /></a>
        <a className="legal-home" href="/">Back to home <span aria-hidden="true">↗</span></a>
      </header>
      <main className="legal-main frame">
        <h1>{page.title}</h1>
        <p className="legal-intro">{page.introduction}</p>
        <div className="legal-content">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        <p className="legal-source">This is a concise local version. <a href={page.source} target="_blank" rel="noreferrer">Read the full published {page.title.toLowerCase()} on the HTS website ↗</a></p>
      </main>
      <footer className="legal-footer frame">
        <span>© {new Date().getFullYear()} HTS Global</span>
        <nav aria-label="Legal pages"><a href="/terms-and-conditions/">Terms and Conditions</a><a href="/privacy-policy/">Privacy Policy</a></nav>
        <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer">Contact HTS Global</a>
      </footer>
    </div>
  )
}
