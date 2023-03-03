import express from 'express'
import process from 'process'
import randomInt from 'random-int'

import mem from './mem.js'
import data from './data.js'

const PORT = process.env.PORT || 4000

const app = express()

app.get('/fast', (req, res) => {
  return res.status(200).send(data.user)
})

app.get('/slow', (req, res) => {
  console.time('slow')

  const likes = concatLikes(data.users)

  console.timeEnd('slow')

  return res.status(200).send({ likes })
})

app.get('/big-reverse', (req, res) => {
  let arr = Array(1e6).fill("some string");
  arr.reverse();

  mem.show()

  return res.status(200).send({ success: true })
})

app.get('/slow-async', async(req, res) => {
  const data = await slowRequest();

  syncWait(1000);

  return res.status(200).send(data);
})

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server started on ${PORT} port`)
  }
})

function concatLikes(users) {
  return users.reduce((res, user) => {
    res = res.concat(user.like)
    
    return res
  }, [])
}

async function slowRequest() {
  const asyncDelay = randomInt(2000, 5000)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, asyncDelay });
    }, delay)
  });
}
const syncWait = ms => {
  const end = Date.now() + ms
  while (Date.now() < end) continue
}
