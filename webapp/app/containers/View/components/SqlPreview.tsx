import React from 'react'

import { Table } from 'antd'
import { ColumnProps, TableProps } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination'
import Styles from '../View.less'

import { IExecuteSqlResponse, IExecuteSqlParams } from '../types'
import { DEFAULT_SQL_PREVIEW_PAGE_SIZE, SQL_PREVIEW_PAGE_SIZE_OPTIONS } from '../constants'

interface ISqlPreviewProps {
  loading: boolean
  response: IExecuteSqlResponse
  onChange: (params: Partial<IExecuteSqlParams>) => void
}

export class SqlPreview extends React.PureComponent<ISqlPreviewProps> {

  private static basePagination: PaginationConfig = {
    pageSize: DEFAULT_SQL_PREVIEW_PAGE_SIZE,
    pageSizeOptions: SQL_PREVIEW_PAGE_SIZE_OPTIONS.map((size) => size.toString()),
    showQuickJumper: true,
    showSizeChanger: true
  }

  private static computeRowKey = (record: object) => {
    return Object.values(record).join('_')
  }


  public render () {
    const { loading, response, onChange } = this.props
    const { totalCount, columns, resultList } = response
    const paginationConfig: PaginationConfig = {
      ...SqlPreview.basePagination,
      total: totalCount

    }
    const tableColumns = columns.map<ColumnProps<any>>((col) => ({
      title: col.name,
      dataIndex: col.name,
      width: 250
    }))
    const scroll: TableProps<any>['scroll'] = {
      x: tableColumns.reduce((acc, col) => (col.width as number + acc), 0)
    }

    return (
      <Table
        className={Styles.sqlPreview}
        bordered
        pagination={paginationConfig}
        dataSource={resultList}
        columns={tableColumns}
        scroll={scroll}
        loading={loading}
        rowKey={SqlPreview.computeRowKey}
        // onChange={onChange}
      />
    )
  }

}

export default SqlPreview