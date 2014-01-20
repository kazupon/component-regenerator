SRC = $(wildcard ./*.js)
COMPONENT = ../node_modules/.bin/component

components: component.json
	$(COMPONENT) install

build: components $(SRC)
	@node ./builder.js

clean:
	@rm -fr ./components
	@rm ./build.js

.PHONY: clean build
