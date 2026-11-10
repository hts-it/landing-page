import { useEffect, useRef } from 'react'
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import atlas from 'world-atlas/countries-110m.json'

const topology = atlas as unknown as Topology
const countries = feature(topology, topology.objects.countries as GeometryCollection).features
const graticule = geoGraticule10()
const size = 520

export default function ContactWireframeGlobe() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-country]'))
    const grid = svg.querySelector<SVGPathElement>('[data-grid]')
    const projection = geoOrthographic()
      .translate([size / 2, size / 2])
      .scale(size * 0.435)
      .clipAngle(90)
      .precision(0.6)
    const path = geoPath(projection)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let frame = 0
    let lastFrame = 0
    let longitude = -68
    let dragging = false
    let lastX = 0

    const draw = () => {
      projection.rotate([longitude, -16])
      if (grid) grid.setAttribute('d', path(graticule) ?? '')
      paths.forEach((node, index) => node.setAttribute('d', path(countries[index]) ?? ''))
    }

    const tick = (now: number) => {
      frame = 0
      if (!visible || reducedMotion.matches || dragging) return
      if (now - lastFrame > 40) {
        longitude = (longitude + 0.42) % 360
        draw()
        lastFrame = now
      }
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (visible && !reducedMotion.matches && !dragging && !frame) frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    }, { threshold: 0.05 })
    observer.observe(svg)

    const pointerDown = (event: PointerEvent) => {
      dragging = true
      stop()
      lastX = event.clientX
      svg.setPointerCapture(event.pointerId)
    }
    const pointerMove = (event: PointerEvent) => {
      if (!dragging) return
      longitude += (event.clientX - lastX) * 0.5
      lastX = event.clientX
      draw()
    }
    const pointerUp = () => { dragging = false; start() }
    const motionChange = () => { if (reducedMotion.matches) stop(); else start() }

    reducedMotion.addEventListener('change', motionChange)
    svg.addEventListener('pointerdown', pointerDown)
    svg.addEventListener('pointermove', pointerMove)
    svg.addEventListener('pointerup', pointerUp)
    svg.addEventListener('pointercancel', pointerUp)
    draw()

    return () => {
      stop()
      observer.disconnect()
      reducedMotion.removeEventListener('change', motionChange)
      svg.removeEventListener('pointerdown', pointerDown)
      svg.removeEventListener('pointermove', pointerMove)
      svg.removeEventListener('pointerup', pointerUp)
      svg.removeEventListener('pointercancel', pointerUp)
    }
  }, [])

  return (
    <svg ref={svgRef} className="contact-globe-svg" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={size * 0.435} className="contact-globe-outline" />
      <path data-grid className="contact-globe-grid" />
      {countries.map((country, index) => <path data-country key={country.id ?? index} className="contact-globe-country" />)}
    </svg>
  )
}
