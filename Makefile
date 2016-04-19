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

target/%.js: src/main/ts/%.tsconfig.json ${tsc_inputs} node_modules
	${tsc} -p "$<" --outFile "$@"

target/cjs: src/main/ts/tshash.cjs.es5.tsconfig.json ${src_files} node_modules README.md
	${tsc} -p "$<" --outDir "$@"
	cp -r src/main/cjs/* target/cjs/
	touch "$@"

run-unit-tests: target/cjs
	cd target/cjs && (find -name '*Test.js' | xargs --no-run-if-empty -n 1 ${node})
