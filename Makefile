setup:
	npm ci
	npx simple-git-hooks

check: test lint build

start:
	npm start

dev:
	npm run dev

lint:
	# npx eslint --ext=js,jsx .
	npm run lint

linter-fix:
	npx eslint --ext=js,jsx --fix .

test:
	npm test

build:
	npm run build

heroku-logs:
	heroku logs --tail
