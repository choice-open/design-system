import { ArrowUp, AtSign, Image, Smile } from "@choiceform/icons-react"
import { ChangeEvent, useRef } from "react"
import { useI18nContext } from "~/i18n/i18n-react"
import { Button } from "../../../../button"
import { IconButton } from "../../../../icon-button"
import { CommentInputTv } from "../tv"

interface CommentInputFooterProps {
  className?: string
  onEmojiClick?: () => void
  onMentionClick?: () => void
  onImageUpload?: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit?: () => void
  onCancel?: () => void
  disabled?: boolean
  typing?: boolean
  allowSubmission?: boolean
  isEditMode?: boolean
  emojiButtonRef?: React.RefObject<HTMLButtonElement>
  disableImageUpload?: boolean
  imageCount?: number
  maxImageCount?: number
  hasOnlyImages?: boolean
}

export const CommentInputFooter = ({
  className,
  onEmojiClick,
  onMentionClick,
  onImageUpload,
  onSubmit,
  onCancel,
  disabled = false,
  typing = false,
  allowSubmission = false,
  isEditMode = false,
  emojiButtonRef,
  disableImageUpload = false,
  imageCount = 0,
  maxImageCount = 5,
  hasOnlyImages = false,
}: CommentInputFooterProps) => {
  const { LL } = useI18nContext()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageButtonClick = () => {
    if (disableImageUpload) return
    fileInputRef.current?.click()
  }

  const styles = CommentInputTv({ typing })

  // 构建图片上传按钮的tooltip文本
  const getImageTooltipText = () => {
    if (disableImageUpload) {
      return `${LL.comments.attachment()} (${imageCount}/${maxImageCount})`
    }
    return `${LL.comments.attachment()} (${imageCount}/${maxImageCount})`
  }

  // 计算提交按钮是否应该禁用
  const isSubmitDisabled = disabled || !allowSubmission || hasOnlyImages

  return (
    <div className={styles.footer({ className })}>
      {typing && (
        <div className={styles.footerActions()}>
          {/* Emoji Button */}
          <IconButton
            ref={emojiButtonRef}
            onClick={onEmojiClick}
            tooltip={{
              content: LL.comments.emoji(),
            }}
          >
            <Smile />
          </IconButton>

          {/* Mention Button */}
          <IconButton
            onClick={onMentionClick}
            tooltip={{
              content: LL.comments.mention(),
            }}
          >
            <AtSign />
          </IconButton>

          {/* Image Upload Button */}
          <IconButton
            onClick={handleImageButtonClick}
            disabled={disableImageUpload}
            tooltip={{
              content: getImageTooltipText(),
            }}
          >
            <Image />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onImageUpload}
              className="hidden"
              disabled={disableImageUpload}
            />
          </IconButton>
        </div>
      )}

      {/* Edit Mode: Save and Cancel Buttons */}
      {isEditMode ? (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            {LL.common.cancel()}
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={isSubmitDisabled}
          >
            {LL.common.save()}
          </Button>
        </div>
      ) : (
        /* Submit Button */
        <Button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="w-6 rounded-full border-none px-0"
          tooltip={{
            content: LL.comments.submit(),
          }}
        >
          <ArrowUp />
        </Button>
      )}
    </div>
  )
}
