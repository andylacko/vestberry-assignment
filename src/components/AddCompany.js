import React from 'react'
import styles from '../App.scss'
import Select from 'react-select'
import { SECTORS, STAGES } from '../config/constants'
import { randomHexColor } from '../config/utils'
import { Mutation } from 'react-apollo'
import { ADD_COMPANY, GET_COMPANIES } from '../queries/Page.queries'
import PropTypes from 'prop-types'

export default class AddCompany extends React.Component {
  state = {
    name: '',
    stage: '',
    sector: '',
    investmentSize: '',
    touched: {
      name: false,
      stage: true,
      sector: false,
      investmentSize: false,
    },
    errors: {
      name: '',
      stage: '',
      sector: '',
      investmentSize: '',
    },
    errorsTexts: {
      name: 'Company name has to be longer then 2 characters',
      stage: 'Company stage must be in the list',
      sector: 'Company sector must be in the list',
      investmentSize: 'Investment size has to be positive number',
    },
  }
  validators = {
    name: /.{3,}/,
    stage: /.+/,
    sector: /.+/,
    investmentSize: /\d+/,
  }

  componentDidMount () {
    console.log(randomHexColor())
    console.log(randomHexColor())
  }

  touch (key) {
    const tmpTouched = { ...this.state.touched }
    tmpTouched[key] = true
    this.setState({
      touched: tmpTouched,
    }, () => {
      this.validate(key)
    })
  }

  validate (key, callback) {
    if (!this.validators[key].test(this.state[key])) {
      const tmpErrors = { ...this.state.errors }
      tmpErrors[key] = this.state.errorsTexts[key]
      this.setState({ errors: tmpErrors })
      return false
    } else {
      const tmpErrors = { ...this.state.errors }
      tmpErrors[key] = ''
      this.setState({ errors: tmpErrors }, () => {
        if (typeof callback === 'function') {
          callback()
        }
      })
      return true
    }
  }

  validateAll (callback) {
    let semaphore = true
    const tmpTouched = { ...this.state.touched }
    Object.keys(this.state.touched).map((key) => {
      tmpTouched[key] = true
    })
    this.setState({
      touched: tmpTouched,
    }, () => {
      const tmpErrors = { ...this.state.errors }
      Object.keys(this.validators).map((key) => {
        if (!this.validators[key].test(this.state[key])) {
          tmpErrors[key] = this.state.errorsTexts[key]
          semaphore = false
        } else {
          tmpErrors[key] = ''
        }
      })

      this.setState({
        errors: tmpErrors,
      }, () => {
        if (semaphore) {
          if (typeof callback === 'function') {
            callback()
          }
        } else {
          return false
        }
      })
    })
  }

  update (key, val) {
    const newState = { ...this.state }
    newState[key] = val
    newState.changed = true
    this.setState(newState, () => {
      if (this.state.touched[key]) {
        this.validate(key)
      }
    })
  }

  save (addCompany) {
    this.validateAll(() => {
      const { name, stage, sector, investmentSize } = this.state
      addCompany({
        variables: {
          name,
          stage: stage.value,
          sector: sector.value,
          color: randomHexColor(),
          investmentSize: parseInt(investmentSize),
        },
      })
      this.setState({
        name: '',
        stage: '',
        sector: '',
        investmentSize: '',
        touched: {
          name: false,
          stage: true,
          sector: false,
          investmentSize: false,
        },
        errors: {
          name: '',
          stage: '',
          sector: '',
          investmentSize: '',
        },
      }, () => {
        this.props.closeModal()
      })
    })
  }

  render () {
    const { name, investmentSize, errors, errorsTexts } = this.state
    return <Mutation
      update={(cache, { data: { addCompany } }) => {
        const { company } = cache.readQuery({ query: GET_COMPANIES })
        cache.writeQuery({
          query: GET_COMPANIES,
          data: { company: company.concat([addCompany]) },
        })
      }}
      mutation={ADD_COMPANY}
    >
      {addCompany => (
        <div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Company name</label>
            <input
              id="name"
              type="text"
              placeholder="Company name"
              value={name}
              onChange={(e) => {
                this.update('name', e.target.value)
              }}
              onBlur={() => this.touch('name')}
            />
            <div className={`${styles.errorUnder} ${errors.name ? styles.errorOpen : ''}`}>
              {errorsTexts.name}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stage">Stage</label>
            <Select
              options={STAGES.map(stage => {
                return { value: stage, label: stage }
              })}
              theme={(theme) => ({
                ...theme,
                borderRadius: 4,
                colors: {
                  ...theme.colors,
                  controlHeight: 40,
                  primary25: '#f7f9fc',
                  primary: '#0d7380',
                },
              })}
              onChange={(val) => {
                this.update('stage', val)
              }}
              className={styles.selector}
              placeholder="Select stage from the list"
              onBlur={() => this.touch('stage')}
            />
            <div className={`${styles.errorUnder} ${errors.stage ? styles.errorOpen : ''}`}>
              {errorsTexts.stage}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Stage</label>
            <Select
              options={SECTORS.map(stage => {
                return { value: stage, label: stage }
              })}
              onChange={(val) => {
                this.update('sector', val)
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 4,
                colors: {
                  ...theme.colors,
                  controlHeight: 40,
                  primary25: '#f7f9fc',
                  primary: '#0d7380',
                },
              })}
              onBlur={() => this.touch('sector')}
              className={styles.selector}
              placeholder="Select sector from the list"
            />
            <div className={`${styles.errorUnder} ${errors.sector ? styles.errorOpen : ''}`}>
              {errorsTexts.sector}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Investment size</label>
            <div className={styles.inputLabel}>EUR</div>
            <input
              id="name"
              className={styles.inputPaddedRight}
              type="number"
              placeholder="Enter amount"
              value={investmentSize}
              onChange={(e) => {
                this.update('investmentSize', e.target.value)
              }}
              onBlur={() => this.touch('investmentSize')}
            />
            <div className={`${styles.errorUnder} ${errors.investmentSize ? styles.errorOpen : ''}`}>
              {errorsTexts.investmentSize}
            </div>
          </div>
          <div className={styles.addBox}>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={() => this.save(addCompany)}
            >
              Add new company
            </button>
          </div>
        </div>
      )}
    </Mutation>
  }
}
AddCompany.propTypes = {
  closeModal: PropTypes.func
}
