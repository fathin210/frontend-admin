import { CPopover } from '@coreui/react'
import React, { useState } from 'react'

function Popover() {
  const [show, setShow] = useState(false)
  return (
    <CPopover
      visible={show}
      onShow={setShow(true)}
      onHide={setShow(false)}
      placement="bottom"
    ></CPopover>
  )
}

export default Popover
