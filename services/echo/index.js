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
const os = require('os')

const port = process.env.PORT || 8080
let requests = 0

process.on('SIGINT', () => {
  console.log('shutting down...')
  process.exit(1)
})

app.use((req, res, next) => {
  const { url } = req
  console.log(`Received request for URL: ${url}`)
  res.status(200).send({
    requests: ++requests,
    message: 'hello world',
    hostname: os.hostname(),
    path: url
  })
})

app.listen(port, () => console.log(`server listening on port ${port}`))
