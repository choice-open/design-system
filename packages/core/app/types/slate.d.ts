import { BaseElement, BaseText } from "slate"
import type { CustomElement, CustomText, CustomEditor } from "../components/rich-input/types"

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement
    Text: CustomText
    Editor: CustomEditor
  }
}
