import { addons } from "@storybook/addons"
import { defaultConfig, type TagBadgeParameters } from "storybook-addon-tag-badges"

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

  tagBadges: [
    // Add an entry that matches 'frog' and displays a cool badge in the sidebar only
    {
      tags: "new",
      badge: {
        text: "New 🔆",
        bgColor: "transparent",
        fgColor: "rgba(13, 153, 255, 1)",
        borderColor: "transparent",
        tooltip: "Recently added components or props/features",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "beta",
      badge: {
        text: "Beta ⚡️",
        bgColor: "transparent",
        fgColor: "rgba(151, 71, 255, 1)",
        borderColor: "transparent",
        tooltip: "Warn that a component or prop is not stable yet",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "upgrade",
      badge: {
        text: "Upgrade ☘️",
        bgColor: "transparent",
        fgColor: "rgba(20, 174, 92, 1)",
        borderColor: "transparent",
        tooltip:
          "Indicates that a component or feature has been significantly improved or changed, and users are encouraged to update to the latest version to benefit from new enhancements, optimizations, or important fixes. ",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
})
