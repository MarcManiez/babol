import { postLink } from './api'

export default function attachEventListeners() {
  const linkForm = document.querySelector<HTMLFormElement>(
    '.HomePage .link-form',
  )
  if (linkForm) {
    linkForm.onsubmit = async event => {
      event.preventDefault()
      const linkInput = linkForm.querySelector<HTMLInputElement>(
        '[name="link"]',
      )
      if (linkInput) {
        await postLink(linkInput.value)
      }
    }
  }
}
