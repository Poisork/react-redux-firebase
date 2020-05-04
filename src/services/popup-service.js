import Popup from 'react-popup'

class PopupCreator {
  constructor () {
    PopupCreator.createModal()
    PopupCreator.createConfirm()
  }

  static getButtonConfig ({ text, onClick = () => {} }, className) {
    return [
      {
        text,
        className,
        key: 'enter',
        action: () => {
          onClick()
          Popup.close()
        }
      }
    ]
  }

  static create ({ type, leftClass, rightClass }) {
    Popup.registerPlugin(
      type,
      ({ message, left = null, right = null, onClose = () => {}, popupClassName = '', bringToFront = false }) => {
        const buttons = {}
        if (right) {
          buttons.right = PopupCreator.getButtonConfig(right, rightClass)
        }
        if (left) {
          buttons.left = PopupCreator.getButtonConfig(left, leftClass)
        }
        Popup.create(
          {
            className: `${type} ${popupClassName}`,
            content: message.call ? message(() => Popup.close()) : message,
            buttons,
            onClose
          },
          bringToFront
        )
      }
    )
  }

  static createModal () {
    PopupCreator.create({ type: 'modal' })
  }

  static createConfirm () {
    PopupCreator.create({ type: 'confirm', leftClass: 'confirm_red', rightClass: 'confirm_green' })
  }
}

export const popupCreator = new PopupCreator()

export default class PopupModal {
  static modal (args) {
    Popup.plugins().modal(args)
  }

  static confirm (args) {
    Popup.plugins().confirm(args)
  }
}
