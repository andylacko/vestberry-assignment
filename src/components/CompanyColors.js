import React from 'react'
import styles from '../App.scss'
import PropTypes from 'prop-types'

const CompanyColors = ({ company }) => {
  return (
    <div className={styles.companyColors}>
      {
        company.map((c, idx) => <div key={`company.colors.${idx}`}>
          <span
            style={{ backgroundColor: c.color }}
            className={styles.circle}
          />
          <h4>{c.name}</h4>
        </div>)
      }
    </div>
  )
}

CompanyColors.propTypes = {
  company: PropTypes.array,
}

export default CompanyColors
