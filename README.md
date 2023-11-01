![GitHub issues](https://img.shields.io/github/issues/actionreward-core/actionreward)

# ActionReward

--------

## Quick Links
- [📹 Video Presentation](https://youtu.be/_WTwuLvqDwI)
- [📕 Pitch Deck](https://github.com/actionreward-core/actionreward/files/13223631/ActionReward.Presentation.pdf)
- [⚡️ ActionReward Platform](https://actionreward.xyz)
- [👾 ActionReward Game Demo (Integration Example)](https://example.actionreward.xyz)

--------

## Table of Contents
1. [About](#about)
2. [Setup](#setup)


--------

## About

![ActionReward Presentation](https://github.com/actionreward-core/actionreward/assets/101031495/034ce95b-c7e6-4da1-843f-4756a3d62fc5)

ActionReward is a platform that aims to enhance and streamline the way businesses implement reward systems. It was designed to empower businesses to create and customize their own reward systems to incentivize specific user actions, such as engagement, task completion, or achieving milestones.


## Quick Start - Deploying a Hosted Community Edition (CE)

#### Requirements

- Docker
- Docker-Compose

#### 1 - Clone this repository:

```
git clone git@github.com:actionreward-core/actionreward.git
```

#### 2 - Update the following needed variables on `docker-compose.yaml`:


`.env`:

- VITE_API_BASE_URL
- VITE_WEB3_STORAGE_TOKEN 

`.env-api`:
- DATABASE_URL
- JWT_SECRET
- BASE_URL
- ISSUER_SERVER_URL
- ISSUER_USERNAME
- ISSUER_PASSWORD
- GCLOUD_API_KEY
- CDN_BASE_URL
- ETHEREUM_URL
- VERIFY_CONTRACT_ADDRESS
- VERIFY_FROM_DID
- IPFS_GATEWAY_URL



#### 3 - Run the docker-compose

```
docker-compose up

Creating actionreward-db     ... done
Creating actionreward-webapp ... done
Creating actionreward-api    ... done
Creating actionreward-nginx  ... done
Attaching to actionreward-webapp, actionreward-db, actionreward-api, actionreward-nginx
```

The ActionReward should be running at http://localhost
