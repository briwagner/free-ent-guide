# Free Entertainment Guide

[www.free-entertainment-guide.com](www.free-entertainment-guide.com)

## Project Details

This project leverages third-party APIs to provide information on movies and television programming. It is a work in progress, as the (free) resources are available to deliver the content.

## Backend Data

The progamming data is provided directly from third-party sources. But it relies on a custom backend to protect the API keys for each of the providers. That backend is built in Golang and communicates with a ~~Redis caching~~ database layer to limit the amount of API queries.

More information here: https://github.com/briwagner/free-ent-guide-backend

## Planned Enhancements

- Display news and updates on television programming
- Create a user-controlled space for saving favorite programs, etc.
- Integrate Angular route guards for user-controlled spaces

## Build Tools

This project was generated with [angular-cli](https://github.com/angular/angular-cli).
