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

heroku-logs:
	heroku logs --tail
