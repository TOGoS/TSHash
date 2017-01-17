tsc_inputs = $(shell find src/main/ts)
src_files = $(shell find src)

node := node
tsc := ${node} node_modules/typescript/bin/tsc

default: target/cjs

sortaclean:
	rm -rf target

clean: sortaclean
	rm -rf node_modules

.DELETE_ON_ERROR: # yes plz

.PHONY: \
	clean \
	sortaclean \
	default

node_modules: package.json
	npm install
	touch "$@"

target/tshash.amd.es5.js: target/%.js: src/main/ts/%.tsconfig.json ${tsc_inputs} node_modules
	${tsc} -p "$<" --outFile "$@"

target/cjs: src/main/ts/tshash.cjs.es5.tsconfig.json ${src_files} node_modules README.md
	${tsc} -p "$<" --outDir "$@"
	cp -r src/main/cjs/* target/cjs/
	touch "$@"

run-unit-tests: target/cjs
	cd target/cjs && (find -iname '*test.js' | xargs --no-run-if-empty -n 1 ${node})

npm-package: target/cjs
	rm -rf npm-package
	mkdir npm-package
	cp -a src README.md package.json Makefile npm-package/
	cp -a target/cjs/tshash/* npm-package/
	touch "$@"

npm-publish: npm-package
	cd npm-package && npm publish
