import React, { useState } from 'react'
import { BaseStyles, Box, Heading } from '@primer/components'

const Options: React.FC = () => {
  return (
    <BaseStyles>
      <Box m={4}>
        <Heading mb={2}>Hello, options!</Heading>
        <p>This will get Primer text styles.</p>
      </Box>
    </BaseStyles>
  )
}

export default Options
