install:
	npm ci

lint:
	cd frontend && npm run lint

lint-fix:
	cd frontend && npm run lint-fix

build:
	rm -rf frontend/dist
	cd frontend && npm run build

start:
	npm start
