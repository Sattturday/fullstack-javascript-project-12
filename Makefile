install:
	npm install
	cd frontend && npm install

lint:
	cd frontend && npm run lint

build:
	rm -rf frontend/dist
	cd frontend && npm run build

start:
	npx start-server -s ./frontend/dist
