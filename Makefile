
install: package.json
	@npm install --production

dev: package.json
	@npm install

test:
	@mocha -t 10000 -r should -R spec test

test-watch:
	@mocha -t 10000 -w -r should -R spec test

clean:
	rm -rf node_modules

.PHONY: test test-watch clean
