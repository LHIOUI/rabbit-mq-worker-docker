# rabbit-mq-worker-docker

Nodejs/Rabbit MQ worker on docker example

## Prerequisite
* docker installed

## Start 
```shell
$ docker-compose build
$ docker-compose up
 ```
## Scale Worker to N instance (exp N=5)
```shell
$ docker-compose up --scale worker=5
```
