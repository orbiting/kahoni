# Kahoni

An first online magazine prototype.

Related Repositories:

- [Styleguide](https://github.com/orbiting/styleguide)

## License

The content, logo and fonts are the property of their owners (content and logo—Project R, GT America—GrilliType and Rubis—Nootype), and may not be reproduced without permission.

The source code is «BSD 3-clause» licensed.

## Development

### Install and Run

```bash
npm install
npm run dev
```

### Environment

You will need an `NPM_TOKEN` in your system environment to install our private @project-r npm packages. For example via `~/.bash_profile`:

```
export NPM_TOKEN="00000000-0000-0000-0000-000000000000"
```

You can use a git-excluded `.env` file in development:

```
GRAPH_CMS_URI=
GRAPH_CMS_TOKEN=

AUTH_MAIL_FROM_ADDRESS=
DEFAULT_MAIL_FROM_ADDRESS=
DEFAULT_MAIL_FROM_NAME=
MANDRILL_API_KEY=
SEND_MAILS=false

PUBLIC_BASE_URL=
```
