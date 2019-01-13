import React from 'react'
import styles from '../App.scss'
import PropTypes from 'prop-types'
import Sector from './Sector'
import { SECTORS } from '../config/constants'

const Sectors = ({ company }) => {
  const sectors = {}
  SECTORS.map(sector => {
    sectors[sector] = 0
  })
  company.map(comp => {
    sectors[comp.sector] = sectors[comp.sector] + 1
  })
  return (
    <div className={styles.sectors}>
      {
        Object.keys(sectors).map(sectorKey => <Sector
          key={`sector.${sectorKey}`}
          sector={sectorKey}
          count={sectors[sectorKey]}
        />,
        )
      }
    </div>
  )
}
Sectors.propTypes = {
  company: PropTypes.array,
}
export default Sectors
