"use client"
import { color, ColorPath } from "@choice-ui/design-tokens";
import { memo, useState } from "react";
import {
  ColorField,
  ColorTypes,
  ColorTypesSelect,
  ColorValue,
  Panel,
  PanelHeader,
  Section,
} from "..";
import { overviewSemanticGroups } from "./contents";

export const SectionOverviewSemanticColors = memo(
  function SectionOverviewSemanticColors() {
    const [colorType, setColorType] = useState<ColorTypes>(ColorTypes.FUNCTION);

    return (
      <Section
        title="Semantic Tokens"
        content={
          <p>
            Semantic color tokens provide consistent, context-aware color
            choices that adapt automatically to different themes. These tokens
            abstract away specific color values and focus on the intended use
            case, making your designs more maintainable and theme-ready.
          </p>
        }
      >
        <PanelHeader>
          <ColorTypesSelect colorType={colorType} setColorType={setColorType} />
        </PanelHeader>

        {["light", "dark"].map((theme) => (
          <Panel theme={theme as "light" | "dark"} key={theme}>
            {overviewSemanticGroups.map((colorData) => {
              return (
                <ColorField
                  key={colorData.name}
                  colorValue={color(colorData.colorKey as ColorPath)}
                  colorString={
                    <ColorValue
                      selectedColor={colorData.name}
                      colorType={colorType}
                      shade={{
                        key: colorData.colorKey,
                      }}
                      theme={theme as "light" | "dark"}
                    />
                  }
                />
              );
            })}
          </Panel>
        ))}
      </Section>
    );
  }
);

SectionOverviewSemanticColors.displayName = "SectionOverviewSemanticColors";
