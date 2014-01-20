REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) ./test/*.js

test-cov: lib-cov
	@COMPONENT_REGENERATOR_COV=1 $(MAKE) test REPORTER=html-cov > ./coverage.html
	@rm -rf ./lib-cov

test-coveralls: lib-cov
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@COMPONENT_REGENERATOR_COV=1 $(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/.bin/coveralls
	@rm -rf ./lib-cov

lib-cov:
	@./node_modules/.bin/jscoverage ./index.js ./lib-cov/index.js

clean:
	@rm -rf ./coverage.html
	@rm -rf ./example/build.js
	@rm -rf ./example/components

.PHONY: test test-cov test-coveralls lib-cov clean
