/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { keyBy, isArray } from 'lodash'

import { Button } from 'components/Base'
import EditMode from 'components/EditMode'

import styles from './index.scss'

export default class CodeMode extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    onOk: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    onOk() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.editor = React.createRef()
  }

  getData() {
    return this.editor.current.getData()
  }

  handleCreate = () => {
    const { onOk } = this.props
    const data = this.getData()
    onOk(isArray(data) ? keyBy(data, 'kind') : data)
  }

  render() {
    const { formTemplate, onCancel, isSubmitting } = this.props
    return (
      <div>
        <div className={styles.wrapper}>
          <EditMode ref={this.editor} value={formTemplate} />
        </div>
        <div className={styles.footer}>
          <Button onClick={onCancel}>{t('Cancel')}</Button>
          <Button
            type="control"
            onClick={this.handleCreate}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {t('Create')}
          </Button>
        </div>
      </div>
    )
  }
}
