This is the response to a coding challenge using Node, MongoDB and Beanstalkd. 

Description

We are getting the exchange rate of two currencies from www.xe.com and save that into a mongo database in Mlab. If the request is successful, we get that again in 60 seconds and save that for 10 times. If this is not successful, we re-try that after 3 seconds and bury the job if it fails for 3 times. 

Producer.js is used to seed the job into the beanstalkd server and worker.js is to consume the job. The scraper function is a helper function to get the exchange rate and save into the database. 

To start 
```
npm install 

```

To start the producer 
```
nodemon src/producer.js

```

To start a worker, open another tap in the terminal 
```
nodemon src/worker.js

```

To test (the test is not yet completed)

```
npm test 

```
