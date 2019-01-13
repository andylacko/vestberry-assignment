import React from 'react'
import PropTypes from 'prop-types'
import pageQueries from '../queries/Page.queries'
import styles from '../App.scss'
import Sectors from '../components/Sectors'
import CompanyTable from '../components/CompanyTable'
import Pie from '../components/Pie'
import CompanyColors from '../components/CompanyColors'
import Modal from '../components/Modal'
import AddCompany from '../components/AddCompany'

class Page extends React.Component {
  state = {
    modalOpen: false,
  }

  closeModal () {
    document.body.classList.remove('overflowHidden')
    this.setState({ modalOpen: false })
  }
  render () {
    const { loading, company } = this.props
    const { modalOpen } = this.state
    if (loading) {
      return <span>Loading data...</span>
    }
    return (
      <React.Fragment>
        <div className={styles.panel}>
          <header>
            <h2>Companies by sectors</h2>
          </header>
          <div className={styles.panelContent}>
            <Sectors company={company} />
          </div>
        </div>

        <div className={styles.panel}>
          <header>
            <h2>Companies by investment size</h2>
          </header>
          <div className={styles.panelContent}>
            <div className={styles.statsWrapper}>
              <div>
                <div>
                  <Pie company={company} />
                </div>
              </div>
              <div>
                <div>
                  <CompanyColors company={company} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <CompanyTable company={company} />
          <div className={styles.addBox}>
            <button
              className={styles.button}
              onClick={() => {
                document.body.classList.add('overflowHidden')
                this.setState({ modalOpen: true })
              }}
            >
              Add new company
            </button>
          </div>
        </div>

        <Modal
          open={modalOpen}
          closeModal={() => this.closeModal()}
        >
          <AddCompany
            closeModal={() => this.closeModal()}
          />
        </Modal>
      </React.Fragment>
    )
  }
}
Page.propTypes = {
  loading: PropTypes.bool,
  company: PropTypes.array,
}

export default pageQueries(Page)
