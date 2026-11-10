import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'

type ArrowFillButtonProps = {
  href: string
  label: string
  className?: string
}

export default function ArrowFillButton({ href, label, className = '' }: ArrowFillButtonProps) {
  return (
    <a className={`arrow-fill-button ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      <span className="arrow-fill-button-label">{label}</span>
      <span className="arrow-fill-button-circle" aria-hidden="true">
        <ArrowRightIcon className="arrow-fill-button-arrow arrow-fill-button-arrow--first" size={20} weight="regular" />
        <ArrowRightIcon className="arrow-fill-button-arrow arrow-fill-button-arrow--second" size={20} weight="regular" />
      </span>
    </a>
  )
}
