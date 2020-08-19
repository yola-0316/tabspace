import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BaseStyles, Box, Heading } from '@primer/components'

const TabSpace: React.FC = () => {
  const appName = useSelector((state) => state.app)
  return (
    <BaseStyles>
      <Box m={4}>
        <div>
          <h1>TagSpace</h1>
          <small>总计：572个标签页</small>
        </div>

        <div className="list-container">
          <div className="group">
            <div className="group-meta">
              <strong>10个标签页</strong>
              <div>
                <div className="time">创建于 2020/8/17 上午2:37:34</div>
                <div className="control">
                  <span>恢复全部</span>
                  <span>删除全部</span>
                  <span>分享为网页</span>
                  <span>更多...</span>
                </div>
              </div>
            </div>
            <div className="group-list">
              <ul>
                <li>
                  <a href="#">利用puppeteer</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Box>
    </BaseStyles>
  )
}

export default TabSpace
