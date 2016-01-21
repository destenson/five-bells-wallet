# Five Bells Ledger UI

An example UI implementation for Five Bells Ledger

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start
```

Use the following configuration options as environment variables:

* `API_HOSTNAME` Publicly visible API hostname
* `API_PORT` Publicly visible API port
* `API_DB_URI` (e.g.: postgres://root:password@localhost/ledgerui) URI for connecting to a database.    
* `API_LEDGER_HOST` Ledger hostname
* `API_LEDGER_PORT` Ledger port
* `API_LEDGER_ADMIN_NAME` Ledger admin username
* `API_LEDGER_ADMIN_PASS` Ledger admin password
* `CLIENT_HOST` Publicly visible hostname
* `CLIENT_PORT` Publicly visible port

### Using Redux DevTools

In development, Redux Devtools are enabled by default. You can toggle visibility and move the dock around using the following keyboard shortcuts:

- <kbd>Ctrl+H</kbd> Toggle DevTools Dock
- <kbd>Ctrl+Q</kbd> Move Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detail information.