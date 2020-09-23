import defaultSettings from '@/settings'

const title = defaultSettings.title || 'EOS VUE APP'

export default function getPageTitle(pageTitle) {
  return pageTitle || title
}
