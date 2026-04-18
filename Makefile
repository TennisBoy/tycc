.PHONY: build test run clean codegen

build:
	cd webapi && dotnet build
	cd webui && npm run build

test:
	cd webapi && dotnet test
	cd webui && npm run test

run:
	@echo "Run webapi and webui in separate terminals or use a tool like 'concurrently'"

clean:
	cd webapi && dotnet clean
	rm -rf webui/dist

codegen:
	cd webui && npm run codegen
