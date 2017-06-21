/**
 * Copyright 2017 The Kubernetes Authors All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const app = require('express')()
const axios = require('axios')

const ECHO_SERVICE_URL = 'http://echo:8080'

const port = process.env.PORT || 8080

process.on('SIGINT', () => {
  console.log('shutting down...')
  process.exit(1)
})

app.use((req, res, next) => {
  const { url: path } = req
  const url = ECHO_SERVICE_URL + path

  console.log(`Received request for URL: ${url}`)
  console.info(`PROXY GET ${url}`)

  axios.get(url)
    .then(echoResp => {
      const { status, data } = echoResp

      console.info(`RESP FROM ${url}`, data)

      res.status(status)
        .send({
          url,
          data
        })
    })
    .catch(() => {
      console.error(`FAILURE FROM ${url}`)
      res.status(500).send({ url, error: 'request failed' })
    })
})

app.listen(port, () => console.log(`server listening on port ${port}`))
