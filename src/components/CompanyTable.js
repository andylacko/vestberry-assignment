import React from 'react'
import PropTypes from 'prop-types'
import styles from '../App.scss'
import { formatTousands } from '../config/utils'

const CompanyTable = ({ company }) => {
  return (
    <table className={styles.table1}>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>COMPANY NAME</th>
          <th>STAGE</th>
          <th>SECTOR</th>
          <th className={styles.right}>INVESTMENT SIZE</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
          company.map((company, i) =>
            <tr key={i}>
              <td>&nbsp;</td>
              <td><a href="#">{company.name}</a></td>
              <td>{company.stage}</td>
              <td>{company.sector}</td>
              <td className={styles.right}>{formatTousands(company.investmentSize)} EUR</td>
              <td>&nbsp;</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}
CompanyTable.propTypes = {
  company: PropTypes.array,
}
export default CompanyTable
