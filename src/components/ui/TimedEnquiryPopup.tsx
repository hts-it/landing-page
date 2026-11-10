import { useEffect, useRef, type MouseEvent } from 'react'
import FinalCtaBanner from './final-cta-banner'
import ArrowFillButton from './ArrowFillButton'
import { whatsappUrl } from '../../contactLinks'

const DELAY_MS = 20_000

type TimedEnquiryPopupProps = {
  onEnquire: () => void
}

export default function TimedEnquiryPopup({ onEnquire }: TimedEnquiryPopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dismissedRef = useRef(false)

  useEffect(() => {
    let remaining = DELAY_MS
    let startedAt = 0
    let timer: number | undefined

    const pause = () => {
      if (timer === undefined) return
      window.clearTimeout(timer)
      timer = undefined
      remaining = Math.max(0, remaining - (Date.now() - startedAt))
    }

    const start = () => {
      if (dismissedRef.current || document.visibilityState !== 'visible' || timer !== undefined) return
      startedAt = Date.now()
      const showWhenReady = () => {
        if (dismissedRef.current) return
        if (document.querySelector('dialog[open]')) {
          timer = window.setTimeout(showWhenReady, 300)
          return
        }
        timer = undefined
        if (!dialogRef.current?.open) dialogRef.current?.showModal()
      }
      timer = window.setTimeout(showWhenReady, remaining)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') start()
      else pause()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    start()
    return () => {
      pause()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  const close = () => {
    dismissedRef.current = true
    dialogRef.current?.close()
  }

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      close()
      return
    }

    const link = event.target instanceof Element ? event.target.closest('a') : null
    if (link?.getAttribute('href') === '#enquiry') {
      event.preventDefault()
      close()
      onEnquire()
      requestAnimationFrame(() => document.getElementById('enquiry-name')?.focus({ preventScroll: true }))
    } else if (link?.getAttribute('href') === whatsappUrl) {
      close()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="hts-cta-dialog"
      aria-labelledby="final-cta-heading"
      onClick={handleClick}
      onClose={() => { dismissedRef.current = true }}
    >
      <button className="hts-cta-close" type="button" onClick={close} aria-label="Close enquiry prompt">×</button>
      <FinalCtaBanner
        eyebrow="HTS Global / Let's talk"
        heading="Protect your assets. Advance your career."
        body="Need training or coating support? Tell HTS what you need."
        primaryLabel="Make an enquiry"
        primaryHref="#enquiry"
        secondaryAction={<ArrowFillButton href={whatsappUrl} label="Whatsapp Us" />}
        gradientColors={['#183f91', '#003399', '#08265c', '#d9b321']}
      />
    </dialog>
  )
}
