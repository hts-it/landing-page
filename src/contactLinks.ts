export const emailAddress = 'info@htscoatings.in'
export const whatsappUrl = 'https://wa.me/919176618930'

export function createGmailComposeUrl(subject = '', body = '') {
  const url = new URL('https://mail.google.com/mail/')
  url.searchParams.set('view', 'cm')
  url.searchParams.set('fs', '1')
  url.searchParams.set('to', emailAddress)
  if (subject) url.searchParams.set('su', subject)
  if (body) url.searchParams.set('body', body)
  return url.toString()
}

export const gmailComposeUrl = createGmailComposeUrl()
