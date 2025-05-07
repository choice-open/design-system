import { addons } from "@storybook/addons"

const CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR = `
  a[data-item-id*=-hidden-] {display: none !important}
`

const head = document.head || document.getElementsByTagName("head")[0]
const style = document.createElement("style")
head.appendChild(style)
style.appendChild(document.createTextNode(CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR))

addons.setConfig({
  // isFullscreen: false,
  // showNav: true,
  // showPanel: true,
  // panelPosition: 'bottom',
  enableShortcuts: false,
  // showToolbar: true,
  // theme: undefined,
  // selectedPanel: undefined,
  // initialActive: 'sidebar',
  // sidebar: {
  //   showRoots: false,
  //   collapsedRoots: ['other'],
  // },
  // toolbar: {
  //   title: { hidden: false },
  //   zoom: { hidden: false },
  //   eject: { hidden: false },
  //   copy: { hidden: false },
  //   fullscreen: { hidden: false },
  // },
})
