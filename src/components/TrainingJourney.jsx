import React from 'react'

const steps = [
  {
    number: '01',
    label: 'Understand',
    title: 'Find your route',
    description: 'Tell us your career goal or project requirement so we can point you to relevant training or services.',
    icon: 'route',
  },
  {
    number: '02',
    label: 'Learn',
    title: 'Build knowledge',
    description: 'Study corrosion, protective coatings, standards, and inspection pathways including FROSIO and ICorr.',
    icon: 'knowledge',
  },
  {
    number: '03',
    label: 'Practise',
    title: 'Train hands-on',
    description: 'Work with surface preparation, blasting, spray application, and coating inspection methods.',
    icon: 'practice',
  },
  {
    number: '04',
    label: 'Apply',
    title: 'Support the field',
    description: 'Bring coating inspection and technical support to industrial assets and active projects.',
    icon: 'field',
  },
]

function StepIcon({ kind }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (kind === 'route') {
    return <svg {...common}><path d="M10 10h28v20H22l-9 8v-8h-3z" /><path className="intro-icon-accent" d="M17 20h1m6 0h1m6 0h1" /></svg>
  }
  if (kind === 'knowledge') {
    return <svg {...common}><path d="M9 8h18l8 8v24H9zM27 8v9h8M16 25h12M16 31h14" /><path className="intro-icon-accent" d="M16 19h5" /></svg>
  }
  if (kind === 'practice') {
    return <svg {...common}><path d="M8 12h25v12H8zM33 16h5v4h-5M20 24v6m0 0h8v9h-8z" /><path className="intro-icon-accent" d="M13 18h15" /></svg>
  }
  return <svg {...common}><path d="M24 5 9 11v12c0 10 6 17 15 20 9-3 15-10 15-20V11z" /><path className="intro-icon-accent" d="m17 24 5 5 10-11" /></svg>
}

export default function TrainingJourney() {
  return (
    <section className="intro-section section-space" aria-labelledby="intro-title">
      <div className="intro-section-inner frame">
        <p className="intro-eyebrow" data-reveal>How HTS works</p>
        <h2 id="intro-title" data-reveal>From training to<br /><em>field work.</em></h2>
        <p className="intro-description" data-reveal>A practical route from specialist knowledge to skills and support that protect industrial assets.</p>
        <ol className="intro-steps">
          {steps.map((step) => (
            <li className="intro-step" key={step.number} data-reveal>
              <span className="intro-step-kicker">{step.number} / {step.label}</span>
              <span className="intro-step-icon"><StepIcon kind={step.icon} /></span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
