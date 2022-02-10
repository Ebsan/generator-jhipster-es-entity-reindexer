# generator-jhipster-es-entity-reindexer

[![NPM version][npm-image]][npm-url] [![Build Status][github-actions-image]][github-actions-url] [![Dependency Status][daviddm-image]][daviddm-url]

> JHipster module, Generates code to reindex selected entities with Elasticsearch. You may also set your app to reindex all entities on startup. This module is an updated version of [Elasticsearch Reindexer][legacy-reindexer-url] for Jhipster 7.

# Introduction

This [JHipster](https://www.jhipster.tech/) module will generate code to reindex all entities with Elasticsearch. It will generate the following files:

- **ElasticsearchIndexService.java** - Reindex all or specifically selected entities. Can also reindex all entities on startup if `application.elasticsearch.reindex-on-startup` is set to true in `application.yml`.
- **ElasticsearchIndexResource.java** - Admin only REST endpoint to reindex all or specifically selected entities.
- **ApplicationProperties.java** - Adds the `application.elasticsearch.reindex-on-startup` to ApplicationProperties.
- **application.yml** - Adds `application.elasticsearch.reindex-on-startup` to end of file.
- Frontend code:
  - Navigation element to Admin dropdown
  - Admin page to select all or specific entities to reindex

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this module:

```bash
npm install -g generator-jhipster-es-entity-reindexer
```

To update this module:

```bash
npm update -g generator-jhipster-es-entity-reindexer
```

## With Yarn

To install this module:

```bash
yarn global add generator-jhipster-es-entity-reindexer
```

To update this module:

```bash
yarn global upgrade generator-jhipster-es-entity-reindexer
```

# Usage

In your jhipster project folder run the following command.

```bash
yo jhipster-es-entity-reindexer
```

# License

Apache-2.0 © [Ebsan Uddin](https://github.com/Ebsan)

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-es-entity-reindexer.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-es-entity-reindexer
[github-actions-image]: https://github.com/Ebsan/generator-jhipster-es-entity-reindexer/workflows/Build/badge.svg
[github-actions-url]: https://github.com/Ebsan/generator-jhipster-es-entity-reindexer/actions
[daviddm-image]: https://david-dm.org/Ebsan/generator-jhipster-es-entity-reindexer.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Ebsan/generator-jhipster-es-entity-reindexer
[legacy-reindexer-url]: https://github.com/geraldhumphries/generator-jhipster-elasticsearch-reindexer
