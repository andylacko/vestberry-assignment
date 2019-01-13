import React from 'react'
import styles from '../App.scss'
import PropTypes from 'prop-types'
import SectorIcon from './SectorIcon'

const Sector = ({ count, sector }) => {
  return (<div className={styles.sector}>
    <div>
      <h3>{count}</h3>
      <span>{sector}</span>
      <SectorIcon sector={sector} />
    </div>
  </div>)
}

Sector.propTypes = {
  count: PropTypes.number,
  sector: PropTypes.string,
}

export default Sector
