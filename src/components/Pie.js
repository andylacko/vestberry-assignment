import React from 'react'
import styles from '../App.scss'
import PropTypes from 'prop-types'
import { Hint, RadialChart } from 'react-vis'
import { formatTousands } from '../config/utils'

export default class Pie extends React.Component {
  state = {
    value: false,
  }

  render () {
    const { value } = this.state
    const { company } = this.props
    const colorData = []
    company.map(c => {
      colorData.push({
        value: c.investmentSize,
        title: c.name,
        color: c.color,
      })
    })
    return (
      <div className={styles.pie}>
        <div className={styles.pieCenter}>
          <h3>{company.length}</h3>
          <div>companies</div>
        </div>

        <RadialChart
          innerRadius={90}
          radius={130}
          getAngle={d => d.value}
          colorType="literal"
          data={colorData}
          onValueMouseOver={v => this.setState({ value: v })}
          onSeriesMouseOut={() => this.setState({ value: false })}
          width={300}
          height={300}
        >
          {value &&
          <Hint
            value={value}
          >
            <div className={styles.colorsHint}>
              <strong >{value.title}</strong>
              <div >{formatTousands(value.value)} EUR</div>
            </div>
          </Hint>
          }
        </RadialChart>
      </div>
    )
  }
}
Pie.propTypes = {
  company: PropTypes.array,
}
