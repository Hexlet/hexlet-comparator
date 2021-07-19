setup:
	npm ci

start:
	npm start

dev:
	npm run dev

lint:
	npx eslint .

linter-fix:
	npx eslint --fix .

test:
	npm test

build:
	npm run build

heroku-logs:
	heroku logs --tail
