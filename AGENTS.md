# openNAMU Agent Guide

## Project Overview
A Python-based wiki engine using Flask. It utilizes a Golang sidecar process for specific API and rendering tasks.

## Architecture
- **Entry Point**: `app.py` (Handles DB initialization, server configuration, route registration, and starting the Golang process).
- **Routing**: Handlers are implemented in the `route/` directory and registered in `app.py`.
- **Templating**: Uses Jinja2 templates located in `views/`.
- **Data Storage**: Supports MySQL and SQLite. Configuration and some state are stored in the database (especially in the `other` table).
- **Sidecar Process**: A Golang binary (located in `bin/`) is managed by `app.py`.
- **Localization**: Translation files are in `lang/`.

## Development
- **Dev Mode**: `python app.py dev` (enables Flask debug mode and template reloading).
- **Production Mode**: `python app.py` (runs via `waitress`).

## Key Patterns & Utilities
- **Database**: Uses custom functions for connections and queries. Look for `get_db_connect` and `db_change`.
- **Routing**: Most logic resides in `route/`. When adding a new route, define it in `app.py` and implement it in a new or existing file in `route/`.
- **Concurrency**: Uses `asyncio` for background tasks and `threading.Timer` for periodic maintenance (e.g., backups, daily cleanup).
- **Jinja2 Filters**: 
  - `md5_replace`
  - `load_lang`
  - `cut_100`
- **URL Converters**:
  - `everything`: Matches any path.
  - `regex`: Matches based on a regex pattern.

## Warnings
- **DO NOT** modify the `views/` folder (except `views/main_css/`), the `data/` folder, or any files with the `.db` extension.

## Important Directories
- `route/`: Core business logic and endpoint handlers.
- `views/`: HTML templates.
- `bin/`: Golang binaries.
- `data/`: Database files and persistent data.
- `lang/`: Language/translation files.
