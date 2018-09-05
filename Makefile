SRCDIR=src 
OUTDIR=js
OUTFILE=temp.js
EXECFILE=test.js

all: build

build:
	@mkdir -p ${OUTDIR}
	@echo "Translating scripts..."
	@tsc
	@echo "Success!"

test:
	node ${OUTDIR}/${EXECFILE}

clean:
	@rm -rf ${OUTDIR}
	@rm -f ${OUTDIR}/*.js 

watch:
	tsc-watch --onSuccess "node ${OUTDIR}/${EXECFILE}"
	

