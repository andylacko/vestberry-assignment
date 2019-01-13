import React from 'react'
import PropTypes from 'prop-types'
import SvgFintech from '../svg/fintech'
import SvgIot from '../svg/iot'
import SvgRoboadvisory from '../svg/roboadvisory'
import SvgInsuretech from '../svg/insuretech'

const SectorIcon = ({ sector }) => {
  switch (sector.toLowerCase()) {
    case 'fintech':
      return <SvgFintech />
    case 'iot':
      return <SvgIot />
    case 'roboadvisory':
      return <SvgRoboadvisory />
    case 'insuretech':
      return <SvgInsuretech />
    default:
      return ''
  }
}
SectorIcon.propTypes = {
  sector: PropTypes.string,
}

export default SectorIcon
