import React from 'react'

const figures = [
  { value: '3500+', label: 'Students trained' },
  { value: '45+', label: 'Countries trained in' },
  { value: '10+', label: 'Years of training' },
  { value: '>98%', label: 'Post-training pass rate' },
]

const countries = [
  'Saudi Arabia',
  'Qatar',
  'UAE',
  'Vietnam',
  'Thailand',
  'Malaysia',
  'Indonesia',
  'Singapore',
  'China',
  'Egypt',
  'Taiwan',
  'Greece',
  'Germany',
]

export default function TrainingImpact() {
  return (
    <section className="training-impact" aria-labelledby="training-impact-title">
      <h2 id="training-impact-title" className="visually-hidden">HTS training impact</h2>
      <ul className="training-impact-figures" aria-label="HTS training figures">
        {figures.map(({ value, label }) => (
          <li key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <div className="training-impact-countries" aria-label="Selected countries where HTS has conducted training">
        <div className="training-impact-track">
          {[0, 1].map((copy) => (
            <ul className="training-impact-country-set" aria-hidden={copy === 1} key={copy}>
              {countries.map((country) => <li key={country}>{country}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
